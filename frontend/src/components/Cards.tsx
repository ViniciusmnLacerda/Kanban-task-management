/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import StatusCode from '../enums/StatusCode';
import { ICard, IProps } from '../interfaces';
import { getCards, setCards } from '../redux/sliceCards';
import { getColumns } from '../redux/sliceColumns';
import { getControls, setCreatingTask } from '../redux/sliceControls';
import { getUser } from '../redux/sliceUser';
import HandleCards from '../service/HandleCards';
import '../styles/Card.css';

export default function Cards({ columnId }: IProps) {
  const cards = useSelector(getCards);
  const columns = useSelector(getColumns);
  const controls = useSelector(getControls);
  const { token } = useSelector(getUser);
  const handleCards = new HandleCards();
  const [body, setBody] = useState({ title: '', content: '' });
  const cardsToRender = cards.filter((card) => card.columnId === columnId);

  const dispatch = useDispatch();

  const fetchCards = async () => {
    const allCards: ICard[] = [];
    const cardsPromise = columns.map(async (column) => {
      const response = await handleCards.getter(column.column.columnId, token);
      if (response?.status === StatusCode.OK) {
        response.data.forEach((e: ICard) => allCards.push(e));
      }
    });
    await Promise.all(cardsPromise);
    dispatch(setCards(allCards));
  };

  const createCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await handleCards
      .create({ ...body, columnId }, token);

    if (response?.status === StatusCode.UPDATE) {
      fetchCards();
      dispatch(setCreatingTask({
        isCreating: false,
        isEditing: false,
        columnId: '',
      }));
      setBody({ title: '', content: '' });
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <ol>
      {cardsToRender.map(({ card: { cardId, title, content } }) => (
        <li className="task" key={ cardId }>
          <h3>{title}</h3>
          <p>{content}</p>
        </li>
      ))}
      {(controls.card.isCreating && +controls.card.columnId === columnId) ? (
        <form
          onSubmit={ (e) => createCard(e) }
          className="form-new-card"
        >
          <label htmlFor="title">
            <div className="new-card-btns">
              <button
                type="button"
                className="form-card-btn"
                onClick={ () => dispatch(setCreatingTask({
                  isEditing: false,
                  isCreating: false,
                  columnId: '' })) }
              >
                <RxCross1 fontSize={ 15 } color="red" />
              </button>
              <button
                type="submit"
                className="form-card-btn"
                disabled={ body.title.length < 2 || body.content.length < 2 }
              >
                <MdDone fontSize={ 15 } color="green" />
              </button>
            </div>
            <input
              onChange={ (e) => setBody({
                ...body, [e.target.name]: e.target.value }) }
              name="title"
              value={ body.title }
              type="text"
              placeholder="Title"
              id="title"
            />
          </label>
          <textarea
            name="content"
            onChange={ (e) => setBody({
              ...body, [e.target.name]: e.target.value }) }
            value={ body.content }
            placeholder="Description"
          />
        </form>
      ) : (
        <li
          className="task new-task"
        >
          <button
            type="button"
            onClick={ () => {
              dispatch(setCreatingTask({
                isEditing: false,
                isCreating: true,
                columnId: `${columnId}` }));
              setBody({ title: '', content: '' });
            } }
          >
            <span>
              <AiOutlinePlus />
              ADD NEW
            </span>
          </button>
        </li>
      )}
    </ol>
  );
}
