import Search from '@components/input-data2/search';
import Table from '@components/input-data2/table';
import InfoLayout from '@components/input-data2/info-layout';

export default async function Page() {
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
