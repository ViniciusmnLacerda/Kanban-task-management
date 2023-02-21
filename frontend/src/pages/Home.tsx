import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import StatusCode from '../enums/StatusCode';
import { setUser } from '../redux/sliceUser';
import HandleAPI from '../service/HandleAPI';
import '../styles/Home.css';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleAPI = new HandleAPI();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAccount = async (id: number, token: string) => {
      const result = await handleAPI.getAccount(id, token);
      if (result?.status === StatusCode.OK) {
        dispatch(setUser({
          id: result.data.id,
          accountId: result.data.userId,
          name: result.data.name,
          lastName: result.data.lastName,
          image: result.data.image,
          token,
        }));
      } else setIsLoggedIn(false);
    };

    try {
      const { id, token } = JSON.parse(localStorage.getItem('userData') || '');
      getAccount(id, token);
    } catch (err) {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="home">
        {isLoggedIn ? 'logou' : 'não logou'}
      </div>
    </>
  );
}
