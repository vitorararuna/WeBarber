import React from 'react';
import PropTypes from 'prop-types'; //para difinir meus propTypes fí
import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
  component: Component, //desestruturando propriedades que as rotas recebem 
  isPrivate = false,
  ...rest
}) {
  const signed = false;

  if (!signed && isPrivate) { //não está logado e é uma rota privada
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) { //não precisa fazer login na aplicação dnv se já está logado né fí
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]) //componente no react pode ser uma função ou classe 
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};