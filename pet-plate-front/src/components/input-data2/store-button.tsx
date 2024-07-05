import { usePathname } from 'next/navigation';

export default function StoreButton() {
  const pathname = usePathname();

  function handleClick() {
    switch (pathname) {
      case '/input-data2/dry-food':
        alert('하루 식사에 사료가 저장되었습니다.');
        break;
      case '/input-data2/favorites':
        alert('즐겨찾기에 저장되었습니다.');
        break;
      case '/input-data2/natural-food':
        alert('즐겨찾기에 저장되었습니다.');
        break;
      case '/input-data2/packaged-snacks':
        alert('즐겨찾기에 저장되었습니다.');
        break;
      default:
        alert('잘못된 페이지');
    }
  }

  return (
    <div>
      <button onClick={handleClick}>저장</button>
    </div>
  );
}
