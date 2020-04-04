import React from 'react';
import PropTypes from 'prop-types'; //para difinir meus propTypes fí
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import { store } from '~/store';

export default function RouteWrapper({
  component: Component, //desestruturando propriedades que as rotas recebem 
  isPrivate = false,
  ...rest
}) {
  const { signed } = store.getState().auth; //pegando estado do auth

  if (!signed && isPrivate) { //não está logado e é uma rota privada
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) { //não precisa fazer login na aplicação dnv se já está logado né fí
    return <Redirect to="/dashboard" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout; //se tiver autenticado é DF, caso contrário, AL

  return <Route {...rest} render={props => (
    <Layout>
      <Component{...props} />
    </Layout>
  )} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]) //componente no react pode ser uma função ou classe 
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};