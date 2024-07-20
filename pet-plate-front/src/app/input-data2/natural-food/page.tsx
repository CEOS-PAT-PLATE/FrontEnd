import Search from '@components/input-data2/naturalfood-page/search';
import Table from '@components/input-data2/naturalfood-page/table';
import InfoLayout from '@components/input-data2/common/info-layout';
import NaturalFoodButton from '@components/input-data2/naturalfood-page/naturalfood-button';
import { rawAPI } from '@api/rawAPI';
import { RecentRawFood } from '@lib/types';
import NoticeText from '@style/input-data2/NoticeText';
import InfoCardAndButton from '@components/input-data2/naturalfood-page/naturalfood-notice';
import petAPI from '@api/petAPI';
import SuggestionButton from '@components/input-data2/naturalfood-page/suggestion-button'; // 경로를 실제 파일 위치에 맞게 수정하세요

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
  return foodList.filter(
    (food, index, self) => index === self.findIndex((f) => f.name === food.name && f.serving === food.serving),
  );
};

// 맨 먼저 임시로 Petid 가져오려고 실행
const fetchPets = async () => {
  try {
    const response = await petAPI.getAllPetsInfo();
    return response.data.data;
  } catch (error) {
    console.error('펫 못가져옴', error);
    return [];
  }
};

export default async function Page({ searchParams }: { searchParams?: { keyword?: string } }) {
  //const petId = 3;

  // 최근 2일동안 섭취한 자연식
  // 쿼리 클라이언트

  const keyword = searchParams?.keyword || '';

  const pets = await fetchPets();
  console.log(pets);


  const petId = pets[0].petId;

  console.log(petId);
  console.log(pets[0]);

  // data 속성을 추출하고, 그 값을 naturalFoodLists라는 변수에 할당
  const { data: naturalFoodLists } = await fetchNaturalFoodLists(keyword);

  //console.log(naturalFoodLists);

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
      <Table keyword={keyword} rawFoods={naturalFoodLists} recentRawFoods={uniqueRecentNaturalFoodLists} />
      <NoticeText>자연식이 뭔지 모르겠어요!</NoticeText>
      <SuggestionButton />
      <NaturalFoodButton />
      <InfoCardAndButton />
    </>
  );
}
