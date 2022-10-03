import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector(state => ({ ...state }));
  if (!auth) localStorage.setItem("accessDenied", "Trebuie să fii conectat în platformă pentru a vizualiza pagina.");
  return auth && (auth.token || auth.tokenId) ? <Route {...rest} /> : <Redirect to="/login" />;
};

export const PrivateRouteInverse = ({ ...rest }) => {
  const { auth } = useSelector(state => ({ ...state }));
  return auth && (auth.token || auth.tokenId) ? <Redirect to="/" /> : <Route {...rest} />;
};
