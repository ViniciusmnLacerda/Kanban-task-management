/* eslint-disable comma-dangle */
import { BsPencil, BsTrash } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import StatusCode from '../enums/StatusCode';
import {
  getControls, setCreatingTask, setGetCards, setPopup
} from '../redux/sliceControls';
import { getUser } from '../redux/sliceUser';
import HandleCards from '../service/HandleCards';
import '../styles/Popup.css';

export default function Popup() {
  const dispatch = useDispatch();
  const { token } = useSelector(getUser);
  const { popup: { xPos, yPos, cardId, columnId } } = useSelector(getControls);
  const handleCards = new HandleCards();

  const onClose = () => {
    dispatch(setPopup({ open: false, cardId: '', columnId: '', xPos: '', yPos: '' }));
  };

  const deleteCard = async () => {
    const response = await handleCards.remove({ id: +cardId, key: +columnId }, token);
    if (response?.status === StatusCode.DELETE) {
      dispatch(setPopup({ open: false, cardId: '', columnId: '', xPos: '', yPos: '' }));
      dispatch(setGetCards(true));
    }
  };

  const editCard = () => {
    dispatch(setPopup({ open: false, cardId: '', columnId: '', xPos: '', yPos: '' }));
    dispatch(setCreatingTask({
      isEditing: true,
      isCreating: false,
      columnId: '',
      cardId,
    }));
  };

  return (
    <div
      style={ { top: yPos, left: xPos } }
      className="menu-popup"
    >
      <ul className="ul-menu">
        <li className="item-menu">
          <button
            onClick={ editCard }
            className="button-menu"
            type="button"
          >
            <BsPencil />
            Edit
          </button>
        </li>
        <li className="item-menu">
          <button
            className="button-menu"
            type="button"
            onClick={ deleteCard }
          >
            <BsTrash />
            Delete
          </button>
        </li>
      </ul>
      <ul className="ul-close">
        <li className="item-menu">
          <button
            className="button-menu"
            type="button"
            onClick={ onClose }
          >
            <RxCross1 />
            Close
          </button>
        </li>
      </ul>
    </div>
  );
}
