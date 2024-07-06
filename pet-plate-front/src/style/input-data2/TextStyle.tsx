import {styled,css} from 'styled-components';

interface TextProps {
    $lineHeight: string;
    $fontWeight: string;
  }
  


export const Title = styled.h3<TextProps>`
  color: var(--grey11, #36393c);
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  ${(props) => css`
    font-weight: ${props.$fontWeight};
    line-height: ${props.$lineHeight};
  `}
  margin: 0;
`;

export const Description = styled.p<TextProps>`
  color: var(--grey8, #7c8389);
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  ${(props) => css`
    font-weight: ${props.$fontWeight};
    line-height: ${props.$lineHeight};
  `}
  margin: 0;
`;
