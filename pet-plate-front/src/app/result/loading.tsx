import LoadingSVGImage from '@public/svg/analyze-loading-img.svg?url';
import Image from 'next/image';
import Wrapper from '@style/input-data2/Wrapper';

export default function Page() {
  return (
    <Wrapper>
      <Image src={LoadingSVGImage} alt="loading" />
      <h1>Loading</h1>
    </Wrapper>
  );
}
