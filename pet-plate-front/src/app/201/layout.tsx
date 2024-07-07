
import Navbar from '@components/input-data2/navbar';
import StoreButton from '@components/input-data2/store-button';
import AddButton from '@components/input-data2/addplate-button';
import GridContainer from '@style/input-data2/GridContainer';
import NavbarContainer from '@style/input-data2/NavbarContainer';
import ExitButtonImage from '@style/input-data2//ExitButtonImage';
import Content from '@style/input-data2//Content';
import BackgroundWrapper from '@style/input-data2/201Backgrund'; 



export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BackgroundWrapper>
    {children}
    <AddButton/>
</BackgroundWrapper>
  );
}

