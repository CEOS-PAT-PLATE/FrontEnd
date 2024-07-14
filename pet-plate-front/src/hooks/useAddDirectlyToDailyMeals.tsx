import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { rawAPI } from '@api/rawAPI';
import { feedAPI } from '@api/feedAPI';
import { packagedSnackAPI } from '@api/packagedSnackAPI';

interface RawMealData {
  petId: number;
  rawData: { rawId: number; serving: number };
}

interface FeedData {
  petId: number;
  data: any;
}

interface PackagedSnackData {
  petId: number;
  data: any;
}

export const useAddDirectlyToDailyMeals = (): {
  addRawMeal: UseMutationResult<AxiosResponse<any>, Error, RawMealData>;
  addFeed: UseMutationResult<AxiosResponse<any>, Error, FeedData>;
  addPackagedSnack: UseMutationResult<AxiosResponse<any>, Error, PackagedSnackData>;
} => {
  const queryClient = useQueryClient();

  const addRawMeal = useMutation<AxiosResponse<any>, Error, RawMealData>({
    mutationFn: ({ petId, rawData }) => rawAPI.addRawMeal(petId, rawData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyMeals', 'rawMeals'] });
    },
  });

  const addFeed = useMutation<AxiosResponse<any>, Error, FeedData>({
    mutationFn: ({ petId, data }) => feedAPI.addFeed(petId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyMeals', 'feeds'] });
    },
  });

  const addPackagedSnack = useMutation<AxiosResponse<any>, Error, PackagedSnackData>({
    mutationFn: ({ petId, data }) => packagedSnackAPI.addPackagedSnack(petId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailyMeals', 'packagedSnacks'] });
    },
  });

  return {
    addRawMeal,
    addFeed,
    addPackagedSnack,
  };
};
