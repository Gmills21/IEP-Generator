// This is a simple in-memory store for demo purposes only.
// In production, use a persistent store like Vercel KV or Upstash.
let uniqueUsers = new Set();
let step4Count = 0;

export default function handler(req, res) {
  const userId = req.cookies['user_id'] || Math.random().toString(36).substring(2);
  let isNewUser = false;
  if (!uniqueUsers.has(userId)) {
    uniqueUsers.add(userId);
    isNewUser = true;
  }
  // Set cookie if not present
  if (!req.cookies['user_id']) {
    res.setHeader('Set-Cookie', `user_id=${userId}; Path=/; HttpOnly; SameSite=Lax`);
  }

  if (req.method === 'POST' && req.body?.step4) {
    step4Count++;
  }

  res.status(200).json({
    uniqueUsers: uniqueUsers.size,
    step4Count,
    isNewUser
  });
}
