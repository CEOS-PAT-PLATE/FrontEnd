import LabeledInput from '@components/input-data2/labeled-input';
import InfoLayout from '@components/input-data2/info-layout';


export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
     <InfoLayout
    title="포장 간식 정보를 적어주세요"
    description="주 사료, 생식, 날 것의 간식을 제외한, 스틱, 덴탈껌 등을 포함한 간식을 의미해요."
  />
      <LabeledInput label="포장 간식 이름" placeholder="포장 간식 이름을 적어주세요" />
    </>
  );
}
