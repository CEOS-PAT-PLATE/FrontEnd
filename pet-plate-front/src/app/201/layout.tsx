'use client';
import styled from 'styled-components';

export default function Layout({
  children,
  CompletionModal,
  ExitModal,
}: {
  children: React.ReactNode;
  CompletionModal: React.ReactNode;
  ExitModal: React.ReactNode;
}) {
  return (
    <Wrapper>
      <div> {ExitModal}</div>

      <div>{CompletionModal}</div>
      <div>{children}</div>
      </Wrapper>
  );
}


const Wrapper = styled.div`
    flex-direction: column;
    align-items: center;
    width: 360px;
    height: 800px;
    position: relative;
    `;