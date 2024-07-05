'use client';

import { useRecoilState } from 'recoil';
import { searchQueryState } from '@lib/atoms';
import styled from 'styled-components';

export default function Search() {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <SearchContainer>
      <SearchInput type="text" value={searchQuery} onChange={handleChange} placeholder="검색어를 입력해주세요" />
      <Info>최근 섭취한 자연식</Info>
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  margin: 20px 0;
`;

const SearchInput = styled.input`
border-radius: 8px;
border: 1px solid var(--grey2, #ECEEF0);
background: var(--white, #FFF);
 display: flex;
width: 312px;
padding: 12px;
align-items: center;
gap: 12px;
`;

const Info = styled.div`
  color: var(--grey10, #4f5357);
position:relative;
top:10px;
left:0px;

  /* title2_bold_16pt */
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
`;
