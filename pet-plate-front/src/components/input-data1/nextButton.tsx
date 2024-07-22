// @components/input-data1/nextButton.tsx
import styled from 'styled-components';

interface NextButtonProps {
    onClick: () => void;
    disabled: boolean;
}

export default function NextButton({ onClick, disabled }: NextButtonProps) {
  return (
    <ButtonContainer  onClick={!disabled ? onClick : undefined}  disabled={disabled}>
        <span>다음으로</span>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div<{ disabled: boolean }>`
    width: 19.5rem;
    height: 3.563rem;
    border: none;
    border-radius: 0.5rem;
    background-color: ${(props) => props.disabled ? props.theme.colors['grey2'] : props.theme.colors['grey10']};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};

    span{
        font-size: 1.125rem;
        font-weight: 600;
        color: ${(props) => props.disabled ? props.theme.colors['grey5'] : 'white'};
    }

    &:hover{
        background-color: ${(props) => !props.disabled && props.theme.colors['grey10']};
        
        span{
            color: ${(props) => !props.disabled && 'white'};
        }
    }
`;
