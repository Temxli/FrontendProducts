import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('Authorization')?.value;

  if (!cookie) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // Optionally verify JWT
  // const payload = jwt.verify(cookie, 'YOUR_SECRET');

  // For demo, just return a fixed user or decode JWT
  return NextResponse.json({ user: { username: 'Temirlan' } });
}
