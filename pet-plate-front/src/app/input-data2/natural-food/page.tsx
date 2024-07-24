import { cookies } from 'next/headers';
import Search from '@components/input-data2/naturalfood-page/search';
import Table from '@components/input-data2/naturalfood-page/table';
import InfoLayout from '@components/input-data2/common/info-layout';
import NaturalFoodButton from '@components/input-data2/naturalfood-page/naturalfood-button';
import { RecentRawFood } from '@lib/types';
import NoticeText from '@style/input-data2/NoticeText';
import InfoCardAndButton from '@components/input-data2/naturalfood-page/naturalfood-notice';
import SuggestionButton from '@components/input-data2/naturalfood-page/suggestion-button';

const NEXT_PUBLIC_API_URL = 'https://apitest.petplate.kr';

const fetchWithAuth = async (endpoint: string, useAuth = true, cacheOption: RequestCache = 'no-cache') => {
  const headers: HeadersInit = {
    'Cache-Control': cacheOption,
  };

  // 자연식 검색 요청 제외하고, header에 엑세스 토큰 추가
  if (useAuth) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    console.log('쿠키', accessToken); // 쿠키 값을 로그로 출력

    if (!accessToken) {
      throw new Error('No access token found');
    }

    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  console.log('API 요청 URL:', url); // URL 확인용 로그

  const response = await fetch(url, { headers });

  if (!response.ok) {
    console.error(`API 요청 실패: ${response.status} - ${response.statusText}`);
    throw new Error('Failed to fetch');
  }

  return response.json();
};

const fetchNaturalFoodLists = async (keyword: string) => {
  // 이 요청만 토큰 없이 캐시를 강제 사용
  return await fetchWithAuth(`/api/v1/raws?keyword=${keyword}`, false, 'force-cache');
};

const fetchRecentNaturalFoodLists = async (petId: number) => {
  // 여전히 토큰 필요, 캐시는 사용하지 않음
  return await fetchWithAuth(`/api/v1/pets/${petId}/raws/recent`, true, 'no-cache');
};

// id는 달라도 입력정보가 동일하면 중복으로 처리 (이름, 양으로 필터링)
const filterUniqueByNameAndServing = (foodList: RecentRawFood[]): RecentRawFood[] => {
  return foodList.filter(
    (food, index, self) => index === self.findIndex((f) => f.name === food.name && f.serving === food.serving),
  );
};

const fetchPets = async () => {
  try {
    return await fetchWithAuth('/api/v1/pets', true, 'no-cache');
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
