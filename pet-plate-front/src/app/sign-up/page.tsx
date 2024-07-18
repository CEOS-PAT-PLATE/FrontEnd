'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();

  useEffect(() => {


    const accessToken = new URL(window.location.href).searchParams.get('accessToken');
    const refreshToken = new URL(window.location.href).searchParams.get('refreshToken');
    const enrollPet = new URL(window.location.href).searchParams.get('enrollPet');

    if (accessToken && refreshToken && enrollPet) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('enrollPet', enrollPet);

      fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken, refreshToken, enrollPet }),
      }).then(() => {
        // 토큰 저장 후 리다이렉트
        router.push('/sign-up/welcome');
      });
    } else {
      router.push('/sign-up/welcome');
    }
  }, [router]);

  return null; // 컴포넌트는 렌더링할 내용이 없으므로 null 반환
};

export default SignUp;
