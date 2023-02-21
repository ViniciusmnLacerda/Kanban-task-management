import { AiOutlinePaperClip } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { GrLogout } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getUser, setUser } from '../redux/sliceUser';
import '../styles/Navbar.css';

export default function Navbar() {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setUser({
      id: 0,
      accountId: 0,
      name: '',
      lastName: '',
      image: '',
      token: '',
    }));
    navigate('/');
    localStorage.removeItem('userData');
  };

  return (
    <header className="navbar">
      <div className="nav-logo">
        <AiOutlinePaperClip fontSize={ 22 } />
        <h1>Kanban Management</h1>
      </div>
      <div className="nav-user">
        <FaUserCircle fontSize={ 20 } />
        <p>{`${user.name} ${user.lastName}`}</p>
        <button onClick={ logout } type="button">
          <GrLogout fontSize={ 18 } />
        </button>
      </div>
    </header>
  );
}
