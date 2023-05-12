import logo from './logo.svg';
import './App.css';
import { Dashboard } from './views/dashboard';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div>
      <Navbar/>
      <Dashboard/>
    </div>
  );
}

export default App;
