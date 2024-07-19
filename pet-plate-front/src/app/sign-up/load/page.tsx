'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SignUpLoad = () => {
  const router = useRouter();

  useEffect(() => {
    const enrollPet = localStorage.getItem('enrollPet');

    if (enrollPet === 'true') {
      router.push('/main/analyze');
    }else{ router.push('/sign-up/welcome');}
  }, [router]);

  return null; // 컴포넌트는 렌더링할 내용이 없으므로 null 반환
};

export default SignUpLoad;
