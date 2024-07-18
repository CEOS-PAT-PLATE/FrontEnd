'use client';

import styled from 'styled-components';
import Image from 'next/image';

import MainHeader from '@components/main/mainHeader';
import LinkButton from '@components/main/linkBtn';
import ResultList from '@components/main/resultList';
import infoCard from '@public/svg/analyze-result-card.svg?url';
import nextIcon from '@public/svg/arrow-left-line.svg?url';

export default function page() {
  const buttonContent = (
    <>
      <span style={{ color: '#fff' }}>새로 분석 하러가기</span>
      <Image style={{ marginLeft: '6.688rem' }} src={nextIcon} alt="next-icon" />
    </>
  );

  return (
    <PageWrapper>
      <MainHeader />
      <InfoCardContainer>
        <InfoCard src={infoCard} alt="info" />
        <FixedBtnWrapper>
          <LinkButton
            href="/input-data1" //login 여부에 따라 수정
            backgroundcolor={(props) => props.theme.colors.green}
            hoverbackgroundcolor={(props) => props.theme.colors.green}
            hoverbuttoncontentcolor="#fff"
            buttonContent={buttonContent}
          />
        </FixedBtnWrapper>
      </InfoCardContainer>

      <ResultListContainer>
        <Text>
          이전 분석결과 <span>5건</span>
        </Text>{' '}
        {/* 5건은 api연동 후 length로 가져오기 */}
        <ResultListWrapper>
          <ResultList />
          <ResultList />
          <ResultList />
          <ResultList />
          <ResultList />
        </ResultListWrapper>
      </ResultListContainer>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoCardContainer = styled.div`
  width: 100%;
  height: min-content;
  background-color: ${(props) => props.theme.colors['green-200']};

  position: relative;
`;

const InfoCard = styled(Image)`
  position: absolute;
  top: 0;
`;

const FixedBtnWrapper = styled.div`
  position: absolute;
  top: 7.688rem;
  left: 1.5rem;
`;

const ResultListContainer = styled.div`
  width: 100%;
  height: 26.5rem;
  margin-top: 12.5rem;
  background-color: ${(props) => props.theme.colors['grey1']};

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Text = styled.h1`
  width: 19.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors['grey11']};

  span {
    color: ${(props) => props.theme.colors.green};
  }
`;
const ResultListWrapper = styled.div`
  width: 19.5rem;
  height: 22rem;
  overflow: scroll;
`;
