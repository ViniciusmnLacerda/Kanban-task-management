import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewWorkspace from '../components/NewWorkspace';
import Workspaces from '../components/Workspaces';
import StatusCode from '../enums/StatusCode';
import { getControls } from '../redux/sliceControls';
import { setPeople } from '../redux/slicePeople';
import { setUser } from '../redux/sliceUser';
import { setWorkspaces } from '../redux/sliceWorkspaces';
import HandleAccount from '../service/HandleAccount';
import HandlePeople from '../service/HandlePeople';
import HandleWorkspaces from '../service/HandleWorkspaces';
import '../styles/Home.css';

export default function Home() {
  const { isCreatingWorkspace } = useSelector(getControls);
  const handleAccount = new HandleAccount();
  const handleWorkspaces = new HandleWorkspaces();
  const handlePeople = new HandlePeople();
  const dispatch = useDispatch();

  useEffect(() => {
    const initialFetch = async (id: number, token: string, email: string) => {
      const account = await handleAccount.getAccount(id, token);
      if (account?.status === StatusCode.OK) {
        dispatch(setUser({
          email,
          id: account.data.id,
          accountId: account.data.userId,
          name: account.data.name,
          lastName: account.data.lastName,
          image: account.data.image,
          token,
        }));
      }
      const dataWorkspaces = await handleWorkspaces.getter(id, token);

      if (dataWorkspaces?.status === StatusCode.OK) {
        dispatch(setWorkspaces(dataWorkspaces.data));
      }
      const dataPeople = await handlePeople.getter(id, token);
      if (dataPeople?.status === StatusCode.OK) {
        dispatch(setPeople(dataPeople.data));
      }
    };

    try {
      const { id, token, email } = JSON.parse(localStorage.getItem('userData') || '');
      initialFetch(id, token, email);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    isCreatingWorkspace ? (
      <NewWorkspace />
    ) : (
      <Workspaces />
    )
  );
}
