'use client'

import styled from 'styled-components';
import {useState ,useEffect} from 'react';




interface LabeledInputProps {
    label:string,
     placeholder :string
  }

function LabeledInput({ label, placeholder }:LabeledInputProps) {

    const [plateName, setPlateName] = useState('');
    const [countText, setCountText] = useState('');


    useEffect(() => {
        setCountText(`${plateName.length}`);
     }, [plateName]);
   

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       
       if(event.target.value.length>20){
        alert("20자 이하로 입력해주세요")
            event.preventDefault();
            return;
          }
          setPlateName(event.target.value);
    
       }
    
      

  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputField placeholder={placeholder} onChange={handleChange}  />
      <Helper>{countText}/20</Helper>
    </InputContainer>
  );
}

export default LabeledInput;



const InputContainer = styled.div`
display: flex;
height: 56px;
width:300px;
flex-direction: column;
align-items: flex-start;
align-self: stretch;
border-radius: 8px;
border: 1px solid var(--grey2, #ECEEF0);
background: var(--white, #FFF);
margin-top: 28px;
`;

const Label = styled.label`
  color: var(--grey7, #959CA4);
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 16px */
  padding-left: 12px;
  padding-top:8px;
`;

const Helper = styled.label`
  display: flex;
padding: 0px 8px;
justify-content: flex-end;
align-items: center;
gap: 8px;
align-self: stretch;
height:19px;
widdth:300px;

color: var(--grey10, #4F5357);
text-align: justify;

/* body3_regular_12pt */
font-family: SUIT;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 19.2px */
`;

const InputField = styled.input`
  color: var(--grey10, #4F5357);
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  border:none;
  border-radius: 4px; /* Optional: add border radius */
  padding-left: 12px;
  padding-right: 12px;
    padding-bottom: 6px;
  outline: none; /* 포커스 스타일 제거 */
  width: 100%; /* Ensure input takes the full width of the container */
  box-sizing: border-box; /* Ensure padding and border are included in the element's total width and height */
`;
