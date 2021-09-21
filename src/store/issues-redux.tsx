import { IIssues } from '../interface';

const UPDATE_ISSUES = 'UPDATE_ISSUES';
const ADD_ISSUE = 'ADD_ISSUE';
const DELETE_ISSUE = 'DELETE_ISSUE';

const init: IIssues[] = [
  {
    title: 'Заголовок1 задачи',
    nice_id: 'DSA432',
    is_current: true, // текущая задача, над которой голосуют
    link: 'ссылка на задачу',
    priority: 'middle', // ['low', 'middle', 'high']
  },
  {
    title: 'Заголовок2 задачи',
    nice_id: 'DSA432',
    is_current: false, // текущая задача, над которой голосуют
    link: 'ссылка на задачу',
    priority: 'high', // ['low', 'middle', 'high']
  },
  {
    title: 'Заголовок3 задачи',
    nice_id: 'DSA432',
    is_current: false, // текущая задача, над которой голосуют
    link: 'ссылка на задачу',
    priority: 'low', // ['low', 'middle', 'high']
  },

];

export const updateIssuesAC = (value: IIssues, index: number) => ({
  type: UPDATE_ISSUES,
  value,
  index,
});
export const addIssueAC = (value: IIssues) => ({
  type: ADD_ISSUE,
  value,
});
export const deleteIssueAC = (value: string, index: number) => ({
  type: DELETE_ISSUE,
  value,
  index,
});
const issuesReducer = (state: IIssues[] = init,
  action: {
    type: string;
    value: IIssues;
    index: number;
  }) => {
  let stateCopy;
  switch (action.type) {
    case UPDATE_ISSUES:
      stateCopy = [
        ...state,
      ];
      stateCopy[action.index].title = action.value.title;
      stateCopy[action.index].link = action.value.link;
      stateCopy[action.index].priority = action.value.priority;
      return stateCopy;
    case ADD_ISSUE:
      stateCopy = [
        ...state,
      ];
      console.log('stateCopy', stateCopy);
      console.log('action.value', action.value);
      stateCopy.push(action.value);
      console.log('stateCopy', stateCopy);
      return stateCopy;
    case DELETE_ISSUE:
      stateCopy = [
        ...state,
      ];
      stateCopy.splice(action.index, action.index);
      return stateCopy;
    default:
      return state;
  }
};
export default issuesReducer;
