import { IUser } from '../interface';
import api from '../services/api';
import { TNiceId } from '../types';

const UPDATE_USER = 'UPDATE_USER';
const TRY_DELETE_USER = 'TRY_DELETE_USER';

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

export const tryDeleteUser = (value: TNiceId): { type: string; value: TNiceId } => ({
  type: TRY_DELETE_USER,
  value,
});

const userReducer = (state: IUser = initialUserState,
  action: {
    type: string;
    value: IUser | TNiceId
  }): IUser => {

  let stateCopy;

  switch (action.type) {
    case UPDATE_USER:
      if (typeof action.value === 'object') {
        stateCopy = {
          ...action.value,
        };
        return stateCopy;
      }
      return state;
    case TRY_DELETE_USER:
      if ( state.niceId === action.value ) {
        stateCopy = {
          ...initialUserState,
        };
        api.userKicked();
        window.toast('You was kicked out of the game');
      }
      return state;

    default:
      return state;
  }
};
export default userReducer;
