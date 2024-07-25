import Image from 'next/image';
import styled from 'styled-components';
import checkIcon from '@public/svg/checkIcon.svg?url';

interface RadioListProps {
    name: string;
    value: string;
    text: string;
    onChange: () => void;
    width: string; 
}

export default function RadioCheck({name, value, text, onChange, width} : RadioListProps) {
  return (
    <RadioWrapper width={width}>
        <input type="radio" name={name} value={value} onChange={onChange} id={value}/> 
        <label htmlFor={value}>
            <span>{text}</span>
            <div className="check-icon">
                <Image src={checkIcon} alt="check icon" layout="fill" objectFit="contain" />
            </div>
        </label>
    </RadioWrapper>
  )
}

const RadioWrapper = styled.div<{ width: string }>` 
    position: relative;
    margin-bottom: 0.25rem;

    input {
        display: none;
    }

    label {
        position: relative;
        border: solid 0.063rem ${(props) => props.theme.colors['grey5']}; 
        border-radius: 0.5rem;
        width: ${(props) => props.width}; 
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        text-align: center;
        padding: 0;

        font-size: 1rem;
        font-weight: 400;
        line-height: 160%;
        color: ${(props) => props.theme.colors['grey8']};

        &:hover {
            background-color: ${(props) => props.theme.colors['green-100']};
            border: solid 0.063rem ${(props) => props.theme.colors['green-400']}; 
            color: ${(props) => props.theme.colors['green-600']};
        }

        .check-icon {
            display: none;
            position: absolute;
            left: 0.5rem;
            width: 1rem;
            height: 1rem;
            z-index: 1;
        }
    }

    input:checked + label {
        background-color: ${(props) => props.theme.colors['green-100']};
        border: solid 0.063rem ${(props) => props.theme.colors['green-400']}; 
        color: ${(props) => props.theme.colors['green-600']};
        padding-left: 10px;
        padding-right: 5px;
        .check-icon {
            display: block;
        }
    }
`;
