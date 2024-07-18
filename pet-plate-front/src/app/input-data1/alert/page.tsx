'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { petInfoState } from '@lib/atoms';
import { petAPI } from '@api/petAPI';

export default function Page() {
  const [petInfo] = useRecoilState(petInfoState);

  useEffect(() => {
    const addPetInfo = async () => {
      try {
        const response = await petAPI.addPetInfo(petInfo);
        console.log('Pet info added successfully:', response.data);
      } catch (error) {
        console.error('Failed to add pet info:', error);
      }
    };

    if (petInfo) {
      addPetInfo();
    }
  }, [petInfo]);

  return (
    <>
      <Link href="/input-data1/result">Go to Result Page</Link>

      <div>
        {JSON.stringify(petInfo)}
      </div>
    </>
  );
}
