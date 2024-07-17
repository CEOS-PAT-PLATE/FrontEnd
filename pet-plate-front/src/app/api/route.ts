import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { accessToken, refreshToken } = await request.json();

  const response = NextResponse.json({ message: 'Tokens stored successfully' });

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, 
  });

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, 
  });

  return response;
}
