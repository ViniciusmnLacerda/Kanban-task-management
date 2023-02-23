import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { FcTodoList } from 'react-icons/fc';
import { MdDone } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import StatusCode from '../enums/StatusCode';
import IWorkspace from '../interfaces/IWorkspaces';
import { setPeople } from '../redux/slicePeople';
import { getUser, setUser } from '../redux/sliceUser';
import { getWorkspaces, setWorkspaces } from '../redux/sliceWorkspaces';
import HandleAccount from '../service/HandleAccount';
import HandlePeople from '../service/HandlePeople';
import HandleWorkspaces from '../service/HandleWorkspaces';
import '../styles/Home.css';

export default function Home() {
  const workspaces = useSelector(getWorkspaces);
  const user = useSelector(getUser);
  const [title, setTitle] = useState('');
  const [toEdit, setToEdit] = useState('');
  const handleAccount = new HandleAccount();
  const handleWorkspaces = new HandleWorkspaces();
  const handlePeople = new HandlePeople();
  const dispatch = useDispatch();

  useEffect(() => {
    const initialFetch = async (id: number, token: string) => {
      const account = await handleAccount.getAccount(id, token);
      if (account?.status === StatusCode.OK) {
        dispatch(setUser({
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
      const { id, token } = JSON.parse(localStorage.getItem('userData') || '');
      initialFetch(id, token);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setTitle(value);
  };

  const changeTitle = async (workspaceId: number) => {
    const response = await handleWorkspaces.update(workspaceId, title, user.token);

    if (response?.status === StatusCode.UPDATE) {
      const dataWorkspaces = await handleWorkspaces.getter(user.id, user.token);
      if (dataWorkspaces?.status === StatusCode.OK) {
        dispatch(setWorkspaces(dataWorkspaces.data));
      }
    }
    setToEdit('');
  };

  return (
    <>
      <Navbar />
      <main className="home">
        <ul className="workspaces">
          {workspaces.map((workspace: IWorkspace) => (
            <li
              className="wk-li"
              key={ workspace.workspaceId }
            >
              <div className="wk-title">
                <FcTodoList fontSize={ 22 } />
                { +toEdit === workspace.workspaceId ? (
                  <form>
                    <input
                      placeholder="New title"
                      type="text"
                      value={ title }
                      name="title"
                      onChange={ (e) => handleChange(e) }
                    />
                  </form>
                ) : (
                  <Link
                    to={ `/workspace/${workspace.workspaceId}` }
                  >
                    {workspace.workspace.title}
                  </Link>
                )}
              </div>
              {+toEdit === workspace.workspaceId ? (
                <div className="wk-btns">
                  <button
                    className="li-btn"
                    onClick={ () => setToEdit('') }
                  >
                    <RxCross1 color="red" />
                  </button>
                  <button
                    className="li-btn"
                    onClick={ () => changeTitle(workspace.workspaceId) }
                  >
                    <MdDone color="green" />
                  </button>
                </div>
              ) : (
                <button
                  className="li-btn"
                  onClick={ () => {
                    setToEdit(`${workspace.workspaceId}`);
                    setTitle(workspace.workspace.title);
                  } }
                >
                  <BsPencil fontSize={ 15 } />
                </button>
              )}
            </li>
          ))}
        </ul>
        <button className="new-wk-btn">
          <span>
            <AiOutlinePlus />
            New Workspace
          </span>
        </button>
      </main>
    </>
  );
}
