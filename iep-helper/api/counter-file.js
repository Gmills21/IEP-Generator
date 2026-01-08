// Vercel serverless API route for tracking unique users and step 4 requests
// This version uses a simple file for persistence (for demo only)
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.resolve(process.cwd(), 'iep-helper', 'api', 'counter-data.json');

async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { uniqueUsers: [], step4Count: 0 };
  }
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data), 'utf8');
}

export default async function handler(req, res) {
  let data = await readData();
  let userId = req.cookies['user_id'] || Math.random().toString(36).substring(2);
  let isNewUser = false;
  if (!data.uniqueUsers.includes(userId)) {
    data.uniqueUsers.push(userId);
    isNewUser = true;
  }
  if (!req.cookies['user_id']) {
    res.setHeader('Set-Cookie', `user_id=${userId}; Path=/; HttpOnly; SameSite=Lax`);
  }
  if (req.method === 'POST' && req.body?.step4) {
    data.step4Count++;
  }
  await writeData(data);
  res.status(200).json({
    uniqueUsers: data.uniqueUsers.length,
    step4Count: data.step4Count,
    isNewUser
  });
}
