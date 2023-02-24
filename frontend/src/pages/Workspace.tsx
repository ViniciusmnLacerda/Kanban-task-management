import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Columns from '../components/Columns';
import Navbar from '../components/Navbar';
import StatusCode from '../enums/StatusCode';
import { setColumns } from '../redux/sliceColumns';
import { getControls } from '../redux/sliceControls';
import { getUser } from '../redux/sliceUser';
import HandleColumns from '../service/HandleColumns';

export default function Workspace() {
  const dispatch = useDispatch();
  const handleColumns = new HandleColumns();
  const controls = useSelector(getControls);
  const { token } = useSelector(getUser);

  useEffect(() => {
    const getColumns = async () => {
      const response = await handleColumns.getter(controls.workspaceId, token);
      if (response?.status === StatusCode.OK) {
        dispatch(setColumns(response.data));
      }
    };

    getColumns();
  }, []);
  return (
    <>
      <Navbar />
      <Columns />
    </>
  );
}
