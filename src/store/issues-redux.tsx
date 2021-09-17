import { IIssues } from "../interface"

const UPDATE_ISSUES = 'UPDATE_ISSUES'
// const ADD_ISSUE = 'ADD_ISSUE'
// const DELETE_ISSUE = 'DELETE_ISSUE'

let init: IIssues[] =
    [
        {
            title: 'Заголовок1 задачи',
            nice_id: 'DSA432',
            is_current: true, // текущая задача, над которой голосуют
            link: 'ссылка на задачу',
            priority: 'low', // ['low', 'middle', 'high']
        },
        {
            title: 'Заголовок2 задачи',
            nice_id: 'DSA432',
            is_current: false, // текущая задача, над которой голосуют
            link: 'ссылка на задачу',
            priority: 'low', // ['low', 'middle', 'high']
        },
        {
            title: 'Заголовок3 задачи',
            nice_id: 'DSA432',
            is_current: false, // текущая задача, над которой голосуют
            link: 'ссылка на задачу',
            priority: 'low', // ['low', 'middle', 'high']
        }

    ]

export const updateIssuesAC = (value: IIssues) => {
    return {
        type: UPDATE_ISSUES,
        value: value
    }
}
// export const addIssueAC = (value: IIssues) => {
//     return {
//         type: ADD_ISSUE,
//         value: value
//     }
// }
// export const deleteIssueAC = (value: string) => {
//     return {
//         type: DELETE_ISSUE,
//         value: value
//     }
// }
const issuesReducer = (state: IIssues[] = init,
    action: {
        type: string;
        value: IIssues | string
    }) => {
    let stateCopy
    switch (action.type) {
        case UPDATE_ISSUES:
            stateCopy = {
                ...state,
                issues: action.value
            }
            return stateCopy
       
        default:
            return state
    }

}
export default issuesReducer
