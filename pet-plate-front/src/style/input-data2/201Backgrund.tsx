// Wrapper.tsx
'use client';
import styled from 'styled-components';
import id_201 from '@public/svg/id_201.svg?url';


const BackgroundWrapper = styled.div`
background-image: url(${id_201});
width: 360px;
  height: 800px;
  position: absolute;

`;

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return <BackgroundWrapper>{children}</BackgroundWrapper >;
}
