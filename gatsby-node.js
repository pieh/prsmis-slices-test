exports.createPages = async ({ actions, graphql }) => {
  // --- these won't be needed once FS slice creation is implemented
  // for now we'll manually create those slices the same way FS would

  // prismic slices
  const prismicSlices = [`Slug`, `TextBlock`];
  for (const prismicSlice of prismicSlices) {
    actions.createSlice({
      name: prismicSlice,
      component: require.resolve(`./src/slices/${prismicSlice}`),
    });
  }
  // end of prismic slices

  // regular slices
  actions.createSlice({
    name: `Layout`,
    component: require.resolve(`./src/slices/layout`),
  });
  // end of regular slices

  // end of all slices

  const { data } = await graphql(`
    {
      allPrismicPage {
        nodes {
          id
          gatsbyPath(filePath: "/{PrismicPage.data.title}")
          data {
            slices {
              ... on PrismicSlugDefault {
                slice_type
              }
              ... on PrismicTextBlockDefault {
                slice_type
              }
            }
          }
        }
      }
    }
  `);

  // this can be generalized by being able to read `model.json` of slices and generate translation map this way
  const slugIdToName = new Map([
    [`slug`, `Slug`],
    [`text_block`, `TextBlock`],
  ]);

  for (const page of data.allPrismicPage.nodes) {
    const slicesUsedOnThisPage = new Set(
      page.data.slices.map((slice) => slugIdToName.get(slice.slice_type))
    );

    const sliceOverrides = prismicSlices.reduce((slices, prismicSlice) => {
      if (!slicesUsedOnThisPage.has(prismicSlice)) {
        // slice isn't use - force remove from current page
        slices[prismicSlice] = null;
      }

      return slices;
    }, {});

    actions.createPage({
      path: page.gatsbyPath,
      component: require.resolve(`./src/templates/page.js`),
      context: {
        id: page.id,
      },
      // secret sauce - remove / force slices to `null` if they are not used
      slices: sliceOverrides,
    });
  }
};
