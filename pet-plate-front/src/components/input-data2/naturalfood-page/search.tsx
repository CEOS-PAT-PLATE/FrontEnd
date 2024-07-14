'use client';

import { useRecoilValue, useRecoilState } from 'recoil';
import { searchQueryState } from '@recoil/atoms';
import styled from 'styled-components';
import SearchbarResetButton from '@public/svg/searchbar-resetbutton.svg?url';
import SearchbarIcon from '@public/svg/searchbar-searchicon.svg?url';
import Image from 'next/image';
import { isValidState, isServing } from '@recoil/atoms';

// 리펙토링을 위한 import 
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Search({placeholder}: {placeholder: string}) {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const isValid = useRecoilValue(isValidState);
  const isServingState = useRecoilValue(isServing);

  // 리펙토링을 위한 hooks 
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const params = new URLSearchParams(searchParams);
    if(event.target.value) {
      params.set('keyword', event.target.value);
    }else{params.delete('keyword');}

    replace(`${pathname}?${params.toString()}`);              ;
  };

  const handleReset = () => {
    setSearchQuery('');
  };

 // if (isServingState) {
 //   return null;
 // }

  return (
    <SearchContainer>
      <SearchInputWrapper>
        <SearchIcon src={SearchbarIcon} alt="Icon" priority />
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={handleChange}
          $searchQuery={searchQuery} // $ 접두사를 사용하여 props 전달
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

const SearchInput = styled.input<{ $searchQuery: string }>`
  display: flex;
  width: 312px;
  padding-left: 48px;
  padding-right: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  align-items: center;
  border-radius: 8px;
  border: ${(props) => (props.$searchQuery ? '1px solid var(--grey10, #4F5357)' : '1px solid var(--grey2, #ECEEF0)')};
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
