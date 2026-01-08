// Simple CLI script to print current counts from the in-memory API (for demo only)
// In production, this should query a persistent store or protected API endpoint
import fetch from 'node-fetch';

(async () => {
  const res = await fetch('http://localhost:3000/api/counter');
  const data = await res.json();
  console.log('Unique users:', data.uniqueUsers);
  console.log('Step 4 requests:', data.step4Count);
})();
