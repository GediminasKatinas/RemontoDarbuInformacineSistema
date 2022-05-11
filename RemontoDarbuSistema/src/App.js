import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AuthProvider from './Hooks/AuthProvider';
import PrivateRoute from './Komponentai/PrivateRoute/PrivateRoute';

import Antraste from './Komponentai/Antraste/Antraste';
import Poraste from './Komponentai/Poraste/Poraste';
import Namai from './Komponentai/Namai/Namai';
import Nerasta from './Komponentai/Nerasta/Nerasta';
import Meistras from './Komponentai/Meistras/Meistras';
import Paieska from './Komponentai/Paieska/Paieska';
import Prisijungimas from './Komponentai/Prisijungimas/Prisijungimas';
import Registracija from './Komponentai/Registracija/Registracija';
import Skydelis from './Komponentai/Skydelis/Skydelis';
import ApieMus from './Komponentai/ApieMus/ApieMus';
import Karjera from './Komponentai/Karjera/Karjera';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Antraste></Antraste>

        <Switch>
          <Route exact path="/">
            <Namai></Namai>
          </Route>

          <Route exact path="/Paieska">
            <Paieska />
          </Route>

          <Route exact path="/ApieMus">
            <ApieMus />
          </Route>


          <Route exact path="/Karjera">
            <Karjera />
          </Route>


          <Route exact path="/Prisijungimas">
            <Prisijungimas />
          </Route>

          <Route exact path="/Registracija">
            <Registracija />
          </Route>

          <PrivateRoute path="/Skydelis">
            <Skydelis />
          </PrivateRoute>

          <Route exact path ="/Meistras/:Id">
            <Meistras/>
          </Route>

          <Route path="*">
            <Nerasta></Nerasta>
          </Route>
        </Switch>

        <Poraste></Poraste>
      </Router>
    </AuthProvider>
  );
}

export default App;
