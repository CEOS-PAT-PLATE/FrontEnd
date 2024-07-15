'use client';

import StarActiveIcon from '@public/svg/star-active.svg?url';
import StarInActiveIcon from '@public/svg/star-inactive.svg?url';
import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useRecoilState } from 'recoil';
import { isBookmarkUpdated } from '@recoil/atoms';

import bookmarkAPI from '@api/bookmarkAPI';

interface FavoriteIconProps {
  id: number;
  type: string;
}

export default function FavoriteIcon({ id, type }: FavoriteIconProps) {
  const [isActive, setIsActive] = useState<boolean>(true);
  const pathName = usePathname();
  const [bookMarkState,setbookarkState] = useRecoilState(isBookmarkUpdated);

  /*
  function handleClick() {
    if (isActive === true) setIsActive(false);
    else if (isActive == false) {
      setIsActive(true);
    }
  }
*/

  async function handleClick() {
    if (isActive) {
      try {
        if (type === '자연식') {
          await bookmarkAPI.deleteBookmarkRaw(id);
        } else if (type === '사료') {
          await bookmarkAPI.deleteBookmarkFeed(id);
        } else if (type === '포장 간식') {
          await bookmarkAPI.deleteBookmarkPackagedSnack(id);
        }
        setIsActive(false);
        alert('즐겨찾기에서 해제되었습니다.');
        setbookarkState(!bookMarkState);
      } catch (error) {
        console.error('즐겨찾기 해제 중 오류가 발생했습니다:', error);
        alert('즐겨찾기 해제 중 오류가 발생했습니다.');
      }
    } else {
      setIsActive(true);
    }
  }

  return (
    <FavoriteIconImage
      src={isActive ? StarActiveIcon : StarInActiveIcon}
      alt="favorite-icon"
      onClick={() => handleClick()}
    />
  );
}

const FavoriteIconImage = styled(Image)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
