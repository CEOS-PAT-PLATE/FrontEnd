import axiosInstance from '@lib/axiosInstance';

export const packagedSnackAPI = {

// 오늘 식사내역에 해당 포장 간식의 정보를 추가
  addPackagedSnack: async (petId: number, data: {
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
  }) => {
    return await axiosInstance.post(`/pet/${petId}/packagedSnacks`, data);
  },

  // 반려견의 특정 식사에서의 포장간식 섭취 내역만 조회
  getPackagedSnack: async (petId: number, dailyPackagedSnackId: number) => {
    return await axiosInstance.get(`/pet/${petId}/packagedSnacks/${dailyPackagedSnackId}`);
  },

  // 반려견의 특정 식사에서의 포장간식 섭취 내역 삭제
  deletePackagedSnack: async (petId: number, dailyPackagedSnackId: number) => {
    return await axiosInstance.delete(`/pet/${petId}/packagedSnacks/${dailyPackagedSnackId}`);
  },

  

};

export default packagedSnackAPI;
