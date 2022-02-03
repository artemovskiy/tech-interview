import logo from './logo.svg';
import './App.css';
import Shop from './Shop'

function App() {
  return (
    <div className="App">
      <Shop name="techmarket" ownerId={1337}/>
    </div>
  );
}

export default App;
