import axiosInstance from '@lib/axiosInstance';


export const userAPI = {
  // 유저의 자신의 프로필 조회
  getUserInfo: async () => {
    return await axiosInstance.get(`/users/my-profile`);
  },

  //로그아웃
  logout: async (accessToken: string) => {
    return await axiosInstance.post('/auth/logout', null, {
        headers: {
            accessToken,
        },
    });
},

}
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
export default userAPI;
