import { Slice } from "gatsby";

export default function Index() {
  return (
    <Slice sliceName="Layout">
      <h1>Gatsby Slices &lt;3 Prismic Slices demo</h1>
      <p>This is hardcoded page</p>
    </Slice>
  );
}

export function Head() {
  return (
    <>
      <title>Prismic + Gatsby Slices demo</title>
    </>
  );
}
