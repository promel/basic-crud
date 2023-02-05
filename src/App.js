import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes ,Switch} from 'react-router-dom';
import Users  from './components/users/Users';
import AddUser from './components/users/AddUser';
import EditUser from './components/users/EditUser';
const App = () => {
  return (
    <div className="container">
      <div className="row">
      <Router>
      <Fragment>
        <Switch>
          <Route exact path='/add-user' component={AddUser} />
          <Route exact path='/edit-user/:id' component={EditUser} />
          <Route exact path='/' component={Users} />
          <Route exact path='/users' component={Users} />

        </Switch>
      </Fragment>
    </Router>
      </div>
    </div>
  );
};



export default App;
