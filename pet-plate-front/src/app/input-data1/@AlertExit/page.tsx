'use client'

import styled from "styled-components"
import Button from '@components/modal/button';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { isExitModalOpenState } from '@recoil/atoms';
import { useRouter } from 'next/navigation';
import { petInfoState, scrollIndexState } from '@lib/atoms'
 


export default function page() {
    const color1 = true; //grey
    const color2 = false; //primary

    const [isExitModalOpen, setIsExitModalOpen] = useRecoilState(isExitModalOpenState);
    const resetPetInfo = useResetRecoilState(petInfoState);
    const resetscrollIndex = useResetRecoilState(scrollIndexState);
    const router = useRouter();

    const handleModalCancel = () => {
      resetPetInfo();
      resetscrollIndex();
      setIsExitModalOpen(false);
      router.push('/main/analyze-info'); // 종료 후 이동할 경로 설정
    };

    const handleModalConfirm = () => {
      setIsExitModalOpen(false);
    }

    return (
        <Overlay>
          <Modal>
            <Header>정보 입력을 종료하시겠어요?</Header>
            <Content>지금 종료하면 이제까지 작성한 내용이 저장되지 않고 모두 사라져요.</Content>
            <ButtonContainer>
              <Button color={color1} onClick={handleModalCancel}>
                종료할래요
              </Button>
              <Button color={color2} onClick={handleModalConfirm}>
                계속 할게요
              </Button>
            </ButtonContainer>
          </Modal>
        </Overlay>
      );
}

export const Overlay = styled.div`
  position: absolute;
  z-index: 1000;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  width: 360px;
  height: 800px;
  backdrop-filter: blur(4px); /* 배경 블러 처리 */
  background: rgba(75, 147, 125, 0.3); /* 투명도 80% 적용 */
  color: var(--white, #fff);
  align-items: center;
`;

export const Modal = styled.div`
  display: inline-flex;
  padding: 0px 24px 24px 24px;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  height: 225px;
  width: 290px;
  justify-content: center;
  border-radius: 12px;
  background: #fff;
  box-shadow: 2px 2px 6px 0px rgba(153, 159, 165, 0.2);
  position: relative;
`;

export const Header = styled.h2`
  color: var(--grey9, #64696e);
  height: 28px;

  /* title1_semibold_18pt */
  font-family: SUIT;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 28.8px */
  letter-spacing: -0.2px;
`;

export const Content = styled.p`
  width: 213px;
  color: var(--grey9, #64696e);
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 44px;

  /* body2_regular_14pt */
  font-family: SUIT;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  position: absolute;
  bottom: 24px;
`;
