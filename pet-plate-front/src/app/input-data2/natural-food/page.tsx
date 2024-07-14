import Search from '@components/input-data2/naturalfood-page/search';
import Table from '@components/input-data2/naturalfood-page/table';
import InfoLayout from '@components/input-data2/common/info-layout';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NaturalFoodButton from '@components/input-data2/naturalfood-page/naturalfood-button';
import { rawAPI } from '@api/rawAPI';
import { RawFood } from '@lib/types';

const fetchNaturalFoodLists = async (keyword: string) => {
  const response = await rawAPI.getRawsByKeyword(keyword);
  return response.data;
};

export default async function Page({ searchParams }: { searchParams?: { keyword?: string } }) {
  /*const queryClient = new QueryClient();

  // 미리 데이터를 가져와 쿼리 클라이언트에 캐시
  await queryClient.prefetchQuery({
    queryKey: ['naturalFoodLists', '호박'],
    queryFn: fetchNaturalFoodLists,
  });

  const dehydratedState = await dehydrate(queryClient);
  console.log(dehydratedState?.queries[0]?.state.data);
        <HydrationBoundary state={dehydratedState}>
         </HydrationBoundary>
  */

  const keyword = searchParams?.keyword || '';

  // data 속성을 추출하고, 그 값을 naturalFoodLists라는 변수에 할당
  const { data: naturalFoodLists } = await fetchNaturalFoodLists(keyword);

  console.log(naturalFoodLists);

  return (
    <>
      <InfoLayout
        title="자연식 정보를 적어주세요"
        description="가열하지 않은, 날 것 그대로 급여하는 음식을 의미해요. 바나나, 오이, 딸기 등을 포함해요."
      />

      <Search placeholder="검색" />
      <Table keyword={keyword} rawFoods={naturalFoodLists }/>
      <NaturalFoodButton />
    </>
  );
}
