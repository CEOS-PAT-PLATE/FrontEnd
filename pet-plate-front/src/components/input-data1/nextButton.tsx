import styled from "styled-components"

export default function nextButton() {
  return (
    <ButtonContainer>
        <span>다음으로</span>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.div`
    width: 19.5rem;
    height: 3.563rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #ECEEF0; //grey2
    display: flex;
    align-items: center;
    justify-content: center;

    span{
        font-size: 1.125rem;
        font-weight: 600;
        color: #BDC5CC; //grey5
    }

    //임의 설정 => 실제로는 inputfield 채워졌을 때
    &:hover{
        background-color: #4F5357; //grey10
        
        span{
            color: white;
        }
    }
    `