import produce from 'immer'; //para manipular o estado

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {


    case '@auth/SIGN_IN_SUCCESS': //toda vez que essa minha action for disparada, então eu vou :
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.signed = true;
      });


    default:
      return state;
  }
}