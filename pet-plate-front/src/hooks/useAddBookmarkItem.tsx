import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { bookmarkAPI } from '@api/bookmarkAPI';

interface BookmarkRawData {
  rawId: number;
  serving: number;
}

interface BookmarkFeedData {
  serving: number;
  name: string;
  kcal: number;
  carbonHydratePercent: number;
  proteinPercent: number;
  fatPercent: number;
  calciumPercent: number;
  phosphorusPercent: number;
  vitaminAPercent: number;
  vitaminDPercent: number;
  vitaminEPercent: number;
}

interface BookmarkPackagedSnackData {
  serving: number;
  name: string;
  kcal: number;
  carbonHydratePercent: number;
  proteinPercent: number;
  fatPercent: number;
  calciumPercent: number;
  phosphorusPercent: number;
  vitaminAPercent: number;
  vitaminDPercent: number;
  vitaminEPercent: number;
}

export const useAddBookmarkItem = (): {
  addBookmarkRawItem: UseMutationResult<AxiosResponse<any>, Error, BookmarkRawData>;
  addBookmarkFeedItem: UseMutationResult<AxiosResponse<any>, Error, BookmarkFeedData>;
  addBookmarkPackagedSnackItem: UseMutationResult<AxiosResponse<any>, Error, BookmarkPackagedSnackData>;
} => {
  const queryClient = useQueryClient();

  const addBookmarkRawItem = useMutation<AxiosResponse<any>, Error, BookmarkRawData>({
    mutationFn: (rawData: BookmarkRawData) => bookmarkAPI.addBookmarkRawItem(rawData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkItems'] });
    },
  });

  const addBookmarkFeedItem = useMutation<AxiosResponse<any>, Error, BookmarkFeedData>({
    mutationFn: (feedData: BookmarkFeedData) => bookmarkAPI.addBookmarkFeedItem(feedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkItems'] });
    },
  });

  const addBookmarkPackagedSnackItem = useMutation<AxiosResponse<any>, Error, BookmarkPackagedSnackData>({
    mutationFn: (snackData: BookmarkPackagedSnackData) =>
      bookmarkAPI.addBookmarkPackagedSnackItem(snackData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkItems'] });
    },
  });

  return {
    addBookmarkRawItem,
    addBookmarkFeedItem,
    addBookmarkPackagedSnackItem,
  };
};
