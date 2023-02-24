import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatusCode from '../enums/StatusCode';
import { getColumns, setColumns } from '../redux/sliceColumns';
import { getControls } from '../redux/sliceControls';
import { getUser } from '../redux/sliceUser';
import HandleColumns from '../service/HandleColumns';
import Cards from './Cards';

export default function Columns() {
  const controls = useSelector(getControls);
  const columns = useSelector(getColumns);
  const { token } = useSelector(getUser);
  const dispatch = useDispatch();
  const handleColumns = new HandleColumns();

  useEffect(() => {
    const fetchColumns = async () => {
      const response = await handleColumns.getter(+controls.workspaceId, token);
      if (response?.status === StatusCode.OK) {
        dispatch(setColumns(response.data));
      }
    };

    fetchColumns();
  }, []);

  return (
    <main className="columns">
      {columns.map(({ column: { columnId, title } }) => (
        <section key={ columnId }>
          <header><h3>{title}</h3></header>
          <Cards columnId={ columnId } />
        </section>
      ))}
    </main>
  );
}
