'use client'

import styled from "styled-components"
import Image from "next/image";
import alertGraphic from "@public/svg/alert-graphic.svg?url"
import alertTip from "@public/svg/alert-final-tip.svg?url"
import { useRecoilState, useResetRecoilState } from 'recoil';
import { isCompleteModalOpenState } from '@recoil/atoms';
import { useRouter } from 'next/navigation';
 


export default function page() {
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useRecoilState(isCompleteModalOpenState);
    const router = useRouter();

    const handleModalCancel = () => {
      setIsCompleteModalOpen(false);
    };

    const handleModalConfirm = () => {
        setIsCompleteModalOpen(false);
        localStorage.setItem('enrollPet', 'true');
        router.push('/201');
    }

    return (
        <Overlay onClick={handleModalCancel}>
          <Modal>
            <AlertWrapper>
                <Text1>이제 얼마 안남았어요!</Text1>
                <AlertGraphic src={alertGraphic} alt="alert-graphic"/>
                <Text2>오늘의 식단을 입력해주시면 <br/> 맞춤형 영양정보를 알려드릴게요.</Text2>
                <AlertTip src={alertTip} alt="tip"/>
                <ContinueBtn onClick={handleModalConfirm}>다음으로</ContinueBtn>
            </AlertWrapper>
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

export const AlertWrapper = styled.div`
width: 18.125rem;
height: 27.688rem;
border: none;
border-radius: 0.75rem;
background-color: white;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const Text1 = styled.div`
font-size: 1.125rem;
font-weight: 600;
line-height: 160%;
color: ${(props)=>props.theme.colors['grey10']};
margin-bottom: 0.5rem;
`

export const Text2 = styled.div`
font-size: 0.75rem;
font-weight: 400;
line-height: 160%;
color: ${(props)=>props.theme.colors['grey9']};
text-align: center;
margin-top: 0.5rem;
`

export const AlertGraphic = styled(Image)`
    
`

export const AlertTip = styled(Image)`
    margin-top: 1.375rem;
`

export const ContinueBtn = styled.div`
width: 14rem;
height: 3rem;
border: none;
border-radius: 0.5rem;
background-color: ${(props)=>props.theme.colors.green};
color: #fff;

font-size: 0.875rem;
font-weight: 600;
line-height: 160%;
text-decoration: none;

display: flex;
align-items: center;
justify-content: center;
`