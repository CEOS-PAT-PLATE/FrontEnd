import { atom } from 'recoil';



export interface SelectedItem {
    id: number;
    type: string;
    name: string;
    description?: string;
    serving?: number;
    kcal?: number;
    carbonHydrate?: number;
    protein?: number;
    fat?: number;
    calcium?: number;
    phosphorus?: number;
    vitaminA?: number;
    vitaminD?: number;
    vitaminE?: number;
  }
  
  export const selectedItemState = atom<SelectedItem | null>({
    key: 'selectedItemState',
    default: null,
  });