import { useReducer } from 'react';

function reducer(state, action) {
  if (action.type === 'incremented_count') {
    return {
      count: state.count + 1
    };
  }
  else  if (action.type === 'get_count') {
    return {
      count: state.count
    };
  }
  throw Error('Unknown action.');
}

export default reducer;