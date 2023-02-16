import { createStore, parseDefinition } from "@dskit/core";
import { useMemo, useState, useSyncExternalStore } from "react";

const tokenStore = createStore();

function useStore() {
  return useSyncExternalStore(tokenStore.subscribe, tokenStore.getSnapshot);
}

function App() {
  const store = useStore();
  const [definition, setDefinition] = useState("");
  const [filter, setFilter] = useState({
    subject: "",
    predicate: "",
    object: "",
  });
  const quads = useMemo(
    () =>
      store.getQuads(
        filter.subject || null,
        filter.predicate || null,
        filter.object || null,
        null,
      ),
    [store, filter],
  );

  const handleAdd = () => {
    const command = parseDefinition(definition);
    tokenStore.addDefinition(command);
  };

  return (
    <div className="flex flex-col">
      <div className="flex p-3">
        <input
          type="text"
          placeholder="Write down definition"
          className="input input-bordered w-full"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
        />
        <button onClick={handleAdd} className="btn">
          Add
        </button>
      </div>
      <div className="flex p-3">
        <input
          type="text"
          placeholder="Subject"
          className="input input-bordered w-full"
          value={filter.subject}
          onChange={(e) => setFilter({ ...filter, subject: e.target.value })}
        />
        <input
          type="text"
          placeholder="Predicate"
          className="input input-bordered w-full"
          value={filter.predicate}
          onChange={(e) => setFilter({ ...filter, predicate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Object"
          className="input input-bordered w-full"
          value={filter.object}
          onChange={(e) => setFilter({ ...filter, object: e.target.value })}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th />
              <th>Subject</th>
              <th>Predicate</th>
              <th>Object</th>
              <th>Graph</th>
            </tr>
          </thead>
          <tbody>
            {quads.map((quad, index) => (
              // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <tr key={index}>
                <th>{index}</th>
                <td>{quad.subject.value}</td>
                <td>{quad.predicate.value}</td>
                <td>{quad.object.value}</td>
                <td>{quad.graph.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
