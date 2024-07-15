import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { bookmarkAPI } from '@api/bookmarkAPI';
import { useCancelBookmarkItem } from '@hooks/useCancelBookmarkItem';
import { useCallback } from 'react';

import { useRecoilValue } from 'recoil';
import { isValidState } from '@recoil/atoms';
import { isFormValidState } from '@recoil/nutrientAtoms';
import { RequiredInputState, NutrientNameState, RawFoodFormState } from '@recoil/nutrientAtoms';

import { usePathname } from 'next/navigation';

// 북마크 되어있는 아이템들을 가져오는 hooks

export interface BookmarkedRawData {
  bookMarkedRawId: number;
  name: string;
  description: string;
  serving: number;
  kcal: number;
  carbonHydrate: number;
  protein: number;
  fat: number;
  calcium: number;
  phosphorus: number;
  vitaminA: number;
  vitaminD: number;
  vitaminE: number;
}

export interface BookmarkedFeedData {
  bookMarkedFeedId: number;
  name: string;
  serving: number;
  kcal: number;
  carbonHydrate: number;
  protein: number;
  fat: number;
  calcium: number;
  phosphorus: number;
  vitaminA: number;
  vitaminD: number;
  vitaminE: number;
}

export interface BookmarkedPackagedSnackData {
  bookMarkedPackagedSnackId: number;
  name: string;
  serving: number;
  kcal: number;
  carbonHydrate: number;
  protein: number;
  fat: number;
  calcium: number;
  phosphorus: number;
  vitaminA: number;
  vitaminD: number;
  vitaminE: number;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}

export const useGetBookmarkItems = (
  fetch: boolean,
  pathName: string,
): {
  bookmarkedRaws?: UseQueryResult<AxiosResponse<ApiResponse<BookmarkedRawData>>, Error>;
  bookmarkedFeeds?: UseQueryResult<AxiosResponse<ApiResponse<BookmarkedFeedData>>, Error>;
  bookmarkedPackagedSnacks?: UseQueryResult<AxiosResponse<ApiResponse<BookmarkedPackagedSnackData>>, Error>;
} => {
  // 자연식 페이지
  const isValidRawForm = useRecoilValue(isValidState);

  // 포장/사료 페이지
  const isValidForm = useRecoilValue(isFormValidState);

  const requiredInputState = useRecoilValue(RequiredInputState);
  const nutrientName = useRecoilValue(NutrientNameState);
  const rawFoodForm = useRecoilValue(RawFoodFormState);

  const { cancelBookmarkRawItem, cancelBookmarkFeedItem, cancelBookmarkPackagedSnackItem } = useCancelBookmarkItem();

  const handleFindCancelId = useCallback(
    (data: any): number | undefined => {
      if (pathName === '/input-data2/natural-food') {
        return data?.data?.find((item: any) => item.bookMarkedRawId === rawFoodForm.rawId)?.bookMarkedRawId;
      } else if (pathName === '/input-data2/dry-food') {
        return data?.data?.find((item: any) => item.name === nutrientName)?.bookMarkedFeedId;
      } else if (pathName === '/input-data2/packaged-snacks') {
        return data?.data?.find((item: any) => item.name === nutrientName)?.bookMarkedPackagedSnackId;
      }
    },
    [pathName],
  );

  const onSuccess = useCallback(
    (data: any) => {
      const cancelId = handleFindCancelId(data);
      if (cancelId !== undefined) {
        if (pathName === '/input-data2/natural-food') {
          cancelBookmarkRawItem.mutate(cancelId);
        } else if (pathName === '/input-data2/dry-food') {
          cancelBookmarkFeedItem.mutate(cancelId);
        } else if (pathName === '/input-data2/packaged-snacks') {
          cancelBookmarkPackagedSnackItem.mutate(cancelId);
        }
      } else {
        alert('취소할 항목을 찾을 수 없습니다.');
      }
    },
    [handleFindCancelId, pathName, cancelBookmarkRawItem, cancelBookmarkFeedItem, cancelBookmarkPackagedSnackItem],
  );

  const queryOptions = {
    enabled: fetch, // fetch가 true일 때만 데이터 가져옴
    onSuccess, // 데이터 가져오기 성공 시 호출할 콜백 함수
  };

  const bookmarkedRaws =
    pathName === '/input-data2/natural-food'
      ? useQuery<AxiosResponse<ApiResponse<BookmarkedRawData>>, Error>({
          queryKey: ['bookmarkRaws'],
          queryFn: bookmarkAPI.getBookmarkRaws,
          ...queryOptions,
        })
      : undefined;

  const bookmarkedFeeds =
    pathName === '/input-data2/dry-food'
      ? useQuery<AxiosResponse<ApiResponse<BookmarkedFeedData>>, Error>({
          queryKey: ['bookmarkFeeds'],
          queryFn: bookmarkAPI.getBookmarkFeeds,
          ...queryOptions,
        })
      : undefined;

  const bookmarkedPackagedSnacks =
    pathName === '/input-data2/packaged-snacks'
      ? useQuery<AxiosResponse<ApiResponse<BookmarkedPackagedSnackData>>, Error>({
          queryKey: ['bookmarkPackagedSnacks'],
          queryFn: bookmarkAPI.getBookmarkPackagedSnacks,
          ...queryOptions,
        })
      : undefined;

  return {
    bookmarkedRaws,
    bookmarkedFeeds,
    bookmarkedPackagedSnacks,
  };
};
