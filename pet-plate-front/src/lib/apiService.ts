import axiosInstance from './axiosInstance';

export const saveDailyMealsNutrients = async (petId: number) => {
  let isDoneAlready = localStorage.getItem('isDoneAlready') || '';
  console.log(isDoneAlready);

  try {
    if (!isDoneAlready) {
      const response = await axiosInstance.post(`/pet/${petId}/dailyMeals/nutrients`);
      console.log(response);

      return response;
    } else {
      return null;
    }
  } catch (e: any) {
    if (e.response.status === 400) {
      localStorage.setItem('isDoneAlready', '분석완료');
      return null;
    }
  }
};
