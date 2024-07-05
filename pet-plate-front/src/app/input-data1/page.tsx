'use client'

import styled from "styled-components"
import InputField from "@components/input-data1/inputField"
import Radio from "@components/input-data1/radio"


export default function Page() {
    return (
      <Container>
        <InputField 
          width = "19.5rem"
          placeholder = "메인 페이지"
        />
        <Radio/>
      </Container>
    )
  }
  
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`