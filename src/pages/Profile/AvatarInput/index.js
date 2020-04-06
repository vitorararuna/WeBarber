import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';
import { Container } from './styles';

export default function AvatarInput() {
  const ref = useRef();

  const { defaultValue, registerField } = useField('avatar'); //vai pegar os valore de "avatar" que foi enviado pelo redux

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]); //multipartform = "file". [0] pq ele só vai pegar o primeiro arquivo, mesmo se o maluco adicionar mais de um 
    const response = await api.post('files', data);
    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={preview}
          alt=""
        />
        <input
          type="file"
          id="avatar"
          accept="image/*" //só aceito imagens
          data-file={file} //id do file
          onChange={handleChange} //quando ele seleciona uma imagem
          ref={ref} //unForm precisa da referencia do input pra depois buscar o valor dele através da propriedade data-file
        />
      </label>
    </Container>
  );
}