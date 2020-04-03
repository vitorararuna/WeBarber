import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Content } from './styles';

export default function AuthLayout({ children }) { //children = todos os componentes filhos desse AuthLayout  
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired, //element => <Element />
};