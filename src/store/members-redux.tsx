import { IUser } from '../interface';

const UPDATE_MEMBERS = 'UPDATE_MEMBERS';

const init: IUser[] = [
  {
    niceId: 'ABC123',
    firstName: 'AAAA1',
    lastName: 'Фамилия участника1',
    isDiller: false,
    isObserver: false, // может голосовать
    job: 'my work',
  },
  {
    niceId: 'ABC123',
    firstName: 'Thn2',
    lastName: 'Фамилия участника2',
    isDiller: true,
    isObserver: false, // может голосовать
    job: 'my work',
  },
  {
    niceId: 'ABC123',
    firstName: 'Thn2',
    lastName: 'GTG2',
    isDiller: false,
    isObserver: false, // не может голосовать
    job: 'my work',
  },
  {
    niceId: 'ABC123',
    firstName: 'Roik3',
    lastName: 'Фамилия участника3',
    isDiller: false,
    isObserver: false, // может голосовать
    job: 'my work',
  },
];
export const updateMembersAC = (value: IUser): {
  type: string;
  value: IUser;
} => ({
  type: UPDATE_MEMBERS,
  value,
});

const membersReducer = (state: IUser[] = init,
  action: {
    type: string;
    value: IUser[]
  }): IUser[] => {
  let stateCopy;
  switch (action.type) {
    case UPDATE_MEMBERS:
      stateCopy = {
        ...state,
      };
      stateCopy =  action.value;
      return stateCopy;

    default:
      return state;
  }
};
export default membersReducer;
