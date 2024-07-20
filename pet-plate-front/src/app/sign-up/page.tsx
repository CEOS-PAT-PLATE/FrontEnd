'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { petAPI } from '@api/petAPI';

const SignUp = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = new URL(window.location.href).searchParams.get('accessToken');
    const refreshToken = new URL(window.location.href).searchParams.get('refreshToken');
    const enrollPet = new URL(window.location.href).searchParams.get('enrollPet')||'false';

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('enrollPet', enrollPet);

      // 기존 POST 요청
      fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken, refreshToken, enrollPet }),
      }).then(() => {
        // 추가된 GET 요청
        const fetchPets = async () => {
          try {
            const response = await petAPI.getAllPetsInfo();
            const petData = response.data.data;

            if (petData.length > 0) {
              const petInfo = petData[0];
              localStorage.setItem('petInfo', JSON.stringify(petInfo));
            }
          } catch (error) {
            console.error('펫 정보 조회 실패', error);
          }
        };

        fetchPets();
        router.push('/sign-up/load');
      });
    } else {
      router.push('/sign-up/load');
    }
  }, [router]);

  return null; // 컴포넌트는 렌더링할 내용이 없으므로 null 반환
};

export default SignUp;
