import Kanban from "../components/Kanban";
import MarkdownBlock from "../components/MarkdownBlock";
import MarkdownNew from "../components/MarkdownNew";
import NestedToggles from "../components/NestedToggles";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import TextBlock from "../components/TextBlock";
import ToDo from "../components/ToDo";

export default function Home() {
  return (
    <>
      <MarkdownNew />
          <div className="divider" />
      <ToDo />
      <div className="divider" />
      <Kanban />
      <div className="divider" />
      <Table />
      <div className="divider" />
      <TextBlock />
      <div className="divider" />
      <NestedToggles />
      <div className="divider" />
      <Pagination />
      <div className="divider" />
      <MarkdownBlock />
    </>
  );
}
