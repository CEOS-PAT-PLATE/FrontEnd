'use client';

import StarActiveIcon from '@public/svg/star-active.svg?url';
import StarInActiveIcon from '@public/svg/star-inactive.svg?url';
import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';




// api 실연동 위해 추가
import { useAddBookmarkItem } from '@hooks/useAddBookmarkItem';
import { useRecoilValue } from 'recoil';
import { isValidState } from '@recoil/atoms';
import { isFormValidState} from '@recoil/nutrientAtoms';

import { RequiredInputState, NutrientNameState,RawFoodFormState } from '@recoil/nutrientAtoms';

// api 실연동 중 즐겨찾기 해제 
import { useCancelBookmarkItem } from '@hooks/useCancelBookmarkItem';




export default function FavoriteIcon() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { addBookmarkRawItem, addBookmarkFeedItem, addBookmarkPackagedSnackItem } = useAddBookmarkItem();
  const { cancelBookmarkRawItem, cancelBookmarkFeedItem, cancelBookmarkPackagedSnackItem } =  useCancelBookmarkItem();


  // 자연식 페이지 
  const isValidRawForm = useRecoilValue(isValidState);

  // 포장/사료 페이지 
  const isValidForm = useRecoilValue(isFormValidState);


  const requiredInputState = useRecoilValue(RequiredInputState);
  const nutrientName = useRecoilValue(NutrientNameState);
  const rawFoodForm = useRecoilValue(RawFoodFormState);


  const pathName = usePathname();

  let isValid = false;


  if(pathName === '/input-data2/natural-food') {
    isValid = isValidRawForm;
  }
  else if(pathName === '/input-data2/dry-food' || pathName === '/input-data2/packaged-snacks') {
isValid = isValidForm;
  }

  function handleClick() {
    if (isActive === true) {
      setIsActive(false);
      alert('즐겨찾기가 해제되었습니다.');
      handleCancelApiCall()
    } else if (isActive == false && !isValid) {
      alert('입력 양식을 확인해 주세요.');
      return;
    } else if (isActive == false && isValid) {
      setIsActive(true);
      alert('즐겨찾기에 저장되었습니다.');
      handleAddApiCall();
    }
  }


  const cancelId=1;


  const rawData = {
    rawId: rawFoodForm.rawId,
    serving: rawFoodForm.serving,
  };

  // 즐겨찾기에 추가 api 연동 함수

 function handleAddApiCall() {
    if (pathName === '/input-data2/natural-food') {
      addBookmarkRawItem.mutate(
        rawData,
        {
          onSuccess: () => {
            alert('즐겨찾기에 추가되었습니다.');
          },
          onError: () => {
            alert('즐겨찾기 추가 중 오류가 발생했습니다.');
          },
        }
      );
    } else if (pathName === '/input-data2/dry-food') {
      const feedData = {
        serving: parseInt(requiredInputState.find((item) => item.index === 1)?.value || '0', 10),
        name: nutrientName,
        kcal: parseInt(requiredInputState.find((item) => item.index === 2)?.value || '0', 10),
        carbonHydratePercent: parseInt(requiredInputState.find((item) => item.index === 3)?.value || '0', 10),
        proteinPercent: parseInt(requiredInputState.find((item) => item.index === 4)?.value || '0', 10),
        fatPercent: parseInt(requiredInputState.find((item) => item.index === 5)?.value || '0', 10),
        calciumPercent: parseInt(requiredInputState.find((item) => item.index === 6)?.value || '0', 10),
        phosphorusPercent: parseInt(requiredInputState.find((item) => item.index === 7)?.value || '0', 10),
        vitaminAPercent: parseInt(requiredInputState.find((item) => item.index === 8)?.value || '0', 10),
        vitaminDPercent: parseInt(requiredInputState.find((item) => item.index === 9)?.value || '0', 10),
        vitaminEPercent: parseInt(requiredInputState.find((item) => item.index === 10)?.value || '0', 10),
      };
      addBookmarkFeedItem.mutate(
        feedData,
        {
          onSuccess: () => {
            alert('즐겨찾기에 추가되었습니다.');
          },
          onError: () => {
            alert('즐겨찾기 추가 중 오류가 발생했습니다.');
          },
        }
      );
    } else if (pathName === '/input-data2/packaged-snacks') {
      const snackData = {
        serving: parseInt(requiredInputState.find((item) => item.index === 1)?.value || '0', 10),
        name: nutrientName,
        kcal: parseInt(requiredInputState.find((item) => item.index === 2)?.value || '0', 10),
        carbonHydratePercent: parseInt(requiredInputState.find((item) => item.index === 3)?.value || '0', 10),
        proteinPercent: parseInt(requiredInputState.find((item) => item.index === 4)?.value || '0', 10),
        fatPercent: parseInt(requiredInputState.find((item) => item.index === 5)?.value || '0', 10),
        calciumPercent: parseInt(requiredInputState.find((item) => item.index === 6)?.value || '0', 10),
        phosphorusPercent: parseInt(requiredInputState.find((item) => item.index === 7)?.value || '0', 10),
        vitaminAPercent: parseInt(requiredInputState.find((item) => item.index === 8)?.value || '0', 10),
        vitaminDPercent: parseInt(requiredInputState.find((item) => item.index === 9)?.value || '0', 10),
        vitaminEPercent: parseInt(requiredInputState.find((item) => item.index === 10)?.value || '0', 10),
      };
      addBookmarkPackagedSnackItem.mutate(
        snackData,
        {
          onSuccess: () => {
            alert('즐겨찾기에 추가되었습니다.');
          },
          onError: () => {
            alert('즐겨찾기 추가 중 오류가 발생했습니다.');
          },
        }
      );
    }
  }


  // 즐겨찾기 해제 api 연동 함수
  function handleCancelApiCall() {
    if (pathName === '/input-data2/natural-food') {
      cancelBookmarkRawItem.mutate(
        cancelId,
        {
          onSuccess: () => {
            alert('즐겨찾기에서 해제되었습니다.');
          },
          onError: () => {
            alert('즐겨찾기 해제 중 오류가 발생했습니다.');
          },
        }
      );
    } else if (pathName === '/input-data2/dry-food') {
   
     cancelBookmarkFeedItem.mutate(
        cancelId,
        {
          onSuccess: () => {
            alert('즐겨찾기에서 해제되었습니다.');
          },
          onError: () => {
            alert('즐겨찾기 해제 중 오류가 발생했습니다.');
          },
        }
      );
    } else if (pathName === '/input-data2/packaged-snacks') {
     
      cancelBookmarkPackagedSnackItem.mutate(
        cancelId,
        {
          onSuccess: () => {
            alert('즐겨찾기에서 해제되었습니다.');
          },
          onError: () => {
            alert('즐겨찾기 해제 중 오류가 발생했습니다.');
          },
        }
      );
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
