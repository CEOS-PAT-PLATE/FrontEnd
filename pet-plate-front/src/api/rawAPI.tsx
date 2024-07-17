import axiosInstance from '@lib/axiosInstance';

export const rawAPI = {
  // 오늘 식사내역에 자연식 저장 **
  addRawMeal: async (petId: number, rawData: { rawId: number; serving: number }) => {
    return await axiosInstance.post(`/pets/${petId}/raws`, rawData);
  },

  // rawId로 자연식 단건 조회
  getRaw: async (rawId: number) => {
    return await axiosInstance.get(`/raws/${rawId}`);
  },

  // 자연식 검색 - keyword가 포함된 자연식 조회
  getRawsByKeyword: async (keyword: string) => {
    return await axiosInstance.get(`/raws?keyword=${keyword}`);
  },

  // 자연식 추가
  addRaw: async (rawData: {
    standardAmount: number;
    name: string;
    description: string;
    kcal: number;
    carbonHydrate: number;
    protein: number;
    fat: number;
    calcium: number;
    phosphorus: number;
    vitaminA: number;
    vitaminD: number;
    vitaminE: number;
  }) => {
    return await axiosInstance.post(`/raws`, rawData);
  },

  // rawID로 섭취했던 자연식 삭제
  deleteRaw: async (rawId: number) => {
    return await axiosInstance.delete(`/raws?rawId=${rawId}`);
  },

  // 최근 2일 동안 섭취한 자연식들 조회
  getRecentRaws: async (petId: number) => {
    return await axiosInstance.get(`/pets/${petId}/raws/recent`);
  },

  // 섭취했던 자연식 제거
  deleteRawMeal: async (petId: number, dailyRawId: number) => {
    return await axiosInstance.delete(`/pets/${petId}/raws/${dailyRawId}`);
  },
};

/**
 * 
 * 
 * logout: async (accessToken: string) => {
		return await axiosInstance.post('/api/v1/auth/logout', null, {
			headers: {
				accessToken,
			},
		});
	},
 * 
 * 
 * 
 */
export default rawAPI;
