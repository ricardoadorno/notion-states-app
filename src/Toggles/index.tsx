import ToggleList from "./ToggleList";

export default () => {
  // TODO fix nested title states
  // TODO make a little margin on each toggle

  return (
    <section className="container mx-auto max-w-xl p-4 m-4 bg-gray-200 rounded">
      <h2 className="text-2xl text-center">Toggles</h2>
      <ToggleList />
    </section>
  );
};
