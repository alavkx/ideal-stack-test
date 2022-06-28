import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const stars = trpc.useQuery(["stars"]);
  if (!stars.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Stars</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Constellation</th>
          </tr>
        </thead>
        <tbody></tbody>
        {stars.data.map((s) => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.name}</td>
            <td>{s.constellation}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
