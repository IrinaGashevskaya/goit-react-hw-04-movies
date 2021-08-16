import { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
const HomePage = lazy(() => import('./pages/HomePage/HomePage.js'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.js'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage.js'));

const App = () => (
  <>
    <AppBar />
    <Suspense fallback={<h1>Loading...</h1>}>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>
        <Route path="/movies">
          <MoviesPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Suspense>
  </>
);

export default App;
