'use client';
import styled from 'styled-components';
import InfoCardAndButton from '@components/input-data2/naturalfood-page/naturalfood-notice';

const ContentStyleWrapper = styled.div`
  position: relative; /* 절대적인 위치를 고정 */
  top: 0px;
`;

export default function InfoCardWrapper() {
  return <ContentStyleWrapper>      
    <InfoCardAndButton />
</ContentStyleWrapper>;
}
