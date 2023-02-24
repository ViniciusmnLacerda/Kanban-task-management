/* eslint-disable no-magic-numbers */
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import StatusCode from '../enums/StatusCode';
import { getCards } from '../redux/sliceCards';
import { getColumns, setColumns } from '../redux/sliceColumns';
import { getControls, setCreatingColumn } from '../redux/sliceControls';
import { getUser } from '../redux/sliceUser';
import HandleColumns from '../service/HandleColumns';
import '../styles/Column.css';
import Cards from './Cards';

export default function Columns() {
  const controls = useSelector(getControls);
  const columns = useSelector(getColumns);
  const cards = useSelector(getCards);
  const { token } = useSelector(getUser);
  const dispatch = useDispatch();
  const handleColumns = new HandleColumns();
  const [columnTitle, setColumnTitle] = useState('');

  const fetchColumns = async () => {
    const response = await handleColumns.getter(+controls.workspaceId, token);
    if (response?.status === StatusCode.OK) {
      dispatch(setColumns(response.data));
    }
  };

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await handleColumns
      .create({ title: columnTitle, workspaceId: +controls.workspaceId }, token);

    if (response?.status === StatusCode.UPDATE) {
      fetchColumns();
    }
    setColumnTitle('');
    dispatch(setCreatingColumn(false));
  };

  const setHeight = (columnId: number): number => {
    const lenght = cards.filter((card) => card.columnId === columnId).length;
    if (lenght === 0) return 205;
    return (lenght * 205) + 100;
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  return (
    <main className="columns">
      {columns.map(({ column: { columnId, title } }) => (
        <section
          className="column"
          key={ columnId }
          style={ { height: setHeight(columnId) } }
        >
          <header>
            <h3>
              {`${title} (${cards.filter((card) => card.columnId === columnId).length})`}
            </h3>
          </header>
          <Cards columnId={ columnId } />
        </section>
      ))}
      {controls.isCreatingColumn ? (
        <form
          onSubmit={ (e) => handleClick(e) }
          className="column column-form"
        >
          <label>
            <div className="form-btns">
              <button
                type="button"
                className="form-col-btn"
                onClick={ () => {
                  setColumnTitle('');
                  dispatch(setCreatingColumn(false));
                } }
              >
                <RxCross1 fontSize={ 15 } color="red" />
              </button>
              <button
                type="submit"
                className="form-col-btn"
                disabled={ columnTitle.length <= 1 }
              >
                <MdDone fontSize={ 15 } color="green" />
              </button>
            </div>
            <input
              placeholder="Column title"
              value={ columnTitle }
              onChange={ (e) => setColumnTitle(e.target.value) }
            />
          </label>
        </form>
      ) : (
        <button
          className="column new-column"
          type="button"
          onClick={ () => dispatch(setCreatingColumn(true)) }
        >
          <span>
            <AiOutlinePlus />
            New column
          </span>
        </button>
      )}
    </main>
  );
}
