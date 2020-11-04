import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';

import { createBrowserHistory } from 'history';

import Student from './pages/student';
import Instructor from './pages/instructor';
import Preview from './pages/preview';

import './tailwind.output.css';

function App() {
  return (
    <BrowserRouter history={createBrowserHistory()}>
      <div className="App">
        <Switch>
          <Route component={Instructor} path="/" exact />
          <Route component={Student} path="/student" exact />
          <Route component={Preview} path="/preview/:studentId" exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
