import { IIssue } from '../interface';

const UPDATE_ISSUES = 'UPDATE_ISSUES';
const ADD_ISSUE = 'ADD_ISSUE';
const DELETE_ISSUE = 'DELETE_ISSUE';

const init: IIssue[] = [
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

];

export const updateIssuesAC = (value: IIssue, index: number): {
  type: string,
  value: IIssue;
  index: number
} => ({
  type: UPDATE_ISSUES,
  value,
  index,
});
export const addIssueAC = (value: IIssue): {
  type: string,
  value: IIssue;

} => ({
  type: ADD_ISSUE,
  value,
});
export const deleteIssueAC = (value: string, index: number): {
  type: string,
  value: string;
  index: number
} => ({
  type: DELETE_ISSUE,
  value,
  index,
});
const issuesReducer = (state: IIssue[] = init,
  action: {
    type: string;
    value: IIssue;
    index: number;
  }): IIssue[] => {
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
