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

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <ol>
      {cards.filter((card) => card.columnId === columnId)
        .map(({ card: { cardId, title, content } }, index) => {
          if (index < cards.filter((card) => card.columnId === columnId).length - 1) {
            return (
              <li className="task" key={ cardId }>
                <h3>{title}</h3>
                <p>{content}</p>
              </li>
            );
          }

          if (index === cards.filter((card) => card.columnId === columnId).length - 1) {
            return (
              <>
                <li className="task" key={ `${cardId}_${columnId}_${title}}` }>
                  <h3>{title}</h3>
                  <p>{content}</p>
                </li>
                {(controls.card.isCreating && +controls.card.columnId === columnId) ? (
                  <form>
                    <input
                      onChange={ (e) => setBody({
                        ...body, [e.target.name]: e.target.value }) }
                      name="title"
                      value={ body.title }
                      type="text"
                      placeholder="Title"
                    />
                    <textarea
                      name="content"
                      onChange={ (e) => setBody({
                        ...body, [e.target.name]: e.target.value }) }
                      value={ body.content }
                      placeholder="Content"
                    />
                    <div className="new-card-btns">
                      <button
                        type="button"
                        className="form-card-btn"
                        onClick={ () => dispatch(setCreatingTask({
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
                  </form>
                ) : (
                  <li
                    className="task new-task"
                    key={ `${cardId}_${columnId}}` }
                  >
                    <button
                      type="button"
                      onClick={ () => {
                        dispatch(setCreatingTask({
                          isCreating: true,
                          columnId: `${columnId}` }));
                        setBody({ title: '', content: '' });
                      } }
                    >
                      <span>
                        <AiOutlinePlus />
                        New task
                      </span>
                    </button>
                  </li>
                )}
              </>
            );
          }
        })}
    </ol>
  );
}
