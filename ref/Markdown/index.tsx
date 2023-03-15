import MarkdownPreviewer from "./MarkdownPreviewer";

export default () => {
  return (
    <section className="container mx-auto max-w-xl p-4 m-4 bg-gray-200 rounded">
      <h2 className="text-2xl text-center">Markdown Preview</h2>
      <MarkdownPreviewer />
    </section>
  );
};
