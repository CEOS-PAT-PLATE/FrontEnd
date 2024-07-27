'use client';

import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import InputField from '@components/input-data1/inputFiledDouble';
import { petInfoState } from '@lib/atoms';

export default function AgeContent() {
  const [petInfo, setPetInfo] = useRecoilState(petInfoState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newWeight = e.target.value;
    const weightAsNumber = newWeight !== '' && !isNaN(Number(newWeight)) ? Number(newWeight) : undefined;
    const updatedPetInfo = { ...petInfo, weight: weightAsNumber };
    setPetInfo(updatedPetInfo);
  };

  return (
    <ContentWrapper>
      <Title>반려견의 몸무게를 알려주세요</Title>
      <Text>몸무게에 따라 소/중/대형견으로 나뉘어져요</Text>
      <InputFieldWrapper>
        <InputField
          placeholder="몸무게"
          width="17.5rem"
          value={petInfo.weight !== undefined ? petInfo.weight.toString() : ''}
          onChange={handleChange}
        />
        <span>kg</span>
      </InputFieldWrapper>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 160%;
  margin-bottom: 0.5rem;
  width: 100%;
  padding-left: 1.563rem;
`;

const Text = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 160%;
  color: #afb8c1;
  margin-bottom: 1.125rem;
  width: 100%;
  padding-left: 1.563rem;
`;

const InputFieldWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.875rem;

  span {
    font-size: 1rem;
    font-weight: bold;
    color: ${(props) => props.theme.colors['grey10']};
  }
`;
