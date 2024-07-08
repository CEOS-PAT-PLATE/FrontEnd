import styled from 'styled-components';
import NutrientInputField from '@components/input-data2/nutrient-input';


interface Nutrient {
    name: string;
    unit: string;
    isRequired: boolean;
  }
  
  interface NutrientInputFieldsSectionProps {
    nutrients: Nutrient[];
  }
  


const NutrientInputFieldsSection = ({ nutrients }:NutrientInputFieldsSectionProps) => {
  return (
    <NutrientInputSection>
      {nutrients.map((nutrient, index) => (
        <NutrientInputField
          key={index}
          label={nutrient.name}
          unit={nutrient.unit}
          isRequired={nutrient.isRequired}
          placeholder="00"
          onChange={(e) => console.log(e.target.value)} // 필요한 핸들러로 교체
        />
      ))}
    </NutrientInputSection>
  );
};

export default NutrientInputFieldsSection;



export const NutrientInputSection = styled.div`
  display: flex;
  width: 312px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;
