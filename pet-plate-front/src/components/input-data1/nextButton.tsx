import styled from "styled-components"

interface NextButtonProps {
    onClick: () => void;
  }

export default function nextButton({ onClick }: NextButtonProps) {
  return (
    <ButtonContainer onClick={onClick}>
        <span>다음으로</span>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
    width: 19.5rem;
    height: 3.563rem;
    border: none;
    border-radius: 0.5rem;
    background-color: ${(props) => props.theme.colors['grey2']};
    display: flex;
    align-items: center;
    justify-content: center;

    span{
        font-size: 1.125rem;
        font-weight: 600;
        color: ${(props) => props.theme.colors['grey5']};
    }

    //임의 설정 => 실제로는 inputfield 채워졌을 때
    &:hover{
        background-color: ${(props) => props.theme.colors['grey10']};
        
        span{
            color: white;
        }
    }
    `