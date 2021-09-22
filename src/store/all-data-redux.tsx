import { IServerData } from '../interface';

const UPDATE_ALL_DATA = 'UPDATE_ALL_DATA';

const init = {};
export const updateAllData = (value: IServerData): { type: string, value: IServerData } => ({
  type: UPDATE_ALL_DATA,
  value,
});

const allDataReducer = (state: any = init,
  action: {
    type: string;
    value: IServerData;
  }): IServerData => {
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
