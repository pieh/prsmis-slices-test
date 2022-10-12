import { Slice, graphql } from "gatsby";

/* maybe slicemachine could generate SliceZone component that would look like this in the future so users would just have to import and use it */
function SliceZone({ slices }) {
  return (
    <>
      {slices.map((slice) => {
        switch (slice.slice_type) {
          case "slug":
            return (
              <Slice key={slice.id} sliceName="Slug" slice={slice} allowEmpty />
            );
          case "text_block":
            return (
              <Slice
                key={slice.id}
                sliceName="TextBlock"
                slice={slice}
                allowEmpty
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}

export default function PageBuilder({ data, pageContext }) {
  return (
    <Slice sliceName="Layout">
      <h1>{data.prismicPage.data.title}</h1>
      <p>
        This is page sourced from Prismic and is using Prismic Slices to
        construct content
      </p>
      <SliceZone slices={data.prismicPage.data.slices} />
    </Slice>
  );
}

export function Head({ data }) {
  return (
    <>
      <title>{data.prismicPage.data.title}</title>
    </>
  );
}

export const q = graphql`
  query ($id: String) {
    prismicPage(id: { eq: $id }) {
      data {
        title
        slices {
          ... on PrismicSlugDefault {
            id
            slice_type
            primary {
              slug
            }
          }
          ... on PrismicTextBlockDefault {
            id
            slice_type
            primary {
              body {
                html
              }
            }
          }
        }
      }
    }
  }
`;
