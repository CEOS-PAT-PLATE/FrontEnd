'use client';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import alertGraphic from "@public/svg/alert-graphic.svg?url";
import alertTip from "@public/svg/alert-final-tip.svg?url";
import { useRouter } from 'next/navigation';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

// Bounce 애니메이션 정의
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;


const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  const router = useRouter();

  if (!show) return null;

  const handleContinue = () => {
    // 로컬스토리지에 enrollPet을 true로 설정
    localStorage.setItem('enrollPet', 'true');
    router.push('/201');
  };


  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
      <Text1>이제 얼마 안남았어요!</Text1>
        <AlertGraphic src={alertGraphic} alt="alert-graphic" />
        <Text2>오늘의 식단을 입력해주시면 <br /> 맞춤형 영양정보를 알려드릴게요.</Text2>
        <AlertTip src={alertTip} alt="tip" />
        <ContinueBtn onClick={handleContinue}>다음으로</ContinueBtn>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: center;
  width: 360px;
  height: 800px;
  backdrop-filter: blur(4px); /* 배경 블러 처리 */
  background: rgba(75, 147, 125, 0.3); /* 투명도 80% 적용 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2.25rem 1.5rem 1.5rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Text1 = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 160%;
  color: ${(props) => props.theme.colors['grey10']};
  margin-bottom: 0.5rem;
`;

const Text2 = styled.div`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 160%;
  color: ${(props) => props.theme.colors['grey9']};
  text-align: center;
  margin-top: 0.5rem;
`;

const AlertGraphic = styled(Image)``;

const AlertTip = styled(Image)`
  margin-top: 1.375rem;
  animation: ${bounce} 2s ease infinite;
`;

const ContinueBtn = styled.div`
  width: 14rem;
  height: 3rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.green};
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 160%;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

`;
