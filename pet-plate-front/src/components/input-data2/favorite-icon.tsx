'use client'

import StarActiveIcon from '@public/svg/star-active.svg?url';
import StarInActiveIcon from '@public/svg/star-inactive.svg?url';
import styled from 'styled-components';
import Image from 'next/image';
import { useEffect,useState } from 'react';





export default function FavoriteIcon() {

    const [isActive, setIsActive] = useState<boolean>(true);

    function handleClick(){
        if(isActive===true)setIsActive(false)
            else if(isActive==false){setIsActive(true);}
    }

 
  return (
    <FavoriteIconImage src={isActive ? StarActiveIcon : StarInActiveIcon} alt='favorite-icon'  onClick={() => handleClick()}/>

  );
}

const FavoriteIconImage = styled(Image)`
width: 30px;
height: 30px;
position:absolute;
  cursor: pointer;
  right:10px;
`;

