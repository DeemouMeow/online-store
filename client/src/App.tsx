import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter';
import NavBar from './components/UI/NavBar';
import { useAppDispatch } from './hooks/redux';
import { userSlice } from './store/reducers/userSlice';
import { useEffect } from 'react';
import { basketActions, brandActions, typeActions } from './store/action creators';

const App = () => {
  const dispatch = useAppDispatch();
  const { auth } = userSlice.actions;
  const { getTypes } = typeActions;
  const { getBrands } = brandActions;
  const { getDevices: getBasketDevices } = basketActions;

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getBrands());
    dispatch(getBasketDevices());
  }, []);

  if (localStorage.getItem("token")) {
    const user = localStorage.getItem("current_user");
    dispatch(auth(JSON.parse(user || "{}")));
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;