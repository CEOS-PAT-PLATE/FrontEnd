import Navbar from '@components/input-data2/common/navbar';
import StoreButton from '@components/input-data2/common/store-button';
import ExitButton from '@public/svg/exit-button.svg?url';
import GridContainer from '@style/input-data2/GridContainer';
import NavbarContainer from '@style/input-data2/NavbarContainer';
import ExitButtonImage from '@style/input-data2//ExitButtonImage';
import Content from '@style/input-data2//Content';
import Wrapper from '@style/input-data2/Wrapper';
import Notice from '@components/input-data2/common/notice';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Wrapper>
        <GridContainer>
          <NavbarContainer>
            <Navbar />
         
          </NavbarContainer>
          <ExitButtonImage src={ExitButton} alt="exit-button" />
          <Content>{children}</Content>
        </GridContainer>
        <Notice />
      </Wrapper>
   
      {/** <StoreButton/> */}
    </>
  );
}
