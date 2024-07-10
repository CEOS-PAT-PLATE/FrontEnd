import styled from "styled-components"

interface radioListProps {
    name : string
    value : string
    text : string
}


export default function radioLists({name, value, text} : radioListProps) {
  return (
    <RadioWrapper>
        <input type="radio" name={name} value={value}/> 
        <span>{text}</span>
    </RadioWrapper>
  )
}

const RadioWrapper = styled.div`
    width: 19.5rem;
    height: 3rem;
    border: solid 0.063rem ${(props) => props.theme.colors['grey5']};
    border-radius: 0.5rem;
    background-color: ${(props) => props.theme.colors['grey2']};

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0.75rem;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    &:hover{
        border: solid 0.063rem ${(props) => props.theme.colors['green-400']};
        background-color: ${(props) => props.theme.colors['green-100']};
    }


    input{
        appearance: none;
        width: 20px;
        height: 20px;
        margin: 0;
        border: 0.313rem solid ${(props) => props.theme.colors['grey5']};
        border-radius: 50%;

        &:checked{
            border: 0.313rem solid ${(props) => props.theme.colors['green-400']};
        }
    }

    span{
        width: 16.25rem;
        height: 1.625rem;
        display: flex;
        align-items: center;
        color: ${(props) => props.theme.colors['grey8']};

        font-size: 1rem;
        font-weight: 400;
        line-height: 160%;
    }
`