import axiosInstance from './index';


export const feedAPI = {

    // 오늘 식사내역에 해당 사료의 정보를 추가
    addFeed: async (petId: number, feedData: {
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
    return await axiosInstance.post(`/api/v1/pet/${petId}/feeds`, feedData);
  },

  // 반려견의 특정 식사에서의 사료 섭취 내역만 조회
  getFeed: async (petId: number, dailyFeedId: number) => {
    return await axiosInstance.get(`/api/v1/pet/${petId}/feeds/${dailyFeedId}`);
  },

  // 반려견의 특정 식사에서의 사료 섭취 내역 삭제
  deleteFeed: async (petId: number, dailyFeedId: number) => {
    return await axiosInstance.delete(`/api/v1/pet/${petId}/feeds/${dailyFeedId}`);
  }
};

export default feedAPI;
