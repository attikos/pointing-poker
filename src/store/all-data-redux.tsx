import { IServerData } from '../interface';

const UPDATE_ALL_DATA = 'UPDATE_ALL_DATA';

export const initServerData: IServerData = {
  game: {},
  messages : [],
  members: [],
  issues: [],
  scores: [],
  usersScores: {},
};

export const updateAllData = (value: IServerData): { type: string, value: IServerData } => ({
  type: UPDATE_ALL_DATA,
  value,
});

const allDataReducer = (state: IServerData = initServerData,
  action: {
    type: string;
    value: IServerData;
  }): IServerData => {
  let stateCopy;
  switch (action.type) {
    case UPDATE_ALL_DATA:
      stateCopy = {
        ...action.value,
      };
      return stateCopy;
    default:
      return state;
  }

};
export default allDataReducer;
