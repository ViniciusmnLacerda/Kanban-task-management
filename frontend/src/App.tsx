import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={ <Login /> }
        />
        <Route
          path="/register"
          element={ <Register /> }
        />
        <Route
          path="/home"
          element={ <Home /> }
        />
      </Routes>
    </BrowserRouter>
  );
}
