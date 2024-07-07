'use client'

import AddPlateButton from '@public/svg/add.svg?url';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/navigation'
import { useRecoilState, useResetRecoilState } from 'recoil';
import { searchQueryState, isValidState,isServing } from '@lib/atoms';




export default function AddButton() {

    const resetSearchQuery = useResetRecoilState(searchQueryState);
  const resetIsValid = useResetRecoilState(isValidState);
  const resetIsServing= useResetRecoilState(isServing);

  function resetGlobalState() { // 전역 상태 초기화 함수
    resetSearchQuery();
    resetIsValid();
    resetIsServing();
  }


    

    const router = useRouter()


    function handleClick() {

        router.push('/input-data2/natural-food', { scroll: false })
      resetGlobalState()
        }



  return (
    <>
    <AddPlateButtonImage src={AddPlateButton} alt='add-plate-button'       onClick={handleClick}
    />
    </>
  )
}   



const AddPlateButtonImage = styled(Image)`
    position: absolute;
    top:591px;
    left: 83px;

    
    margin: 20px;
    cursor: pointer;
 
`;
