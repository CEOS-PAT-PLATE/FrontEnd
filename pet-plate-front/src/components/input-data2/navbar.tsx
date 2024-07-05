'use client';
import NavElements from '@components/input-data2/nav-elements';
import { Option } from '@app/lib/types';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

export const optionList: Option[] = [
  { name: '자연식', link: 'input-data2/natural-food' },
  { name: '사료', link: 'input-data2/dry-food' },
  { name: '포장 간식', link: 'input-data2/packaged-snacks' },
  { name: '즐겨찾기', link: 'input-data2/favorites' },
];

export default function Navbar() {
  const pathName = usePathname();
  return (
    <div>
      <NavContainer>
        {optionList.map((item, index) => (
          <NavElements key={index} option={item} isActive={`/${item.link}` === pathName} />
        ))}
      </NavContainer>
    </div>
  );
}

const NavContainer = styled.ul`
  position: relative; /* 절대적인 위치를 고정 */
  top: 44px; /* 화면 상단에 고정 */
  left: 17px; /* 좌측 정렬 */

  display: flex;
  justify-content: space-around;

  display: flex;
  width: 262px;
  height: 38px;
  padding: 4px;
  align-items: center;
  flex-shrink: 0;
  border-radius: 100px;
  background: var(--grey4, #cdd2d8);
`;
