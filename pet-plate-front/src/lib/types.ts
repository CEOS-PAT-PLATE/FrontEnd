// input data 2

// 영양 정보

// 최근 2일간 섭취한 자연식 데이터

export interface RawMealData {
  petId: number;
  rawData: { rawId: number; serving: number };
}

export interface RecentRawFood {
  dailyRawId: number;
  name: string;
  description: string | null;
  serving: number;
  kcal: number;
  carbonHydrate: number;
  protein: number;
  fat: number;
  calcium: number;
  phosphorus: number;
  vitaminA: number;
  vitaminD: number;
  vitaminE: number;
}

type RecentRawFoodList = RecentRawFood[];


interface Nutrient {
  name: string;
  unit: string;
  isRequired: boolean;
  index: number;
}

interface NutrientSection {
  nutrients: Nutrient[];
}

interface NutrientInputFieldsContainerProps {
  nutrientSections: NutrientSection[];
}

interface NutrientInputFieldProps {
  label: string;
  unit: string;
  isRequired: boolean;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export type Option = {
  name: string;
  link: string;
};

export interface CardProps {
  title: string;
  description: string;
  titleFontWeight: string;
  titleLineHeight: string;
  descriptionFontWeight: string;
  descriptionLineHeight: string;
  isClicked: boolean;
  someClicked: boolean;
  onClick?: () => void;
}

// 자연식 데이터
export interface RawFood {
  rawId: number;
  name: string;
  description: string;
  standardAmount: number;
  kcal: number;
  carbonHydrate: number;
  protein: number;
  fat: number;
  calcium: number;
  phosphorus: number;
  vitaminA: number;
  vitaminD: number;
  vitaminE: number;
}

// 즐겨찾기 자연식 데이터
export interface BookMarkedRaw {
  id: number;
  rawId: number;
  serving: number;
}

// 펫 데이터
export interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
}

// 섭취한 자연식 데이터
export interface ConsumedRaw {
  petId: number;
  rawId: string;
  serving: number;
  date: string; // YYYY-MM-DD 형식
}

// 특정 일자에 섭취한 자연식 데이터
export interface DailyConsumedRaw {
  petId: number;
  dailyRawId: number;
  rawId: number;
  serving: number;
  date: string; // YYYY-MM-DD 형식
}

//반려견 기본 정보
export interface PetInfo {
  petId: number;
  name: string;
  age: number;
  weight: number;
  activity: string;
  neutering: string;
}
