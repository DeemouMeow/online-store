import React, { FC } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes, routes } from '../pages/routes/routes';
import { useTypedSelector } from '../hooks/redux';

const AppRouter: FC = () => {
  const { isAuth } = useTypedSelector(state => state.userReducer);

  return (
    <div className="AppRouter">
      <Routes>
        {isAuth && authRoutes.map(route => <Route key={route.path} path={route.path} element={<route.element />} />)}
        {publicRoutes.map(route => <Route key={route.path} path={route.path} element={<route.element />} />)}
        <Route path="*" element={<Navigate to={routes.shop} replace />} />
      </Routes>
    </div>
  );
}

export default AppRouter;