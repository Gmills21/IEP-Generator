import { useState } from 'react'
import {
  BookOpen,
  Brain,
  MessageSquare,
  Activity,
  ChevronRight,
  ChevronLeft,
  Download,
  Copy,
  Check
} from 'lucide-react'
import jsPDF from 'jspdf'
  import { Analytics } from "@vercel/analytics/next"

function App() {
  // Form state
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    schoolName: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    areaOfConcern: '',
    specificExample: '',
    hasDiagnosis: false,
    diagnosisName: ''
  })
  const [copied, setCopied] = useState(false)

  // Area of concern options with icons
        <Analytics />
  const concernOptions = [
    {
      id: 'academic',
      label: 'Academic (Reading/Math)',
      icon: BookOpen,
      description: 'Struggles with reading, writing, or math'
    },
    {
      id: 'behavioral',
      label: 'Behavioral (Focus/Social)',
      icon: Brain,
      description: 'Difficulty with focus, outbursts, or social skills'
    },
    {
      id: 'speech',
      label: 'Speech & Language',
      icon: MessageSquare,
      description: 'Communication or language challenges'
    },
    {
      id: 'physical',
      label: 'Physical/Motor Skills',
      icon: Activity,
      description: 'Physical coordination or motor skill issues'
    }
  ]

  // Validation
  const isStep1Valid = formData.parentName && formData.childName && formData.schoolName
  const isStep2Valid = formData.areaOfConcern
  const isStep3Valid = !formData.hasDiagnosis || formData.diagnosisName

  // Generate letter text
  const generateLetterText = () => {
    const selectedConcern = concernOptions.find(opt => opt.id === formData.areaOfConcern)
    const concernText = selectedConcern ? selectedConcern.label : formData.areaOfConcern

    let letter = `SUBJECT: Request for Initial Evaluation for ${formData.childName}

Dear Principal of ${formData.schoolName},

I am the parent of ${formData.childName}, who is currently a student at your school.

I am writing to formally request an initial evaluation for my child for special education services under the Individuals with Disabilities Education Act (IDEA).

I am concerned that my child may have a disability that is affecting their educational performance. Specifically, we have noticed struggles with ${concernText}`

    if (formData.specificExample) {
      letter += `: ${formData.specificExample}`
    }
    letter += '.'

    if (formData.hasDiagnosis && formData.diagnosisName) {
      letter += `\n\nAdditionally, my child has been diagnosed with ${formData.diagnosisName}, and I am happy to provide documentation upon request.`
    }

    letter += `\n\nPlease consider this letter my formal consent to evaluate. I understand that under federal law, the school district has an obligation to identify and evaluate students suspected of having a disability ("Child Find").

I look forward to receiving an assessment plan and consent form within the statutory timeline.

Sincerely,
${formData.parentName}
${formData.date}`

    return letter
  }

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF()
    const letterText = generateLetterText()

    // Set font
    doc.setFont('helvetica')
    doc.setFontSize(12)

    // Add text with proper wrapping
    const lines = doc.splitTextToSize(letterText, 170)
    doc.text(lines, 20, 20)

    // Save
    doc.save(`IEP-Request-${formData.childName.replace(/\s+/g, '-')}.pdf`)
  }

  // Copy to clipboard
  const copyToClipboard = () => {
    const letterText = generateLetterText()
    navigator.clipboard.writeText(letterText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Progress calculation
  const progress = (currentStep / 4) * 100

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            1-Click IEP Request Generator
          </h1>
          <p className="text-slate-600 text-lg">
            Create a formal evaluation request in under 2 minutes
          </p>
          <p className="text-slate-500 text-sm mt-2">
            <strong>What is an IEP?</strong> An IEP (Individualized Education Program) is a plan for students with disabilities to get special education support.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm font-medium text-slate-600">
            <span>Step {currentStep} of 4</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="bg-primary-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="card mb-6">
          {/* Step 1: The Basics */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Let's start with the basics
              </h2>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Parent's Full Name *
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="Your full name"
                  aria-label="Parent's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Child's Full Name *
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.childName}
                  onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                  placeholder="Your child's full name"
                  aria-label="Child's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  School Name *
                </label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  placeholder="Current school name"
                  aria-label="School name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Today's Date
                </label>
                <input
                  type="text"
                  className="input-field bg-slate-50"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  aria-label="Date"
                />
              </div>
            </div>
          )}

          {/* Step 2: The Struggle */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                What is the main area of concern?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {concernOptions.map((option) => {
                  const Icon = option.icon
                  const isSelected = formData.areaOfConcern === option.id

                  return (
                    <div
                      key={option.id}
                      className={`radio-card ${isSelected ? 'radio-card-selected' : ''}`}
                      onClick={() => setFormData({ ...formData, areaOfConcern: option.id })}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setFormData({ ...formData, areaOfConcern: option.id })
                        }
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className={`w-6 h-6 mt-1 ${isSelected ? 'text-primary-600' : 'text-slate-400'}`} />
                        <div className="flex-1">
                          <div className="font-semibold text-slate-800 mb-1">
                            {option.label}
                          </div>
                          <div className="text-sm text-slate-600">
                            {option.description}
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-primary-600 bg-primary-600' : 'border-slate-300'
                          }`}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Briefly describe one example (Optional)
                </label>
                <textarea
                  className="input-field min-h-[100px]"
                  value={formData.specificExample}
                  onChange={(e) => setFormData({ ...formData, specificExample: e.target.value })}
                  placeholder="e.g., He struggles to sound out simple words and falls behind in class reading."
                  aria-label="Specific example"
                />
              </div>
            </div>
          )}

          {/* Step 3: Diagnosis */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Has a doctor given a formal diagnosis?
              </h2>

              <div className="flex items-center justify-center space-x-4 py-4">
                <button
                  className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${!formData.hasDiagnosis
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  onClick={() => {
                    setFormData({ ...formData, hasDiagnosis: false, diagnosisName: '' });
                    setCurrentStep(4);
                  }}
                  aria-label="No diagnosis"
                >
                  No
                </button>
                <button
                  className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${formData.hasDiagnosis
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  onClick={() => setFormData({ ...formData, hasDiagnosis: true })}
                  aria-label="Yes, has diagnosis"
                >
                  Yes
                </button>
              </div>

              {formData.hasDiagnosis && (
                <div className="mt-6 animate-fadeIn">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    What is the diagnosis? *
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.diagnosisName}
                    onChange={(e) => setFormData({ ...formData, diagnosisName: e.target.value })}
                    placeholder="e.g., ADHD, Dyslexia, Autism"
                    aria-label="Diagnosis name"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 4: Review & Action */}
          {currentStep === 4 && (
            <Step4Tracker />
            <div className="space-y-6">
              // Invisible component to track step 4 hits
              function Step4Tracker() {
                // Only run once per mount
                React.useEffect(() => {
                  fetch('/api/counter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ step4: true })
                  });
                }, []);
                return null;
              }
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Your letter is ready!
              </h2>

              <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-6 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700">
                  {generateLetterText()}
                </pre>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  📧 Next Steps:
                </p>
                <p className="text-sm text-blue-800">
                  Send this to your School Principal and Director of Special Education today.
                  The school has a legal obligation to respond within the statutory timeline.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={downloadPDF}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                  aria-label="Download PDF"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Official PDF</span>
                </button>

                <button
                  onClick={copyToClipboard}
                  className="btn-secondary flex-1 flex items-center justify-center space-x-2"
                  aria-label="Copy to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copy Email Text</span>
                    </>
                  )}
                </button>
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setFormData({
                        parentName: '',
                        childName: '',
                        schoolName: '',
                        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                        areaOfConcern: '',
                        specificExample: '',
                        hasDiagnosis: false,
                        diagnosisName: ''
                      });
                    }}
                    className="btn-outline flex-1 flex items-center justify-center space-x-2"
                    aria-label="Start New Request"
                  >
                    <span>Start New Request</span>
                  </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 font-semibold transition-colors"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          )}

          {currentStep < 4 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 2 && !isStep2Valid) ||
                (currentStep === 3 && !isStep3Valid)
              }
              className={`ml-auto flex items-center space-x-2 font-semibold transition-all ${((currentStep === 1 && !isStep1Valid) ||
                  (currentStep === 2 && !isStep2Valid) ||
                  (currentStep === 3 && !isStep3Valid))
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-primary-600 hover:text-primary-700'
                }`}
              aria-label="Next step"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-12 text-center text-xs text-slate-500 border-t border-slate-200 pt-6">
          This tool provides information, not legal advice. We are not a law firm.
        </div>
      </div>
    </div>
  )
}

export default App
