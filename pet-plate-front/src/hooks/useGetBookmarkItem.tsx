import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import bookmarkAPI from '@api/bookmarkAPI';

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

export const useGetBookmarkItems = (): {
  bookmarkedRaws: UseQueryResult<AxiosResponse<ApiResponse<BookmarkedRawData[]>>, Error>;
  bookmarkedFeeds: UseQueryResult<AxiosResponse<ApiResponse<BookmarkedFeedData[]>>, Error>;
  bookmarkedPackagedSnacks: UseQueryResult<AxiosResponse<ApiResponse<BookmarkedPackagedSnackData[]>>, Error>;
} => {
  const bookmarkedRaws = useQuery<AxiosResponse<ApiResponse<BookmarkedRawData[]>>, Error>({
    queryKey: ['bookmarkRaws'],
    queryFn: bookmarkAPI.getBookmarkRaws,
  });

  const bookmarkedFeeds = useQuery<AxiosResponse<ApiResponse<BookmarkedFeedData[]>>, Error>({
    queryKey: ['bookmarkFeeds'],
    queryFn: bookmarkAPI.getBookmarkFeeds,
  });

  const bookmarkedPackagedSnacks = useQuery<AxiosResponse<ApiResponse<BookmarkedPackagedSnackData[]>>, Error>({
    queryKey: ['bookmarkPackagedSnacks'],
    queryFn: bookmarkAPI.getBookmarkPackagedSnacks,
  });

  return {
    bookmarkedRaws,
    bookmarkedFeeds,
    bookmarkedPackagedSnacks,
  };
};
