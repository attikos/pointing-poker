import { IUser } from '../interface';

const UPDATE_USER = 'UPDATE_USER';
export const initialUserState: IUser = {
  isObserver: true,
  isDiller: true,
  firstName: '',
  lastName: '',
  job: '',
  foto: '',
  id: -1,
};
export const updateUserAC = (value: IUser): { type: string; value: IUser } => ({
  type: UPDATE_USER,
  value,
});
const userReducer = (state: IUser = initialUserState,
  action: {
    type: string;
    value: IUser
  }): IUser => {
  let stateCopy;
  console.log('userReducer', state);
  switch (action.type) {
    case UPDATE_USER:
      stateCopy = {
        ...action.value,
      };
      return stateCopy;
    default:
      return state;
  }
};
export default userReducer;
