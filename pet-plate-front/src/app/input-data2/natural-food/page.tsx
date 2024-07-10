import Search from '@components/input-data2/search';
import Table from '@components/input-data2/table';
import InfoLayout from '@components/input-data2/info-layout';


const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN as string;

  // 기본 fetch 함수로 테스트 
  export async function getNaturalFoodLists(keyword:string) {
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

export default async function Page() {

  const data = await getNaturalFoodLists('고기');
  console.log(data);

  
  return (
    <>
      <InfoLayout
        title="자연식 정보를 적어주세요"
        description="가열하지 않은, 날 것 그대로 급여하는 음식을 의미해요. 바나나, 오이, 딸기 등을 포함해요."
      />
      <Search />
      <Table />
    </>
  );
}
