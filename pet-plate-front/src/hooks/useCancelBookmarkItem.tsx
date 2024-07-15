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

export const useCancelBookmarkItem = (): {
  cancelBookmarkRawItem: UseMutationResult<AxiosResponse<any>, Error,number>,
  cancelBookmarkFeedItem: UseMutationResult<AxiosResponse<any>, Error,  number>;
  cancelBookmarkPackagedSnackItem: UseMutationResult<AxiosResponse<any>, Error,  number>;
} => {
  const queryClient = useQueryClient();

  const  cancelBookmarkRawItem = useMutation<AxiosResponse<any>, Error,number>({
    mutationFn: (id: number) => bookmarkAPI.deleteBookmarkRaw(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkItems'] });
    },
  });

  const cancelBookmarkFeedItem = useMutation<AxiosResponse<any>, Error, number>({
    mutationFn: (id: number) => bookmarkAPI.deleteBookmarkFeed(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkItems'] });
    },
  });

  const  cancelBookmarkPackagedSnackItem = useMutation<AxiosResponse<any>, Error, number>({
    mutationFn: (id: number) =>
      bookmarkAPI.deleteBookmarkPackagedSnack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkItems'] });
    },
  });

  return {
    cancelBookmarkRawItem,
    cancelBookmarkFeedItem,
    cancelBookmarkPackagedSnackItem,
  };
};
