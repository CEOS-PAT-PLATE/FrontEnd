import axiosInstance from '@lib/axiosInstance';

export const petAPI = {
  // 반려견 추가
  addPetInfo: async (newPetInfo: any) => {
    // newPetInfo 매개변수 추가
    return await axiosInstance.post(`/pets`, newPetInfo);
  },

  // 유저의 모든 반려견 조회 (현재 구현단계에서는 petID를 가져오기 위한 api)
  getAllPetsInfo: async () => {
    return await axiosInstance.get(`/pets`);
  },

  // petID로 유저의 특정 반려견 조회
  getPetsInfo: async (petId: number) => {
    return await axiosInstance.get(`/pets/${petId}`);
  },

  // 반려견 정보 수정
  putPetInfo: async (petId: number) => {
    return await axiosInstance.put(`/pets/${petId}`);
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
export default petAPI;
