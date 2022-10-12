import { graphql, Link } from "gatsby";

export default function Layout({ data, children }) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">/</Link>
            </li>
            {data.allPrismicPage.nodes.map((page) => (
              <li key={page.gatsbyPath}>
                <Link to={page.gatsbyPath}>{page.gatsbyPath}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
}

export const q = graphql`
  {
    allPrismicPage {
      nodes {
        gatsbyPath(filePath: "/{PrismicPage.data.title}")
      }
    }
  }
`;
