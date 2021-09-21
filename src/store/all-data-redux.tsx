const UPDATE_ALL_DATA = 'UPDATE_ALL_DATA';

const init = {};
export const updateAllData = (value: Object) => ({
  type: UPDATE_ALL_DATA,
  value,
});

const allDataReducer = (state: any = init,
  action: {
    type: string;
    value: Object;
  }) => {
  let stateCopy;
  switch (action.type) {
    case UPDATE_ALL_DATA:
      stateCopy = {
        ...state,
        ...action.value,
      };
      return stateCopy;
    default:
      return state;
  }
};
export default allDataReducer;
