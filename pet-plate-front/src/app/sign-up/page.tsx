'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { petAPI } from '@api/petAPI';

const SignUp = () => {
  const router = useRouter();

  async function fetchSignUp() {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      try {
        // URLSearchParams를 사용하여 URL에 쿼리 파라미터 추가
        const params = new URLSearchParams({ code });
        const response = await fetch(`/api/v1/auth/issue?${params.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const { data } = await response.json();
          const { accessToken, refreshToken, enrollPet } = data;

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('enrollPet', enrollPet);

          // 기존 POST 요청
          await fetch('/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken, refreshToken, enrollPet }),
          });

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
        } else {
          console.error('토큰 발행 실패');
          // router.push('/sign-up/error');
        }
      } catch (error) {
        console.error('에러 발생:', error);
        // router.push('/sign-up/error');
      }
    } else {
      router.push('/sign-up/load');
    }
  }

  useEffect(() => {
    fetchSignUp();
  }, [router]);

  return null; // 컴포넌트는 렌더링할 내용이 없으므로 null 반환
};

export default SignUp;
