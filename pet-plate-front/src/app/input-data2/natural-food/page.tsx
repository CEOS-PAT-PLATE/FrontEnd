import Search from '@components/input-data2/naturalfood-page/search';
import Table from '@components/input-data2/naturalfood-page/table';
import InfoLayout from '@components/input-data2/common/info-layout';
import NaturalFoodButton from '@components/input-data2/naturalfood-page/naturalfood-button';
import { rawAPI } from '@api/rawAPI';
import { RecentRawFood } from '@lib/types';


const fetchNaturalFoodLists = async (keyword: string) => {
  const response = await rawAPI.getRawsByKeyword(keyword);
  return response.data;
};

const fetchRecentNaturalFoodLists = async (petId: number) => {
  const response = await rawAPI.getRecentRaws(petId);
  return response.data;
};

// id는 달라도 입력정보가 동일하면 중복으로 처리 (이름, 양으로 필터링)
const filterUniqueByNameAndServing = (foodList: RecentRawFood[]): RecentRawFood[] => {
  return foodList.filter((food, index, self) => 
    index === self.findIndex(f => f.name === food.name && f.serving === food.serving)
  );
};



export default async function Page({ searchParams }: { searchParams?: { keyword?: string } }) {

  const petId = 3;

  
  // 최근 2일동안 섭취한 자연식
  // 쿼리 클라이언트

  

  const keyword = searchParams?.keyword || '';

  // data 속성을 추출하고, 그 값을 naturalFoodLists라는 변수에 할당
  const { data: naturalFoodLists } = await fetchNaturalFoodLists(keyword);

  console.log(naturalFoodLists);

  const { data: recentNaturalFoodLists } = await fetchRecentNaturalFoodLists(petId);

  // name과 serving이 유일한 값만 남기기
  const uniqueRecentNaturalFoodLists = filterUniqueByNameAndServing(recentNaturalFoodLists);

  return (
    <>
      <InfoLayout
        title="자연식 정보를 적어주세요"
        description="가열하지 않은, 날 것 그대로 급여하는 음식을 의미해요. 바나나, 오이, 딸기 등을 포함해요."
      />

      <Search placeholder="검색" />
      <Table keyword={keyword} rawFoods={naturalFoodLists } recentRawFoods={uniqueRecentNaturalFoodLists}/>
      <NaturalFoodButton />
    </>
  );
}
