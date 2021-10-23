import './App.css';
import CovidApi from './Components/CovidApi';

function App() {
  return (
    <div className="App">
      <h1 className="heading">Search Your Nearest Vaccination Center</h1>
      <CovidApi/>
    </div>
  );
}

export default App;
