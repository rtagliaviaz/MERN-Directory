import { GET_ERRORS, CLEAR_ERRORS } from './types'

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return{
    type: GET_ERRORS,
    payload: {msg, status, id}
  };
}

//CLEAR GET_ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
}