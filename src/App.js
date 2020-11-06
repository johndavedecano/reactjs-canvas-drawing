import { Switch, Route, Router as BrowserRouter, Redirect } from 'wouter';

import { createBrowserHistory } from 'history';

import { SocketProvider } from './SocketContext';

import Student from './pages/student';

import Instructor from './pages/instructor';

import './tailwind.output.css';

function App() {
  return (
    <BrowserRouter history={createBrowserHistory()}>
      <SocketProvider>
        <Switch>
          <Redirect path="/" to="/instructor" />
          <Route component={Instructor} path="/instructor" />
          <Route component={Instructor} path="/instructor/:room" />
          <Route component={Student} path="/student/:room" exact />
        </Switch>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
