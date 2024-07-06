'use client';

import { useRecoilState } from 'recoil';
import { searchQueryState } from '@lib/atoms';
import styled from 'styled-components';
import SearchbarDefault from '@public/svg/searchbar-default.svg?url';
import SearchbarSearching from '@public/svg/searchbar-searching.svg?url';
import SearchbarResetButton from '@public/svg/searchbar-resetbutton.svg?url';
import SearchbarIcon from '@public/svg/searchbar-searchicon.svg?url';
import Image from 'next/image';

export default function Search() {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleReset = () => {
    setSearchQuery('');
  };

  return (
    <SearchContainer>
      <SearchInputWrapper>
        <SearchIcon src={SearchbarIcon} alt="Icon" priority />
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={handleChange}
          searchQuery={searchQuery} // searchQuery를 props로 전달
        />
        {searchQuery && <ResetButton src={SearchbarResetButton} alt="Reset Icon" onClick={handleReset} priority />}
      </SearchInputWrapper>
      <TextDescription>닭가슴살 등 강아지가 먹은 간식을 검색해보세요</TextDescription>
      {searchQuery === '' && <Info>최근 섭취한 자연식</Info>}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  margin: 0px;
  position: relative;
  width: 312px;
  top: 28px;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input<{ searchQuery: string }>`
  display: flex;
  width: 312px;
  padding-left: 48px;
  padding-right: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  align-items: center;
  border-radius: 8px;
  border: ${(props) => (props.searchQuery ? '1px solid var(--grey10, #4F5357)' : '1px solid var(--grey2, #ECEEF0)')};
  background: var(--white, #fff);
  box-sizing: border-box;
  outline: none; /* 포커스 스타일 제거 */
  color: var(--grey10, #4f5357);
  /* title2_regular_16pt */
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
`;

const Info = styled.div`
  color: var(--grey10, #4f5357);
  position: relative;
  left: 0px;

  /* title2_bold_16pt */
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
  margin-top: 30px;
  margin-bottom: 25px;
`;

const ResetButton = styled(Image)`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  right: 12px;
  top: 18px;
  position: absolute;
`;

const SearchIcon = styled(Image)`
  position: absolute;
  display: flex;
  padding: 2px;
  align-items: flex-start;
  gap: 8px;
  left: 12px;
  top: 14px;
`;

const TextDescription = styled.div`
  color: var(--grey8, #7c8389);
  margin-top: 8px;
  /* body3_regular_12pt */
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
`;
