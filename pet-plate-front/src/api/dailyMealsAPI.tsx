import axiosInstance from '@lib/axiosInstance';

// 식사(섭취 내역) 컨트롤러

export const dailyMealsAPI = {
  // ** 특정 식사 내역 관련 API **//

  // 날짜로 반려견의 식사 내역 조회 (날짜 미입력시 모든 식사내역 반환) : 반환 값으로는 식사의 PK, 식사 날짜 정보가 포함
  getPetDailyMeals: async (petId: number, date?: string) => {
    const url = date ? `/pet/${petId}/dailyMeals?date=${date}` : `/pet/${petId}/dailyMeals`;
    return await axiosInstance.get(url);
  },

  // 반려견의 특정 식사에서의 모든 섭취 음식들을 조회
  // 반환 값: 식사의 PK(id), 식사 날짜, 자연식, 사료, 포장간식, 즐겨찾기 자연식, 즐겨찾기 사료, 즐겨찾기 포장간식 정보
  getSpecificMeal: async (petId: number, dailyMealId: number) => {
    return await axiosInstance.get(`/pet/${petId}/dailyMeals/${dailyMealId}`);
  },

  // ** 종류별 섭취 내역 조회 **//

  // 반려견의 특정 식사에서의 자연식 섭취 내역만 조회
  getRawMeals: async (petId: number, dailyMealId: number) => {
    return await axiosInstance.get(`/pet/${petId}/dailyMeals/${dailyMealId}/raws`);
  },

  // 반려견의 특정 식사에서의 포장간식 섭취 내역만 조회
  getPackagedSnacks: async (petId: number, dailyMealId: number) => {
    return await axiosInstance.get(`/pet/${petId}/dailyMeals/${dailyMealId}/packagedSnacks`);
  },

  // 반려견의 특정 식사 내역에서의 사료 섭취 내역만 조회
  getFeeds: async (petId: number, dailyMealId: number) => {
    return await axiosInstance.get(`/pet/${petId}/dailyMeals/${dailyMealId}/feeds`);
  },

  // ** 영양소 관련 API **//

  // 반려견의 특정 식사 내역 중 과잉 영양소를 조회
  getExcessNutrients: async (petId: number, dailyMealId: number) => {
    return await axiosInstance.get(`/pet/${petId}/dailyMeals/${dailyMealId}/nutrients/sufficient`);
  },

  // 반려견의 특정 식사 내역 중 적정 영양소를 조회
  getProperNutrients: async (petId: number, dailyMealId: number) => {
    return await axiosInstance.get(`/pet/${petId}/dailyMeals/${dailyMealId}/nutrients/proper`);
  },

  // 반려견의 특정 식사 내역 중 부족한 영양소를 조회
  getDeficientNutrients: async (petId: number, dailyMealId: number) => {
    return await axiosInstance.get(`/pet/${petId}/dailyMeals/${dailyMealId}/nutrients/deficient`);
  },

  // 반려견의 오늘 식사 내역에 대한 영양 분석을 진행(부족, 적정, 과잉 영양소)
  // 반려견의 식사 내역 중 (부족, 과잉, 적정) 영양소 조회를 하기 위해선 반드시 먼저 실행되어야 함

  saveDailyMealsNutrients: async (petId: number) => {
    return await axiosInstance.post(`/pet/${petId}/dailyMeals/nutrients`);
  },

  // ** 특정 식사에서 섭취한 음식들 제거 API **//

  // 특정 식사에서 섭취한 즐겨찾기 자연식들 제거
  deleteBookmarkRawMeals: async (petId: number, dailyMealId: number) => {
    return await axiosInstance.delete(`/pet/${petId}/dailyMeals/${dailyMealId}/bookmark/raws`);
  },

  // 특정 식사에서 섭취한 포장 간식들 제거
  deletePackagedSnacks: async (petId: number, dailyMealId: number) => {
    return await axiosInstance.delete(`/pet/${petId}/dailyMeals/${dailyMealId}/packagedSnacks`);
  },

  // 특정 식사에서 섭취한 즐겨찾기 사료들 제거
  deleteBookmarkFeeds: async (petId: number, dailyMealId: number) => {
    return await axiosInstance.delete(`/pet/${petId}/dailyMeals/${dailyMealId}/bookmark/feeds`);
  },

  // 특정 식사에서 섭취한 즐겨찾기 포장 간식들 제거
  deleteBookmarkPackagedSnacks: async (petId: number, dailyMealId: number) => {
    return await axiosInstance.delete(`/pet/${petId}/dailyMeals/${dailyMealId}/bookmark/packagedSnacks`);
  },

  // 특정 식사에서 섭취한 사료들 제거
  deleteFeeds: async (petId: number, dailyMealId: number) => {
    return await axiosInstance.delete(`/pet/${petId}/dailyMeals/${dailyMealId}/feeds`);
  },

  // 특정 식사에서 섭취한 자연식들 제거
  deleteRawMeals: async (petId: number, dailyMealId: number) => {
    return await axiosInstance.delete(`/pet/${petId}/dailyMeals/${dailyMealId}/raws`);
  },
};

export default dailyMealsAPI;
