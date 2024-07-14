import styled from 'styled-components';
import NutrientInputField from '@components/input-data2/dryfood-snack-page/nutrient-input';
import { useRecoilState } from 'recoil';
import { formDataState, RequiredInputState } from '@recoil/nutrientAtoms';

interface Nutrient {
  name: string;
  unit: string;
  isRequired: boolean;
  index: number;
}

interface NutrientInputFieldsSectionProps {
  nutrients: Nutrient[];
}

const NutrientInputFieldsSection = ({ nutrients }: NutrientInputFieldsSectionProps) => {
  const [formData, setFormData] = useRecoilState(formDataState);
  const [requiredInputState, setRequiredInputState] = useRecoilState(RequiredInputState);

  const handleChange = (value: string, isRequired: boolean, index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      [index]: value,
    }));

    if (isRequired) {
      const isValid = value !== '' && !isNaN(Number(value));
      setRequiredInputState((prevState) =>
        prevState.map((field) => (field.index === index ? { ...field, isRequired: isValid } : field)),
      );
    }
  };

  return (
    <NutrientInputSection>
      {nutrients.map((nutrient, index) => (
        <NutrientInputField
          key={index}
          label={nutrient.name}
          unit={nutrient.unit}
          isRequired={nutrient.isRequired}
          placeholder="00"
          value={formData[nutrient.index] || ''}
          onChange={(e) => handleChange(e.target.value, nutrient.isRequired, nutrient.index)}
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
