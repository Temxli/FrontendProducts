import { NextResponse } from 'next/server';

export async function GET() {
  return POST();
}

export async function POST() {
  try {
    const res = await fetch('http://10.1.101.59:3000/users/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Logout failed' }, { status: res.status });
    }

    const response = NextResponse.redirect('http://10.1.101.59:3001/');

    response.cookies.set({
      name: 'Authorization',
      value: '',
      path: '/',
      httpOnly: true,
      secure: false, 
      expires: new Date(0), 
    });

    return response;
  } catch (err) {
    console.error('Logout error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
