'use client';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  const router = useRouter();

  if (!show) return null;

  const handleButtonClick = () => {
    router.push('/'); // 로그인 페이지로 라우팅
    onClose(); // 모달 닫기
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Message>로그인하고 펫플레이트의<br/>분석 서비스를 사용해보세요.</Message>
        <Button onClick={handleButtonClick}> 로그인하러 가기 </Button>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 2.25rem 1.125rem 1.5rem 1.125rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Message = styled.h2`
  line-height: 160%;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors['grey9']};
`;

const Button = styled.button`
  width: 14rem;
  height: 3rem;
  background-color: ${(props) => props.theme.colors.green};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  line-height: 160%;

  &:hover {
    background-color: ${(props) => props.theme.colors['green-600']};
  }
`;
