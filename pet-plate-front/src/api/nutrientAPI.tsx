import axiosInstance from '@api/index';

export const nutrientAPI = {
  // 반려견이 하루 섭취한 영양소 정보 조회 (날짜 미입력시 오늘 정보 조회)
  getPetNutrients: async (petId: number, date?: string) => {
    const url = date ? `/pets/${petId}/nutrients?date=${date}` : `/pets/${petId}/nutrients`;
    return await axiosInstance.get(url);
  },

  // 반려견이 하루 동안 섭취한 칼로리 조회 (날짜 미입력시 오늘 정보 조회)
  getPetKcal: async (petId: number, date?: string) => {
    const url = date ? `/pets/${petId}/kcal?date=${date}` : `/pets/${petId}/kcal`;
    return await axiosInstance.get(url);
  },

  // 반려견이 하루동안 섭취해야 할 적정 칼로리 대비 실 섭취 칼로리 비율 조회
  // 예)적정 섭취 칼로리가 100kcal인데 오늘 200kcal을 섭취한 경우, ratio=2를 반환함 문제점) 오늘이 아닌 이전의 정보를 조회시 정확도에 문제가 존재함

  getPetKcalRatio: async (petId: number, date?: string) => {
    const url = date ? `/pets/${petId}/kcal/ratio?date=${date}` : `/pets/${petId}/kcal/ratio`;
    return await axiosInstance.get(url);
  },

  // 반려견이 하루동안 섭취해야 할 적정 칼로리 조회
  getPetProperKcal: async (petId: number) => {
    return await axiosInstance.get(`/pets/${petId}/kcal/proper`);
  },
};

export default nutrientAPI;
