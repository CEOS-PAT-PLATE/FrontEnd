import LabeledInput from '@components/input-data2/labeled-input';
import InfoLayout from '@components/input-data2/info-layout';


export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InfoLayout
      title="사료 정보를 적어주세요"
      description="반려견의 주식으로, 건식사료, 소프트사료, 습식사료, 화식사료 등을 의미해요."
    />
      <LabeledInput label="사료 이름" placeholder="사료 이름을 적어주세요" />
    </>
  );
}
