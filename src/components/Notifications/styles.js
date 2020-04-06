import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;

  ${props => props.hasUnread && css` /*Se meu Badge tiver essa propriedade, vou mete-li o css */
      
      &::after { /*Pego esse meu componente e acessar a propriedade after dele (p eu adc um tipo de conteúdo antes da tag badge(button) fechar)*/
        position: absolute;
        right: 0;
        top: 0;
        width: 8px;
        height: 8px;
        background: #ff892e;
        content: '';
        border-radius: 50%;
      }
    `}
`;

export const NotificationList = styled.div`
  position: absolute; /* Fica dentro do componente o qual ela está inserida */
  width: 260px;
  left: calc(50% - 130px); /*50% do tamanho dela e 130px pra direita e 130px para esquerda, já que seu width é 260 */
  top: calc(100% + 30px);
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 0.6);
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 260px;
  padding: 5px 15px;
`;

export const Notification = styled.div`
  color: #fff;
  & + div { /*Só a partir da segunda */
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  p {
    font-size: 13px;
    line-height: 18px;
  }
  time {
    display: block;
    font-size: 12px;
    opacity: 0.6;
    margin-bottom: 5px;
  }
  button {
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#7159c1')};
  }
  ${props => props.unread && css`
      &::after {
        content: '';
        display: inline-block; /*P ficar do lado do botão   */
        width: 8px;
        height: 8px;
        background: #ff892e;
        border-radius: 50%;
        margin-left: 10px;
      }
    `}
`;