import logo from './logo.svg';
import './App.css';
import { Dashboard } from './views/dashboard';
import { Navbar } from './components/navbar';
import { Search } from './components/dash-search';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ListView } from './views/listView';
import { DetailView } from './views/detailView';
import { Login } from './views/login';

function App() {
  return (
    <BrowserRouter>

      <Routes>
      <Route path="/" element={<Dashboard />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:type" element={<ListView />} />
        <Route path="/dashboard/:type/:id" element={<DetailView />} />
        <Route path="/login" element={<Login />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
