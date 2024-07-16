'use client'

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation'

interface AuthType {
  accessToken : string | null,
  refreshToken : string | null,
}

const signUp = () => {
  const router = useRouter();

  const accessToken = new URL(window.location.href).searchParams.get(
    "accessToken"
  );
  const refreshToken = new URL(window.location.href).searchParams.get(
    "refreshToken"
  );

  if (accessToken !== null) {
    localStorage.setItem("accessToken", accessToken);
  }
  if (refreshToken !== null) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  useEffect(() => {
    // 경고를 피하기 위해 useEffect 내에서 navigate 호출
    router.push("/sign-up/welcome");
  }, [router]);
};

export default signUp;