import axiosInstance from '@api/index';

export const bookmarkAPI = {


  // ** 즐겨찾기한 자연식 API **//


// [오늘] 식사내역에 섭취한 즐겨찾기 자연식 저장 
  addBookmarkRaw: async (petId: number, bookMarkedRawId: number) => {
    return await axiosInstance.post(`/pet/${petId}/bookmark/raws`, { bookMarkedRawId });
  },

  // 유저의 즐겨찾기한 자연식 모두 조회 
  getBookmarkRaws: async () => {
    return await axiosInstance.get(`/bookmark/raws`);
  },

  // 자연식을 즐겨찾기에 추가 
  addBookmarkRawItem: async (rawData: { rawId: number; serving: number }) => {
    return await axiosInstance.post(`/bookmark/raws`, rawData);
  },

  // 유저의 즐겨찾기한 자연식 단건 조회 
  getBookmarkRaw: async (bookMarkedRawId: number) => {
    return await axiosInstance.get(`/bookmark/raws/${bookMarkedRawId}`);
  },

  // 즐겨찾기한 자연식 제거 
  deleteBookmarkRaw: async (bookMarkedRawId: number) => {
    return await axiosInstance.delete(`/bookmark/raws/${bookMarkedRawId}`);
  },

  // [오늘] 식사 내역에 즐겨찾기한 자연식을 제거
  deleteBookmarkRawMeal: async (petId: number, dailyBookMarkedRawId: number) => {
    return await axiosInstance.delete(`/pet/${petId}/bookmark/raws/${dailyBookMarkedRawId}`);
  },

  // ** 즐겨찾기한 사료 API **//

  // [오늘] 식사 내역에 즐겨찾기한 사료 추가
  addBookmarkFeed: async (petId: number, bookMarkedFeedId: number) => {
    return await axiosInstance.post(`/pet/${petId}/bookmark/feeds`, { bookMarkedFeedId });
  },

  // 유저의 즐겨찾기한 사료 모두 조회
  getBookmarkFeeds: async () => {
    return await axiosInstance.get(`/bookmark/feeds`);
  },

  // 즐겨찾기에 사료 추가
  addBookmarkFeedItem: async (feedData: {
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
    return await axiosInstance.post(`/bookmark/feeds`, feedData);
  },

  // 유저가 즐겨찾기한 사료 단건 조회
  getBookmarkFeed: async (bookMarkedFeedId: number) => {
    return await axiosInstance.get(`/bookmark/feeds/${bookMarkedFeedId}`);
  },

  // 즐겨찾기한 사료 제거
  deleteBookmarkFeed: async (bookMarkedFeedId: number) => {
    return await axiosInstance.delete(`/bookmark/feeds/${bookMarkedFeedId}`);
  },

  // 식사내역에서 섭취한 즐겨찾기 사료 제거
  deleteBookmarkFeedMeal: async (petId: number, dailyBookMarkedFeedId: number) => {
    return await axiosInstance.delete(`/pet/${petId}/bookmark/feeds/${dailyBookMarkedFeedId}`);
  },


    // ** 즐겨찾기한 포장 간식 API **//

    // [오늘] 식사내역에 즐겨찾기한 포장 간식 저장
  addBookmarkPackagedSnack: async (petId: number, bookMarkedPackagedSnackId: number) => {
    return await axiosInstance.post(`/pet/${petId}/bookmark/packagedSnacks`, { bookMarkedPackagedSnackId });
  },


  // 유저의 즐겨찾기한 포장 간식 모두 조회
  getBookmarkPackagedSnacks: async () => {
    return await axiosInstance.get(`/bookmark/packagedSnacks`);
  },

  // 즐겨찾기에 포장 간식 추가
  addBookmarkPackagedSnackItem: async (snackData: {
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
    return await axiosInstance.post(`/bookmark/packagedSnacks`, snackData);
  },

// 유저가 즐겨찾기한 포장 간식 단건 조회
  getBookmarkPackagedSnack: async (bookMarkedPackagedSnackId: number) => {
    return await axiosInstance.get(`/bookmark/packagedSnacks/${bookMarkedPackagedSnackId}`);
  },

// 즐겨찾기한 포장 간식 제거
  deleteBookmarkPackagedSnack: async (bookMarkedPackagedSnackId: number) => {
    return await axiosInstance.delete(`/bookmark/packagedSnacks/${bookMarkedPackagedSnackId}`);
  },
  
  // [오늘] 식사 내역에서 섭취한 즐겨찾기 포장 간식 제거
  deleteBookmarkPackagedSnackMeal: async (petId: number, dailyBookMarkedPackagedSnackId: number) => {
    return await axiosInstance.delete(`/pet/${petId}/bookmark/packagedSnacks/${dailyBookMarkedPackagedSnackId}`);
  },
};

export default bookmarkAPI;
