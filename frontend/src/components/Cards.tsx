import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatusCode from '../enums/StatusCode';
import { ICard, IProps } from '../interfaces';
import { getCards, setCards } from '../redux/sliceCards';
import { getColumns } from '../redux/sliceColumns';
import { getUser } from '../redux/sliceUser';
import HandleCards from '../service/HandleCards';

export default function Cards({ columnId }: IProps) {
  const cards = useSelector(getCards);
  const columns = useSelector(getColumns);
  const { token } = useSelector(getUser);
  const handleCards = new HandleCards();
  const dispatch = useDispatch();

  useEffect(() => {
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

    fetchCards();
  }, []);

  return (
    <ol>
      {cards.filter((card) => card.columnId === columnId)
        .map(({ card: { cardId, title, content } }) => (
          <li key={ cardId }>
            <h3>{title}</h3>
            <p>{content}</p>
          </li>
        ))}
    </ol>
  );
}
