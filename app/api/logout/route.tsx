import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // 1️⃣ Call your Go backend logout endpoint
    const res = await fetch('http://10.1.101.59:3000/users/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Logout failed' }, { status: res.status });
    }

    // 2️⃣ Prepare redirect response
    const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'));

    // 3️⃣ Clear Authorization cookie
    response.cookies.set({
      name: 'Authorization',
      value: '',
      path: '/',
      httpOnly: true,
      expires: new Date(0), // expire immediately
    });

    return response;
  } catch (err) {
    console.error('Logout error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
