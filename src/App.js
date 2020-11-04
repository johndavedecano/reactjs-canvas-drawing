import { Switch, Route, Router as BrowserRouter } from 'wouter';

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
          <Route component={Instructor} path="/" />
          <Route component={Student} path="/student/:room" exact />
        </Switch>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
