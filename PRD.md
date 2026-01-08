This is a Product Requirement Document (PRD) for the "1-Click IEP Request."

This PRD is designed for the "Vibe Coding" approach: it prioritizes speed, zero maintenance, and maximum user privacy (no database).

1. Product Overview
Product Name: 1-Click IEP Request

One-Line Pitch: A "Mad Libs" style generator that turns a parent's basic concern into a formal, legally cited letter they can email to their principal in under 2 minutes.

Core Philosophy: "Don't make me think." Parents are stressed. The interface must be calming, linear, and require zero legal knowledge.

2. User Flow Diagram
This flow emphasizes that the user never has to "sign up" or "log in."

3. Functional Requirements (The Interface)
To keep it the "simplest possible," we will use a Single-Column Wizard layout. One question at a time prevents overwhelm.

Screen 1: The Basics
Input Field 1: Child's Full Name

Input Field 2: Parent's Full Name

Input Field 3: Current School Name

Input Field 4: Today's Date (Auto-filled, but editable)

Screen 2: The "Magic Words" (The Trigger)
This is the most important section. We need to categorize their struggle to put it into "education speak."

Headline: "What seems to be the main struggle?"

Selection (Radio Buttons - Select One):

Academic (Reading, Writing, Math)

Behavioral (Focus, Outbursts, Social Skills)

Speech/Language

Physical/Motor Skills

Input Field (Optional): "Briefly describe one specific example."

Placeholder text: "e.g., He struggles to sound out simple words and falls behind in class reading."

Screen 3: The Diagnosis (Optional)
Question: "Has a doctor given a diagnosis?"

Toggle: Yes / No

Logic:

If Yes: Show text box "What is the diagnosis?" (e.g., ADHD, Dyslexia).

If No: Skip.

Screen 4: Output & Action
Display: A preview of the generated letter.

Primary Action Button: "Download PDF"

Secondary Action Button: "Copy Text to Clipboard" (for pasting into an email body).

Instruction Box: "Send this PDF to your school Principal and the Director of Special Education today."

4. The "Engine" (The Template Logic)
The tool works by injecting the user's answers (variables) into this legally robust template.

Subject: Request for Initial Evaluation for {Child Name}

Dear Principal {School Name} Administration,

I am the parent of {Child Name}, who is currently a student at {School Name}.

I am writing to formally request an initial evaluation for my child for special education services under the Individuals with Disabilities Education Act (IDEA).

I am concerned that my child may have a disability that is affecting their educational performance. Specifically, we have noticed struggles with {Selection from Screen 2}.

[If diagnosis provided]: Additionally, my child has been diagnosed with {Diagnosis}, and I am happy to provide documentation upon request.

Please consider this letter my formal consent to evaluate. I understand that under federal law, the school district has an obligation to identify and evaluate students suspected of having a disability ("Child Find").

I look forward to receiving an assessment plan and consent form within the statutory timeline (usually 15 days).

Sincerely, {Parent Name}

5. Technical Specifications (For the Builder)
Since you want to "vibe code" this, here are the constraints to give the AI:

Tech Stack: simple HTML/JS or a lightweight React app.

No Database: This is critical.

Why: Parents are paranoid about their child's data (rightfully so).

Solution: Client-Side Generation. Use a library like jspdf to generate the PDF inside the user's browser. The data never hits a server.

Mobile First: 60% of low-income parents will access this on a cheap Android phone. The buttons must be big and thumb-friendly.

6. Success Metrics (How you know it's working)
Conversion Rate: % of people who land on the page vs. hit "Download PDF." (Target: >40%).

Time to Complete: Should be under 120 seconds.

7. Disclaimer
Mandatory Footer: "This tool provides information, not legal advice. We are not a law firm. If you need legal representation, please contact a local attorney or advocate."