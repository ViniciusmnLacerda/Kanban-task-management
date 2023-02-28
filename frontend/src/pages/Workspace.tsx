import { useSelector } from 'react-redux';
import Columns from '../components/Columns';
import Navbar from '../components/Navbar';
import Popup from '../components/Popup';
import { getControls } from '../redux/sliceControls';
import '../styles/Workspace.css';

export default function Workspace() {
  const { popup: { open } } = useSelector(getControls);
  return (
    <>
      <Navbar />
      <Columns />
      {open && <Popup />}
    </>
  );
}
