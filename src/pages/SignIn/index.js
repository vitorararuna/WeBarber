import React from 'react';
import { useDispatch } from 'react-redux'; //p gente disparar uma action
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import logo from '~/assets/logo.svg';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions'; //signInRequest é a função que o componente de login tem que disparar para q o SAGA ouça ela e faça o processo de auth


const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido!') //precisa estar no formato de email, se não for, vai mostrar tal mensagem
    .required('O e-mail é obrigatório!'),
  password: Yup.string().required('A senha é obrigatória!'),
});


export default function SignIn() {
  

  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
    // console.tron.log(email, password);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Acessar</button>
        <Link to="/register">Criar sua conta gratuita</Link>
      </Form>
    </>
  );
}