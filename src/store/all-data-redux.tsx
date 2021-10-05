import { IServerData } from '../interface';

const UPDATE_ALL_DATA = 'UPDATE_ALL_DATA';

export const initServerData: IServerData = {
  game: {},
  messages : [],
  members: [
    {
      niceId: 'ABC123',
      firstName: 'AAAA1',
      lastName: 'Фамилия участника1',
      isDiller: false,
      isObserver: false, // может голосовать
      job: 'my work',
      id: 16,
    },
    {
      niceId: 'ABC123',
      firstName: 'Thn2',
      lastName: 'Фамилия участника2',
      isDiller: true,
      isObserver: true, // может голосовать
      job: 'my work',
      id: 21,
    },
    {
      niceId: 'ABC123',
      firstName: 'Thn2',
      lastName: 'GTG2',
      isDiller: false,
      isObserver: false, // не может голосовать
      job: 'my work',
      id: 44,
    },
    {
      niceId: 'ABC123',
      firstName: 'Roik3',
      lastName: 'Фамилия участника3',
      isDiller: false,
      isObserver: false, // может голосовать
      job: 'my work',
      id: 55,
    },
  ],
  issues: [
    {
      title: 'Заголовок1 задачи',
      isCurrent: true, // текущая задача, которую все видят. За нее можно начать головать, закончить, посмотреть статистику голосования. Всегда будет isCurrent == true
      link: 'ссылка на задачу',
      priority: 'middle',
      id: 30,
      status: 'new',
    },
    {
      title: 'Заголовок2 задачи',
      isCurrent: false,
      link: 'ссылка на задачу',
      priority: 'high',
      id: 31,
      status: 'finished',
    },
    {
      title: 'Заголовок3 задачи',
      isCurrent: false,
      link: 'ссылка на задачу',
      priority: 'low',
      id: 32,
      status: 'processing',
    },
  ],
  scores: [
    {
      issueId: 30,
      userId: 16,
      score: '20',
      id: 25,
      updatedAt: '25',
      createdAt: 'ki',
    },
    {
      issueId: 30,
      userId: 55,
      score: '20',
      id: 26,
      updatedAt: '25',
      createdAt: 'ki',
    },
    {
      issueId: 125,
      userId: 44,
      score: '20',
      id: 27,
      updatedAt: '25',
      createdAt: 'ki',
    },
  ],
  usersScores: {
    1258: [
      {
        issueId: 125,
        userId: 1258,
        score: '20',
        id: 25,
      },
    ],
  },
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
