import { IMembers } from '../interface';

const UPDATE_MEMBERS = 'UPDATE_MEMBERS';

const init: IMembers[] = [
  {
    nice_id: 'ABC123',
    first_name: 'AAAA1',
    last_name: 'Фамилия участника1',
    is_diller: false,
    is_player: true, // может голосовать
    job: 'my work',
  },
  {
    nice_id: 'ABC123',
    first_name: 'Thn2',
    last_name: 'Фамилия участника2',
    is_diller: true,
    is_player: true, // может голосовать
    job: 'my work',
  },
  {
    nice_id: 'ABC123',
    first_name: 'Thn2',
    last_name: 'GTG2',
    is_diller: false,
    is_player: false, // может голосовать
    job: 'my work',
  },
  {
    nice_id: 'ABC123',
    first_name: 'Roik3',
    last_name: 'Фамилия участника3',
    is_diller: false,
    is_player: true, // может голосовать
    job: 'my work',
  },
];
export const updateMembersAC = (value: IMembers): {
  type: string;
  value: IMembers;
} => ({
  type: UPDATE_MEMBERS,
  value,
});

const membersReducer = (state: IMembers[] = init,
  action: {
    type: string;
    value: IMembers[]
  }): IMembers[] => {
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
