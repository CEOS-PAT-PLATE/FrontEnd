'use client';

import StyledComponentsRegistry from '@lib/registry';
import { ThemeProvider } from 'styled-components';
import theme from '@style/theme';
import GlobalStyle from '@style/GlobalStyles';

interface IClientComponentContainerProps {
  children: React.ReactNode;
}

function ClientComponentContainer({ children }: IClientComponentContainerProps) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
}

export default ClientComponentContainer;
