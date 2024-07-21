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
    console.error('펫 정보 조회 실패', error);
    return [];
  }
};

export default async function Page({ searchParams }: { searchParams?: { keyword?: string } }) {
  const keyword = searchParams?.keyword || '';

  const pets = await fetchPets();
  if (pets.length === 0) {
    console.error('펫 정보가 없습니다.');
    return (
      <>
        <InfoLayout
          title="자연식 정보를 적어주세요"
          description="가열하지 않은, 날 것 그대로 급여하는 음식을 의미해요. 바나나, 오이, 딸기 등을 포함해요."
        />
        <NoticeText>펫 정보를 불러올 수 없습니다. 다시 시도해 주세요.</NoticeText>
      </>
    );
  }

  const petId = pets[0].petId;
  console.log(petId);
  console.log(pets[0]);

  const naturalFoodLists = await fetchNaturalFoodLists(keyword);
  const recentNaturalFoodLists = await fetchRecentNaturalFoodLists(petId);

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
