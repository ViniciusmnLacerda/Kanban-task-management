import { useSelector } from 'react-redux';
import { getColumns } from '../redux/sliceColumns';

export default function Columns() {
  const columns = useSelector(getColumns);
  return (
    <main className="columns">
      {columns.map(({ column: { columnId, title } }) => (
        <section key={ columnId }>
          <header><h3>{title}</h3></header>
        </section>
      ))}
    </main>
  );
}
