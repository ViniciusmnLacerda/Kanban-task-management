/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { MdDone } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import StatusCode from '../enums/StatusCode';
import { IPeople, IUserAdmin } from '../interfaces';
import { setCreatingWorkspace } from '../redux/sliceControls';
import { getPeople } from '../redux/slicePeople';
import { getUser } from '../redux/sliceUser';
import { getWorkspaces, setWorkspaces } from '../redux/sliceWorkspaces';
import HandleMembers from '../service/HandleMembers';
import HandleWorkspaces from '../service/HandleWorkspaces';
import '../styles/NewWorkspace.css';
import Loading from './Loading';

export default function NewWorkspace() {
  const [title, setTitle] = useState('');
  const people = useSelector(getPeople);
  const workspaces = useSelector(getWorkspaces);
  const user = useSelector(getUser);
  const [userAdmin, setUserAdmin] = useState([] as IUserAdmin[]);
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([] as string[]);
  const [peopleToRender, setPeopleToRender] = useState([] as IPeople[]);
  const [controlBox, setControlBox] = useState(false);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const handleWorkspaces = new HandleWorkspaces();
  const handleMembers = new HandleMembers();
  const dispatch = useDispatch();

  const finish = async () => {
    setLoading(true);
    const emailsList = [...emails];
    emailsList.unshift(user.email);
    const body = { title, emails: emailsList };
    const response = await handleWorkspaces.create(body, user.token);
    if (response?.status === StatusCode.CREATED) {
      const result = await handleWorkspaces.getter(user.accountId, user.token);
      dispatch(setWorkspaces(result?.data));
    }
  };

  const handleClick = (id: number) => {
    const member = people.find((person) => person.accountId === id);
    const emailsList = [...emails, member?.email];
    setEmails(emailsList as unknown as string[]);
  };

  const previous = () => {
    const previousStep = step - 1;
    setStep(previousStep);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const obj = [...userAdmin];
    obj[index].admin = !userAdmin[index].admin;
    setUserAdmin(obj);
  };

  const next = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      const userAdmArr = emails.map((email) => {
        const userId = people.find((person) => person.email === email);
        const userObj = { email, admin: false, accountId: userId?.accountId };
        return userObj;
      });
      setUserAdmin(userAdmArr as unknown as never[]);
    }
    if (step < 2) {
      const nextStep = step + 1;
      setStep(nextStep);
    }
    if (step === 2) {
      finish();
    }
  };

  const wasAdded = (userEmail: string) => {
    const validate = emails.find((email) => email === userEmail);

    return validate;
  };

  useEffect(() => {
    if (name.length > 0) {
      setControlBox(true);
      const peopleFiltered = people.filter((e) => e.name.includes(name));
      setPeopleToRender(peopleFiltered);
    } else {
      setControlBox(false);
      setPeopleToRender([]);
    }
  }, [name, people, emails]);

  useEffect(() => {
    const insertMembers = async () => {
      const id = workspaces[workspaces.length - 1].workspaceId;
      const insertPromise = userAdmin.map(async (e, index) => {
        if (e.admin) {
          const result = await handleMembers.update(e.accountId, id, user.token);
          console.log('data: ', result?.data);
        }
        if (index === userAdmin.length - 1) {
          dispatch(setCreatingWorkspace(false));
        }
      });

      await Promise.all(insertPromise);
    };

    insertMembers();
  }, [workspaces]);

  return (
    <main className="new-workspace">
      <header className="nwk-header">
        <button
          onClick={ () => dispatch(setCreatingWorkspace(false)) }
        >
          <RxCross1 fontSize={ 16 } />
        </button>
        <p>Create a new workspace</p>
      </header>
      <aside className="sidebar" />
      <form
        onSubmit={ (e) => next(e) }
        className="nwk-form"
      >
        {step === 0 && (
          <>
            <h1>
              Start by choosing a title for your
              {' '}
              <span>new workspace</span>
            </h1>
            <input
              autoComplete="off"
              placeholder="Type the title"
              type="text"
              name="title"
              value={ title }
              onChange={ (e) => setTitle(e.target.value) }
            />
          </>
        )}
        {step === 1 && (
          <>
            <h1>Choose your workspace members</h1>
            <input
              autoComplete="off"
              type="text"
              name="name"
              value={ name }
              onChange={ (e) => setName(e.target.value) }
            />
            <section className={ controlBox ? 'render' : 'not-render' }>
              {peopleToRender.map((person) => (
                <button
                  type="button"
                  className="members-list"
                  key={ person.accountId }
                  onClick={ () => handleClick(person.accountId) }
                  disabled={ wasAdded(person.email) !== undefined }
                >
                  {`${person.name} ${person.lastName}`}
                  {wasAdded(person.email) && <MdDone color="green" fontSize={ 16 } />}
                </button>
              ))}
            </section>
          </>
        )}
        {step === 2 && (
          <>
            <h1>{`Workspace ${title}`}</h1>
            <p>Select workspace admins</p>
            {emails.map((email, index) => {
              const account = people.find((person) => person.email === email);
              return (
                <label
                  className="lbl-checkbox"
                  key={ email }
                >
                  <span>{`${account?.name} ${account?.lastName}`}</span>
                  <input
                    type="checkbox"
                    value="admin"
                    onChange={ (e) => handleCheckbox(e, index) }
                    checked={ userAdmin[index].admin }
                  />
                </label>
              );
            })}
          </>
        )}
        <div
          className="nwk-btns"
        >
          {step > 0 && (
            <button
              type="button"
              className="nwk-btn-previous"
              onClick={ previous }
              disabled={ loading }
            >
              Previous
            </button>
          )}
          <button
            className="nwk-btn-next"
            type="submit"
            disabled={ title.length < 2 || loading }
          >
            {step === 2 ? (loading ? <Loading
              color="#fdfefb"
              width="25px"
              height="25px"
            /> : 'Finish') : 'Next'}
          </button>
        </div>
      </form>
    </main>
  );
}
