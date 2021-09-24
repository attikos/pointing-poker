import { IUser } from '../interface';

// const UPDATE_FIRSTNAME = 'UPDATE_FIRSTNAME'
// const UPDATE_LASTNAME = 'UPDATE_LASTNAME'
// const UPDATE_JOB = 'UPDATE_JOB'
// const UPDATE_ISOBSERVER = 'UPDATE_ISOBSERVER'
// const UPDATE_FOTO = 'UPDATE_FOTO'
const UPDATE_USER = 'UPDATE_USER';

export const initialUserState: IUser = {
  isObserver: false,
  isDiller: false,
  firstName: '',
  lastName: '',
  job: '',
  foto: '',
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
