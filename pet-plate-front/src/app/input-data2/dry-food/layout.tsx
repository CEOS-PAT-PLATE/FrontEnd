import LabeledInput from '@components/input-data2/labeled-input';
import InfoLayout from '@components/input-data2/info-layout';
import NutrientInfoLayout from '@components/input-data2/nutrient-info-layout';
import NutrientInputFieldsContainer from '@components/input-data2/nutrient-input-container';


export default async function Layout({ children }: { children: React.ReactNode }) {

    const title='영양정보'
    const description=` 영양 정보는 영양 분석을 위해 사용돼요.
입력하지 않은 영양 정보는 0으로 자동 입력돼요`

interface Nutrient {
    name: string;
    unit: string;
    isRequired: boolean;
  }
  
  interface NutrientSection {
    nutrients: Nutrient[];
  }
  
  const nutrientSections: NutrientSection[] = [
    {
      nutrients: [
        { name: '사료 총량', unit: 'g', isRequired: true },
        { name: '칼로리', unit: 'kcal', isRequired: true },
        { name: '지방 (오메가3, 오메가6)', unit: '%', isRequired: true },
        { name: '단백질', unit: '%', isRequired: true },
        { name: '탄수화물', unit: '%', isRequired: false },
      ]
    },
    {
      nutrients: [
        { name: '칼슘', unit: '%', isRequired: false },
        { name: '인', unit: '%', isRequired: false },
      ]
    },
    {
      nutrients: [
        { name: '비타민 A', unit: '%', isRequired: false },
        { name: '비타민 D', unit: '%', isRequired: false},
        { name: '비타민 E', unit: '%', isRequired: false },
  
      ]
    }
  ];

  return (
    <>
      <InfoLayout
      title="사료 정보를 적어주세요"
      description="반려견의 주식으로, 건식사료, 소프트사료, 습식사료, 화식사료 등을 의미해요."
    />
      <LabeledInput label="사료 이름" placeholder="사료 이름을 적어주세요" />
      < NutrientInfoLayout title={title} description={description}/>
      <NutrientInputFieldsContainer nutrientSections={nutrientSections} />

    </>
  );
}
