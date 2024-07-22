
import Notice from '@components/input-data2/common/notice';



export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
         {children}
        <Notice />
    

    </>
  );
}
