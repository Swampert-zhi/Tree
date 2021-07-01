import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import CheckRoute from "./routes/CheckRoute";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
            <Route exact path="/Login" component={LoginView}/>
            <Route exact path="/Register" component={RegisterView}/>
            <CheckRoute path="/" component={HomeView} />
            <Redirect from="/*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
