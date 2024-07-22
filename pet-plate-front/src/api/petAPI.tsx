import axiosInstance from '@lib/axiosInstance';

interface Pet {
  petId: number;
  name: string;
  age: number | undefined;
  weight: number | undefined;
  activity: string;
  neutering: string;
  profileImgPath: string | null;
}

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
  putPetInfo: async (petId: number, petInfo: Pet) => {
    return await axiosInstance.put(`/pets/${petId}`, petInfo);
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
