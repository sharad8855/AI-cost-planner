import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const app = await import('../server.js');
    res.status(200).json({
      ping: 'pong',
      env: process.env.NODE_ENV,
      vercel: !!process.env.VERCEL,
      appImported: !!app
    });
  } catch (err: any) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
      string: String(err)
    });
  }
}
