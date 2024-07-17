export default async function Page() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('j');
    }, 1000);
  });

  return (
    <div>
      <h1>Input Data 2</h1>
    </div>
  );
}
