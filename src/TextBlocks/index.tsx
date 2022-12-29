// TODO quote block
// TODO code block

import CalloutBlock from "./CalloutBlock";
import QuoteBlock from "./QuoteBlock";
import CodeBlock from "./QuoteCode";

export default () => {
  return (
    <section className="container mx-auto max-w-xl p-4 m-4 bg-gray-200 rounded">
      <h2 className="text-2xl text-center">Text Blocks</h2>
      <h3 className="text-lg  font-bold my-3">Quotes</h3>
      <QuoteBlock />
      <h3 className="text-lg  font-bold my-3">Code</h3>
      <CodeBlock />
      <h3 className="text-lg  font-bold my-3">Callout</h3>
      <CalloutBlock />
    </section>
  );
};
