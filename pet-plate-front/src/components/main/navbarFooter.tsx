'use Client'

import styled from "styled-components"

export default function navbarFooter() {
  return (
    <NavbarContainer>
      navbarFooter
    </NavbarContainer>
  )
}

const NavbarContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3.5rem;
  position: absolute;
  bottom: 0;
  z-index: 1000;
  background-color: aliceblue;
`
