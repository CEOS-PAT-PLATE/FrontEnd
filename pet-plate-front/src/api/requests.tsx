const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN as string;

//  - axios 적용 이전 , 커스텀 훅 적용 이전 
export async function getNaturalFoodLists(keyword: string) {
    const url = new URL(API_URL);
    url.searchParams.append('keyword', keyword);
  
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!response.ok) {
      throw new Error(`에러 ${response.statusText}`);
    }
  
    return response.json();
  }


  // React Query의 queryFn과 호환되는 함수 - 커스텀 훅으로 수정 예정
  export const fetchNaturalFoodLists = async ({ queryKey }: { queryKey: [string, string] }) => {
    const [_key, keyword] = queryKey;
    return getNaturalFoodLists(keyword);
  };


