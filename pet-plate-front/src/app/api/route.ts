import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { accessToken, refreshToken, enrollPet } = await request.json();

  const response = NextResponse.json({ message: 'Tokens stored successfully' });

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // localhost에서 작업할 때는 'lax' 또는 'strict'로 설정
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30일
  });

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // localhost에서 작업할 때는 'lax' 또는 'strict'로 설정
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30일
  });

  response.cookies.set('enrollPet', enrollPet, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // localhost에서 작업할 때는 'lax' 또는 'strict'로 설정
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30일
  });

  return response;
}
