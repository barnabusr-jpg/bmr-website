import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Ensure strings are compared to prevent 'undefined' errors
    const isValid = 
      username === (process.env.ADMIN_USER || '') && 
      password === (process.env.ADMIN_PASS || '');

    if (isValid) {
      const cookie = serialize('bmr_admin_token', 'AUTHORIZED_ADMIN_SESSION', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      const response = NextResponse.json({ success: true });
      response.headers.set('Set-Cookie', cookie);
      return response;
    }

    return NextResponse.json({ error: 'UNAUTHORIZED_ACCESS' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: 'INVALID_REQUEST' }, { status: 400 });
  }
}
