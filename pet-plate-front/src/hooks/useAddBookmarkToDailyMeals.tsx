import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { bookmarkAPI } from '@api/bookmarkAPI';

interface BookmarkRawData {
  petId: number;
  bookMarkedRawId: number;
}

interface BookmarkFeedData {
  petId: number;
  bookMarkedFeedId: number;
}

interface BookmarkPackagedSnackData {
  petId: number;
  bookMarkedPackagedSnackId: number;
}

export const useAddBookmarkToDailyMeals = (): {
  addBookmarkRaw: UseMutationResult<AxiosResponse<any>, Error, BookmarkRawData>;
  addBookmarkFeed: UseMutationResult<AxiosResponse<any>, Error, BookmarkFeedData>;
  addBookmarkPackagedSnack: UseMutationResult<AxiosResponse<any>, Error, BookmarkPackagedSnackData>;
} => {
  const queryClient = useQueryClient();

  const addBookmarkRaw = useMutation<AxiosResponse<any>, Error, BookmarkRawData>({
    mutationFn: ({ petId, bookMarkedRawId }: BookmarkRawData) => bookmarkAPI.addBookmarkRaw(petId, bookMarkedRawId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyMeals'] });
    },
  });

  const addBookmarkFeed = useMutation<AxiosResponse<any>, Error, BookmarkFeedData>({
    mutationFn: ({ petId, bookMarkedFeedId }: BookmarkFeedData) => bookmarkAPI.addBookmarkFeed(petId, bookMarkedFeedId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyMeals'] });
    },
  });

  const addBookmarkPackagedSnack = useMutation<AxiosResponse<any>, Error, BookmarkPackagedSnackData>({
    mutationFn: ({ petId, bookMarkedPackagedSnackId }: BookmarkPackagedSnackData) =>
      bookmarkAPI.addBookmarkPackagedSnack(petId, bookMarkedPackagedSnackId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyMeals'] });
    },
  });

  return {
    addBookmarkRaw,
    addBookmarkFeed,
    addBookmarkPackagedSnack,
  };
};
