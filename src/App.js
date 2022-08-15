import { Switch, Route, Redirect} from 'react-router-dom';
import Login from '@/pages/login';
import Admin from '@/pages/admin';
import './App.less';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/admin/login" component={Login}></Route>
        <Route path="/admin" component={Admin}></Route>
        <Redirect to='/admin'></Redirect>
      </Switch>
    </div>
  );
}

export default App;