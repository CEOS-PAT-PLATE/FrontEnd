import Search from '@components/input-data2/search';
import Table from '@components/input-data2/table';
import InfoLayout from '@components/input-data2/info-layout';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNaturalFoodLists } from '@api/requests';

export default async function Page() {
  const queryClient = new QueryClient();

  // 미리 데이터를 가져와 쿼리 클라이언트에 캐시
  await queryClient.prefetchQuery({
    queryKey: ['naturalFoodLists', '호박'],
    queryFn: fetchNaturalFoodLists,
  });

  const dehydratedState = await dehydrate(queryClient);
  console.log(dehydratedState?.queries[0]?.state.data);
  return (
    <>
      <InfoLayout
        title="자연식 정보를 적어주세요"
        description="가열하지 않은, 날 것 그대로 급여하는 음식을 의미해요. 바나나, 오이, 딸기 등을 포함해요."
      />
      <HydrationBoundary state={dehydratedState}>
        <Search />
        <Table />
      </HydrationBoundary>
    </>
  );
}
