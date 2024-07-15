import { dailyMealsAPI } from '@api/dailyMealsAPI';

/*
  // 반려견의 특정 식사에서의 모든 섭취 음식들을 조회
  // 반환 값: 식사의 PK(id), 식사 날짜, 자연식, 사료, 포장간식, 즐겨찾기 자연식, 즐겨찾기 사료, 즐겨찾기 포장간식 정보
  getSpecificMeal: async (petId: number, dailyMealId: number) => {
    return await axiosInstance.get(`/pet/${petId}/dailyMeals/${dailyMealId}`);
  },
*/

// ? : dailymealid를 과연 어디서 받아올 것인가?

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const fetchdailyMealId = async (petId: number, date?: string) => {
  const response = await dailyMealsAPI.getPetDailyMeals(petId, date);
  return response.data;
};

const fetchdailyMealLists = async (petId: number, dailyMealId: number) => {
  const response = await dailyMealsAPI.getSpecificMeal(petId, dailyMealId);
  return response.data;
};

export default async function Page() {
  const petId = 3;

  try {
    // const { data: dailyMeal } = await fetchdailyMealId(petId, '2024-07-15');
    //
    // const { data: dailyMealLists } = await fetchdailyMealLists(petId, dailyMeal.dailyMealId);
    //  const dailyMealListsResult = await dailyMealLists.json(dailyMealLists);
  } catch (e) {
    console.log(e);
  }

  return <div></div>;
}
