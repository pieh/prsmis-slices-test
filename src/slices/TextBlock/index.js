const TextBlock = ({ slice }) => (
  <section>
    <code style={{ color: "blue" }}>TextBlock</code>
    <div
      style={{ border: "1px solid blue" }}
      dangerouslySetInnerHTML={{ __html: slice.primary.body.html }}
    />
  </section>
);

export default TextBlock;
