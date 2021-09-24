import { IServerData } from '../interface';

const UPDATE_ALL_DATA = 'UPDATE_ALL_DATA';

const init: IServerData = {
  game: {
    status: 'lobby',
    userId: 125,
    id: 125,
    niceId: 'HHH111',
    updatedAt: 'a',
    createdAt: 'a',
  },
  members: [
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
  ],
  issues: [
    {
      title: 'Заголовок1 задачи',
      niceId: 'DSA432',
      isCurrent: true, // текущая задача, над которой голосуют
      link: 'ссылка на задачу',
      priority: 'middle', // ['low', 'middle', 'high']
    },
    {
      title: 'Заголовок2 задачи',
      niceId: 'DSA432',
      isCurrent: false, // текущая задача, над которой голосуют
      link: 'ссылка на задачу',
      priority: 'high', // ['low', 'middle', 'high']
    },
    {
      title: 'Заголовок3 задачи',
      niceId: 'DSA432',
      isCurrent: false, // текущая задача, над которой голосуют
      link: 'ссылка на задачу',
      priority: 'low', // ['low', 'middle', 'high']
    },
  ],
  scores: [
    {
      issueId: 125,
      userId: 1258,
      score: '20',
      id: 25,
      updatedAt: '25',
      createdAt: 'ki',
    },
    {
      issueId: 125,
      userId: 1258,
      score: '20',
      id: 25,
      updatedAt: '25',
      createdAt: 'ki',
    },
    {
      issueId: 125,
      userId: 1258,
      score: '20',
      id: 25,
      updatedAt: '25',
      createdAt: 'ki',
    },
  ],
  usersIssues: {
    idUser: {
      issueId: 125,
      userId: 1258,
      score: '20',
      id: 25,
      updatedAt: '25',
      createdAt: 'ki',
    },
  },
};

export const updateAllData = (value: IServerData): { type: string, value: IServerData } => ({
  type: UPDATE_ALL_DATA,
  value,
});

const allDataReducer = (state: IServerData = init,
  action: {
    type: string;
    value: IServerData;
  }): IServerData => {
  console.log('allDataReducers1', state);
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
