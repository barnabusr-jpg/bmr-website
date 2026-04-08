import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Validate against Environment Variables
  if (
    username === process.env.ADMIN_USER && 
    password === process.env.ADMIN_PASS
  ) {
    // Set the Admin Token cookie for the Middleware to find
    const cookie = serialize('bmr_admin_token', 'AUTHORIZED_ADMIN_SESSION', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    const response = NextResponse.json({ success: true });
    response.headers.set('Set-Cookie', cookie);
    return response;
  }

  return NextResponse.json({ error: 'UNAUTHORIZED_ACCESS' }, { status: 401 });
}
