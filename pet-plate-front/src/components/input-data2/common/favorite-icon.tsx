'use client';

import StarActiveIcon from '@public/svg/star-active.svg?url';
import StarInActiveIcon from '@public/svg/star-inactive.svg?url';
import styled from 'styled-components';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import bookmarkAPI from '@api/bookmarkAPI';

// api 실연동 위해 추가
import { useAddBookmarkItem } from '@hooks/useAddBookmarkItem';
import { useRecoilValue } from 'recoil';
import { isValidState } from '@recoil/atoms';
import { isFormValidState } from '@recoil/nutrientAtoms';

import { RequiredInputState, NutrientNameState, RawFoodFormState } from '@recoil/nutrientAtoms';

// api 실연동 중 즐겨찾기 해제
import { useCancelBookmarkItem } from '@hooks/useCancelBookmarkItem';

import { useSetRecoilState } from 'recoil';
import { noticeState } from '@recoil/atoms';

export default function FavoriteIcon() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { addBookmarkRawItem, addBookmarkFeedItem, addBookmarkPackagedSnackItem } = useAddBookmarkItem();
  const { cancelBookmarkRawItem, cancelBookmarkFeedItem, cancelBookmarkPackagedSnackItem } = useCancelBookmarkItem();
  const setNotice = useSetRecoilState(noticeState);
  // 자연식 페이지
  const isValidRawForm = useRecoilValue(isValidState);

  // 포장/사료 페이지
  const isValidForm = useRecoilValue(isFormValidState);

  const requiredInputState = useRecoilValue(RequiredInputState);
  const nutrientName = useRecoilValue(NutrientNameState);
  const rawFoodForm = useRecoilValue(RawFoodFormState);

  const pathName = usePathname();

  let isValid = false;

  if (pathName === '/input-data2/natural-food') {
    isValid = isValidRawForm;
    console.log(isValid);
  } else if (pathName === '/input-data2/dry-food' || pathName === '/input-data2/packaged-snacks') {
    isValid = isValidForm;
  }

  async function handleClick() {
    if (isActive === true) {
      // 즐겨찾기 해제 로직
      try {
        const cancelId = await fetchBookmarkId();
        console.log(cancelId);
        if (cancelId !== undefined) {
          await handleCancelApiCall(cancelId);
          setIsActive(false);
        }
      } catch (error) {
        console.error('즐겨찾기 해제 중 오류가 발생했습니다:', error);
        //  alert('즐겨찾기 해제 중 오류가 발생했습니다.');
      }
    } else if (isActive === false && !isValid) {
      setNotice({ isVisible: true, message: '미입력된 정보가 있어요!' });

      //  alert('입력 양식을 확인해 주세요.');
      return;
    } else if (isActive === false && isValid) {
      // alert('즐겨찾기에 저장되었습니다.');
      handleAddApiCall();
    }
  }

  async function fetchBookmarkId(): Promise<number | undefined> {
    try {
      if (pathName === '/input-data2/natural-food') {
        const response = await bookmarkAPI.getBookmarkRaws();
        console.log(rawFoodForm);
        return response.data.data.find(
          (item: any) => item.name === rawFoodForm.name && item.serving === rawFoodForm.serving,
        )?.bookMarkedRawId;
      } else if (pathName === '/input-data2/dry-food') {
        const response = await bookmarkAPI.getBookmarkFeeds();
        return response.data.data.find((item: any) => item.name === nutrientName)?.bookMarkedFeedId;
      } else if (pathName === '/input-data2/packaged-snacks') {
        const response = await bookmarkAPI.getBookmarkPackagedSnacks();
        return response.data.data.find((item: any) => item.name === nutrientName)?.bookMarkedPackagedSnackId;
      }
    } catch (error) {
      // console.error('즐겨찾기 아이디 조회 중 오류가 발생했습니다:', error);
      // alert('즐겨찾기 아이디 조회 중 오류가 발생했습니다.');
    }
  }

  // 즐겨찾기 해제 api 연동 함수
  async function handleCancelApiCall(cancelId: number) {
    try {
      if (pathName === '/input-data2/natural-food') {
        await bookmarkAPI.deleteBookmarkRaw(cancelId);
      } else if (pathName === '/input-data2/dry-food') {
        await bookmarkAPI.deleteBookmarkFeed(cancelId);
      } else if (pathName === '/input-data2/packaged-snacks') {
        await bookmarkAPI.deleteBookmarkPackagedSnack(cancelId);
      }
      // alert('즐겨찾기에서 해제되었습니다.');
      setNotice({ isVisible: true, message: '즐겨찾기에서 해제됐어요!' });
    } catch (error) {
      console.error('즐겨찾기 해제 중 오류가 발생했습니다:', error);
      //   alert('즐겨찾기 해제 중 오류가 발생했습니다.');
    }
  }

  // 즐겨찾기에 추가 api 연동 함수
  function handleAddApiCall() {
    if (pathName === '/input-data2/natural-food') {
      addBookmarkRawItem.mutate(
        {
          rawId: rawFoodForm.rawId,
          serving: rawFoodForm.serving,
        },
        {
          onSuccess: () => {
            //   alert('즐겨찾기에 추가되었습니다.');
            setNotice({ isVisible: true, message: '즐겨찾기에 저장됐어요!' });

            setIsActive(true);
          },
          onError: () => {
            //  alert('즐겨찾기 추가 중 오류가 발생했습니다.');
            //   alert('이미 즐겨찾기에 존재합니다.');
            setNotice({ isVisible: true, message: '이미 즐겨찾기에 존재해요!' });
          },
        },
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
      addBookmarkFeedItem.mutate(feedData, {
        onSuccess: () => {
          //   alert('즐겨찾기에 추가되었습니다.');
          setNotice({ isVisible: true, message: '즐겨찾기에 저장됐어요!' });

          setIsActive(true);
        },
        onError: () => {
          //  alert('즐겨찾기 추가 중 오류가 발생했습니다.');
          setNotice({ isVisible: true, message: '이미 즐겨찾기에 존재해요!' });
        },
      });
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
      addBookmarkPackagedSnackItem.mutate(snackData, {
        onSuccess: () => {
          setNotice({ isVisible: true, message: '즐겨찾기에 저장됐어요!' });

          setIsActive(true);
        },
        onError: () => {
          setNotice({ isVisible: true, message: '이미 즐겨찾기에 존재해요!' });
        },
      });
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
