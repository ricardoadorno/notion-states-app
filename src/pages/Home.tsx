import Editable from "../components/Editable/Editable";
import Kanban from "../components/Kanban";
import MarkdownBlock from "../components/MarkdownBlock";
import NestedToggles from "../components/NestedToggles";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import TextBlock from "../components/TextBlock";
import ToDo from "../components/ToDo";

export default function Home() {
  return (
    <>
      <Editable />
      <div className="divider" />
      <MarkdownBlock />
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
    </>
  );
}
