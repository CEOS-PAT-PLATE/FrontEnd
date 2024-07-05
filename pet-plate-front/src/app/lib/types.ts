// input data 2 

export type Option = {
    name: string;
    link: string;
  };


// 자연식 데이터
interface RawFood {
  id: number
  name: string
  description: string
  standardAmount: number
  kcal: number
  carbonHydrate: number
  protein: number
  fat: number
  calcium: number
  phosphorus: number
  vitaminA: number
  vitaminD: number
  vitaminE: number
}

// 즐겨찾기 자연식 데이터
interface BookMarkedRaw {
  id: number
  rawId: number
  serving: number
}

// 펫 데이터
interface Pet {
  id: number
  name: string
  breed: string
  age: number
}

// 섭취한 자연식 데이터
interface ConsumedRaw {
  petId: number
  rawId: number
  serving: number
  date: string // YYYY-MM-DD 형식
}

// 특정 일자에 섭취한 자연식 데이터
interface DailyConsumedRaw {
  petId: number
  dailyRawId: number
  rawId: number
  serving: number
  date: string // YYYY-MM-DD 형식
}
