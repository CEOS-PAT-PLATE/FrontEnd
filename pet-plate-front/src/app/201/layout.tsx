import AddButton from '@components/input-data2/common/addplate-button';
import id_201 from '@public/svg/id_201.svg?url';
import Image from 'next/image';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Image src={id_201} alt="id-201" />
      <AddButton />
    </>
  );
}
