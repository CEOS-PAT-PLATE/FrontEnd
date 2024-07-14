import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { RequiredInputState } from '@recoil/nutrientAtoms';
import React, { ChangeEvent } from 'react';

interface NutrientInputFieldProps {
  label: string;
  unit: string;
  isRequired: boolean;
  placeholder: string;
  index: number;
}

const NutrientInputField = ({ label, unit, isRequired, placeholder, index }: NutrientInputFieldProps) => {
  const [requiredInputList, setRequiredInputList] = useRecoilState(RequiredInputState); // 배열 형태임

  const replaceItemAtIndex = <T,>(arr: T[], index: number, newValue: T): T[] => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  };

  const editItemText = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const newList = replaceItemAtIndex(requiredInputList, index - 1, {
      index: index,
      value: value,
    });

    setRequiredInputList(newList);
  };

  return (
    <NutrientInput>
      <Label>
        {label}
        {isRequired && <Asterisk>*</Asterisk>}
      </Label>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <InputField placeholder={placeholder} onChange={editItemText} />
        <UnitLabel>{unit}</UnitLabel>
      </div>
    </NutrientInput>
  );
};

export default NutrientInputField;

export const NutrientInput = styled.div`
  display: flex;
  width: 152px;
  height: 56px;
  padding: 8px 12px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid var(--grey2, #eceef0);
  background: var(--white, #fff);
`;

export const Label = styled.div`
  color: var(--grey7, #959ca4);
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 16px */
`;

export const Asterisk = styled.span`
  color: var(--primary, #40c97f);
  font-family: SUIT;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;

export const UnitLabel = styled.div`
  color: var(--grey10, #4f5357);
  text-align: right;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  width: 42px;
  flex-shrink: 0;
  margin-left: 10px;
`;

export const InputField = styled.input`
  width: 66px;
  flex-shrink: 0;
  color: var(--grey10, #4f5357);
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  margin-right: 0px;
  border: none;
`;
