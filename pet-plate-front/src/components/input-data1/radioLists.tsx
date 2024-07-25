import styled from "styled-components"

interface radioListProps {
    name: string;
    value: string;
    text: string;
    onChange: () => void;
}

export default function radioLists({name, value, text, onChange} : radioListProps) {
  return (
    <RadioWrapper>
        <input type="radio" name={name} value={value} onChange={onChange} id={value}/> 
        <label htmlFor={value}>{text}</label>
    </RadioWrapper>
  )
}

const RadioWrapper = styled.div`
    position: relative;
    margin-bottom: 0.25rem;

    input {
        display: none;
    }

    label {
        position: relative;
        border: solid 0.063rem ${(props) => props.theme.colors['grey5']}; 
        border-radius: 0.5rem;
        padding: 11px 16px 11px 40px;
        width: 312px;
        height: 48px;
        display: flex;
        align-items: center;
        cursor: pointer;

        font-size: 1rem;
        font-weight: 400;
        line-height: 160%;
        color: ${(props) => props.theme.colors['grey8']};

        &:hover {
            background-color: ${(props) => props.theme.colors['green-100']};
            border: solid 0.063rem ${(props) => props.theme.colors['green-400']}; 
            color: ${(props) => props.theme.colors['grey11']};
        }
    }

    label:before {
        content: '';
        position: absolute;
        left: 12px;
        width: 10px;
        height: 10px;
        border: 5px solid ${(props) => props.theme.colors['grey5']};
        border-radius: 50%;
        background-color: ${(props) => props.theme.colors['white']}; 
    }

    input:checked + label {
        background-color: ${(props) => props.theme.colors['green-100']};
        border: solid 0.063rem ${(props) => props.theme.colors['green-400']}; 
        color: ${(props) => props.theme.colors['grey11']};
    }

    input:checked + label:before {
        width: 10px;
        height: 10px;
        border: 5px solid ${(props) => props.theme.colors['green-400']};
    }
`;
