import slug from "slug";

const Slug = ({ slice }) => (
  <section>
    <code style={{ color: "green" }}>Slug</code>
    <pre style={{ border: "1px solid green" }}>{slug(slice.primary.slug)}</pre>
  </section>
);

export default Slug;
