'use client'
import NavElements from './nav-elements'
import { Option } from '../../lib/types'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

export const optionList: Option[] = [
  { name: '자연식', link: 'input-data2/natural-food' },
  { name: '사료', link: 'input-data2/dry-food' },
  { name: '포장 간식', link: 'input-data2/packaged-snacks' },
  { name: '즐겨찾기', link: 'input-data2/favorites' },
]

export default function Navbar() {
  const pathName = usePathname()
  return (
    <div>
      <NavContainer>
        {optionList.map((item) => (
          <NavElements option={item} isActive={`/${item.link}` === pathName} />
        ))}
      </NavContainer>
    </div>
  )
}

const NavContainer = styled.li`
  position: relative; /* 절대적인 위치를 고정 */
  top: 14px; /* 화면 상단에 고정 */
  left: 10px; /* 좌측 정렬 */

  display: flex;
  justify-content: space-around;

  width: 262px;
  height: 38px;
  padding: 2px 4px;
  align-items: center;
  flex-shrink: 0;

  border-radius: 100px;
  background: var(--grey4, #cdd2d8);
`
