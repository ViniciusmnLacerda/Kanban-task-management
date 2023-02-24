import Columns from '../components/Columns';
import Navbar from '../components/Navbar';
import '../styles/Workspace.css';

export default function Workspace() {
  return (
    <>
      <Navbar />
      <section className="board">
        <Columns />
      </section>
    </>
  );
}
