import React, { useEffect } from "react";
import ArtistRoute from "./ArtistRoute";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import { useDispatch } from "react-redux";
const DEFAULT_ARTIST_ID = "4mpJaw5y17CIN08qqe8EfB";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(receiveAccessToken(data.access_token));
      })
      .catch((error) => {
        dispatch(receiveAccessTokenError(error));
      });
  });
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/artists/:id">
            <ArtistRoute />
            <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`}></Redirect>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
