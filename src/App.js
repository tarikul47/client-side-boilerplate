import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Pages/Shared/Header/Header';
import './App.css';
import Home from "./Pages/Home/Home/Home";
import Login from "./Pages/Login/Login/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
