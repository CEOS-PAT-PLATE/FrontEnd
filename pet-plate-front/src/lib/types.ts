// input data 2 

export type Option = {
  name: string;
  link: string;
};


// 자연식 데이터
export interface RawFood {
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
export interface BookMarkedRaw {
id: number
rawId: number
serving: number
}

// 펫 데이터
export interface Pet {
id: number
name: string
breed: string
age: number
}

// 섭취한 자연식 데이터
export interface ConsumedRaw {
petId: number
rawId: string
serving: number
date: string // YYYY-MM-DD 형식
}

// 특정 일자에 섭취한 자연식 데이터
export interface DailyConsumedRaw {
petId: number
dailyRawId: number
rawId: number
serving: number
date: string // YYYY-MM-DD 형식
}
