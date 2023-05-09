import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import './App.css';

import Home from './Home/Home';

function App() {
  return (
    <div className="AppComponent">
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
