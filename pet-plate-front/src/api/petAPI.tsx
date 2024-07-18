import axiosInstance from '@lib/axiosInstance';

export const petAPI = {
     // 반려견 추가
     addPetInfo : async () => {
      return await axiosInstance.post(`/api/v1/pets`);
    },


    // 유저의 모든 반려견 조회 (현재 구현단계에서는 petID를 가져오기 위한 api)
    getAllPetsInfo : async () => {
      return await axiosInstance.get(`/api/v1/pets`);
    },

    // petID로 유저의 특정 반려견 조회
    getPetsInfo : async (petId: number) => {
      return await axiosInstance.get(`/api/v1/pets/${petId}`)
    },


    // 반려견 정보 수정
    postPetInfo : async (petId: number) => {
      return await axiosInstance.post(`/api/v1/pets/${petId}`)
    }

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
  