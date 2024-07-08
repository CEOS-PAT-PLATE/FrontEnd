'use client'

import styled from 'styled-components';
import NutrientInputFieldsSection from '@components/input-data2/nutrient-input-section';



interface Nutrient {
    name: string;
    unit: string;
    isRequired: boolean;
  }


interface NutrientSection {
    nutrients: Nutrient[];
  }
  
  interface NutrientInputFieldsContainerProps {
    nutrientSections: NutrientSection[];
  }
  

  



const NutrientInputFieldsContainer = ({ nutrientSections }:NutrientInputFieldsContainerProps ) => {
  return (
    <NutrientInputContainer>
      {nutrientSections.map((section, index) => (
        <>
        <NutrientInputFieldsSection key={index} nutrients={section.nutrients} />
        <SectionBorder/>
        </>
      ))}
    </NutrientInputContainer>
  );
};

export const NutrientInputContainer = styled.div`
  overflow-y: scroll;
  margin-top:14px;
    display: grid;
      height: 280px;



`;

 const SectionBorder=styled.div`
 
 width: 312px;
 background: #DDE0E4;
height: 1px;
margin-top:11px;
margin-bottom:11px;
`


export default NutrientInputFieldsContainer;

