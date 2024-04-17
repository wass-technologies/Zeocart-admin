import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './Routes';
import AppLayout from '../Layout/Layout';
import ScrollTop from '../ScrollToTop';

const LayoutRoutes = () => {
  return (
    <>
    <ScrollTop>
      <Routes>
        {routes.map(({ path, Component }, i) => (
          <Fragment key={i}>
          <Route element={<AppLayout />} key={i}>
            <Route path={path} element={Component} />
          </Route>
          </Fragment>
        ))}
      </Routes>
      </ScrollTop>
    </>
  );
};

export default LayoutRoutes;