import styled from "styled-components"

import Image from "next/image"
import arrowIcon from '@public/svg/arrow-right.svg?url'
import {useRecoilValue} from 'recoil'
import {petInfoState} from "@lib/atoms"

interface ResultListProps {
  title: string; 
  value: string | number; 
}

export default function ResultList({ title, value }: ResultListProps) {
const  petInfo = useRecoilValue(petInfoState);
console.log(petInfo);

  return (
    <ResultListWrapper>
        <Title>{title}</Title>
        <Wrapper>
            <Value>{value}</Value>
            <ArrowIcon src={arrowIcon} alt="modify"/>
        </Wrapper>
    </ResultListWrapper>
  )
}

const ResultListWrapper = styled.div`
    width: 19.5rem;
    height: 3rem;
    border: solid 0.063rem ${(props) => props.theme.colors['grey5']};
    border-radius: 0.5rem;
    padding: 0 1rem;
    margin-bottom: 1rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
    `

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`

const Title = styled.div`
    font-size: 1rem;
    font-weight: 400;
    color: ${(props) => props.theme.colors['grey11']};
`
const Value = styled.div`
    font-size: 1rem;
    font-weight: 400;
    color: ${(props) => props.theme.colors['grey5']};
`

const ArrowIcon = styled(Image)`
    
`