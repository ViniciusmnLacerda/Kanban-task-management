/* eslint-disable comma-dangle */
import { useEffect } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import StatusCode from '../enums/StatusCode';
import { ICard, IProps } from '../interfaces';
import { getCards, setCards } from '../redux/sliceCards';
import { getColumns } from '../redux/sliceColumns';
import {
  getControls,
  setChangedPositionCards,
  setCreatingTask,
  setGetCards,
  setPopup
} from '../redux/sliceControls';
import { getUser } from '../redux/sliceUser';
import HandleCards from '../service/HandleCards';
import '../styles/Card.css';
import FormCard from './FormCard';

export default function Cards({ columnId }: Omit<IProps, 'cardId'>) {
  const cards = useSelector(getCards);
  const columns = useSelector(getColumns);
  const controls = useSelector(getControls);
  const { token } = useSelector(getUser);
  const handleCards = new HandleCards();
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

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    if (controls.changedPositionCards) {
      dispatch(setChangedPositionCards(false));
      fetchCards();
    }
    if (controls.getCards) {
      dispatch(setGetCards(false));
      fetchCards();
    }
  }, [controls]);

  const openMenu = (e: React.MouseEvent, cardId: number) => {
    const xPos = `${e.pageX}px`;
    const yPos = `${e.pageY}px`;
    dispatch(setPopup({
      open: true,
      cardId: `${cardId}`,
      columnId: `${columnId}`,
      xPos,
      yPos,
    }));
  };

  return (
    <Droppable droppableId={ `${columnId}-cards` }>
      {(provided) => (
        <ol
          { ...provided.droppableProps }
          ref={ provided.innerRef }
          className={ `${columnId}-cards` }
        >
          {cardsToRender.map(({ card: { cardId, title, content } }, index) => (
            <Draggable
              index={ index }
              draggableId={ `${cardId}` }
              key={ cardId }
            >
              {(prov) => (
                (controls.card.isEditing && +controls.card.cardId === cardId ? (
                  <li className="task">
                    <FormCard columnId={ columnId } cardId={ cardId } />
                  </li>
                ) : (
                  <li
                    ref={ prov.innerRef }
                    { ...prov.draggableProps }
                    { ...prov.dragHandleProps }
                    className="task"
                  >
                    <header>
                      <h3>{title}</h3>
                      <button
                        type="button"
                        onClick={ (e) => openMenu(e, cardId) }
                      >
                        <BiDotsVerticalRounded />
                      </button>
                    </header>
                    <p>{content}</p>
                  </li>
                ))
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          {(controls.card.isCreating && +controls.card.columnId === columnId) ? (
            <li className="task">
              <FormCard columnId={ columnId } cardId={ 0 } />
            </li>
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
                    columnId: `${columnId}`,
                    cardId: '',
                  }));
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
      )}
    </Droppable>
  );
}
