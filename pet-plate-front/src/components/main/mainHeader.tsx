'use client';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import mainLogo from '@public/svg/main-logo.svg?url';
import mypageIcon from '@public/svg/profile.svg?url';
import Modal from '@components/main/loginModal'; 


interface MainHeaderProps {
  backgroundColor: string; 
}

export default function MainHeader({ backgroundColor}: MainHeaderProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleMypageIconClick = () => {
    const enrollPet = window.localStorage.getItem('enrollPet');

    if (enrollPet === null || enrollPet === undefined) {
      // 로그인되지 않은 사용자인 경우 
      setShowModal(true);
    } else {
        router.push('/my-page');
      }
    }

  return (
    <MainHeaderWrapper backgroundColor={backgroundColor}>
      <MainLogo src={mainLogo} alt="main-logo" />
      <MypageIconWrapper onClick={handleMypageIconClick}>
        <MypageIcon src={mypageIcon} alt="mypage-icon" />
      </MypageIconWrapper>
      <Modal show={showModal} onClose={() => setShowModal(false)} />
    </MainHeaderWrapper>
  );
}

const MainHeaderWrapper = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
  height: 3.25rem;
  top: 44px; // 상단 인디케이터

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1.5rem;
  gap: 9.875rem;
`;

const MainLogo = styled(Image)`
  width: 7.25rem;
  height: fit-content;
`;

const MypageIconWrapper = styled.div`
  
`

const MypageIcon = styled(Image)``;
