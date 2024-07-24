'use client';

import styled, { css } from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// 아이콘 이미지 임포트
import homeIcon from '@public/svg/home-icon.svg?url';
import analyzeIcon from '@public/svg/analyze-icon.svg?url';
import myPageIcon from '@public/svg/my-page-icon.svg?url';

// NavbarFooter 컴포넌트
export default function NavbarFooter() {
  const [analyzeLink, setAnalyzeLink] = useState('/main/analyze-info');

  useEffect(() => {
    if (localStorage.getItem('enrollPet')) {
      setAnalyzeLink('/main/analyze');
    } else {
      setAnalyzeLink('/main/analyze-info');
    }
  }, []);

  return (
    <NavbarContainer>
      <IconWrapper href="/main">
        <Icon src={homeIcon} alt="Home" />
      </IconWrapper>
      <IconWrapper href={analyzeLink}>
        <Icon src={analyzeIcon} alt="Analyze" />
      </IconWrapper>
      <IconWrapper href="/my-page">
        <Icon src={myPageIcon} alt="My Page" />
      </IconWrapper>
    </NavbarContainer>
  );
}

// NavbarContainer 스타일 컴포넌트
const NavbarContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4em;
  position: absolute;
  bottom: 0;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
`;

// IconWrapper 스타일 컴포넌트
const IconWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Icon 스타일 컴포넌트
const Icon = styled(Image)`
  width: 3rem;
  height: 3rem;
`;
