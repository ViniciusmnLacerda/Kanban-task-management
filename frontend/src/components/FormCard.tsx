import React, { useEffect, useState } from 'react';
import { MdDone } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import StatusCode from '../enums/StatusCode';
import { IProps } from '../interfaces';
import { getCards } from '../redux/sliceCards';
import { getControls, setCreatingTask, setGetCards } from '../redux/sliceControls';
import { getUser } from '../redux/sliceUser';
import HandleCards from '../service/HandleCards';

export default function FormCard({ columnId, cardId }: IProps) {
  const dispatch = useDispatch();
  const [body, setBody] = useState({ title: '', content: '' });
  const { token } = useSelector(getUser);
  const { isCreatingTask } = useSelector(getControls);
  const handleCards = new HandleCards();
  const { card } = useSelector(getControls);
  const cards = useSelector(getCards);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const createCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await handleCards
      .create({ ...body, columnId }, token);

    if (response?.status === StatusCode.UPDATE) {
      dispatch(setGetCards(true));
      dispatch(setCreatingTask({
        isCreating: false,
        isEditing: false,
        columnId: '',
        cardId: '',
      }));
      setBody({ title: '', content: '' });
    }
  };

  useEffect(() => {
    if (!isCreatingTask) {
      const cardToEdit = cards.find((e) => e.card.cardId === cardId);
      setBody({
        title: cardToEdit?.card.title as unknown as string,
        content: cardToEdit?.card.content as unknown as string,
      });
    } else setBody({ title: '', content: '' });
  }, []);

  const editCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await handleCards.update({ ...body, id: +card.cardId }, token);

    if (response?.status === StatusCode.UPDATE) {
      dispatch(setGetCards(true));
      dispatch(setCreatingTask({
        isCreating: false,
        isEditing: false,
        columnId: '',
        cardId: '',
      }));
      setBody({ title: '', content: '' });
    }
  };

  useEffect(() => {
    if (body.content && body.title) {
      const isDisabled = body.title.length > 2 && body.content.length > 2;
      setIsBtnDisabled(!isDisabled);
    }
  }, [body]);

  return (
    <form
      onSubmit={ card.isCreating ? (e) => createCard(e) : (e) => editCard(e) }
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
              columnId: '',
              cardId: '',
            })) }
          >
            <RxCross1 fontSize={ 15 } color="red" />
          </button>
          <button
            type="submit"
            className="form-card-btn"
            disabled={ isBtnDisabled }
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
  );
}
