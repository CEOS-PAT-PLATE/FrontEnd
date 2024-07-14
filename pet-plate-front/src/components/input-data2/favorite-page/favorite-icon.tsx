'use client'

import StarActiveIcon from '@public/svg/star-active.svg?url';
import StarInActiveIcon from '@public/svg/star-inactive.svg?url';
import styled from 'styled-components';
import Image from 'next/image';
import { useEffect,useState } from 'react';
import { usePathname } from 'next/navigation';






export default function FavoriteIcon() {

    const [isActive, setIsActive] = useState<boolean>(false);
    const pathName = usePathname();


    useEffect(() => {
        if(pathName==='/input-data2/favorites')setIsActive(true);
    }, [pathName]);

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
cursor: pointer;
 
 
`;

