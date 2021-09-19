import { IIssues } from "../interface"

const UPDATE_ISSUES = 'UPDATE_ISSUES'
const ADD_ISSUE = 'ADD_ISSUE'
const DELETE_ISSUE = 'DELETE_ISSUE'
const EDIT_ISSUE_TITLE = 'EDIT_ISSUE_TITLE'
const EDIT_ISSUE_LINK = 'EDIT_ISSUE_LINK'
const EDIT_ISSUE_PRIORITY = 'EDIT_ISSUE_PRIORITY'

let init: IIssues[] =
    [
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
        }

    ]

export const updateIssuesAC = (value: IIssues) => {
    return {
        type: UPDATE_ISSUES,
        value: value
    }
}
export const addIssueAC = (value: IIssues) => {
    return {
        type: ADD_ISSUE,
        value: value
    }
}
export const deleteIssueAC = (value: string, index: number) => {
    return {
        type: DELETE_ISSUE,
        value: value,
        index
    }
}
export const editIssueTitleAC = (title: string, index: number) => {
    return {
        type: EDIT_ISSUE_TITLE,
        title,
        index,
    }
}
export const editIssueLinkAC = (link: string, index: number) => {
    return {
        type: EDIT_ISSUE_LINK,
        link,
        index
    }
}
export const editIssuePriorityAC = (priority: string, index: number) => {
    return {
        type: EDIT_ISSUE_PRIORITY,
        priority,
        index
    }
}
const issuesReducer = (state: IIssues[] = init,
    action: {
        type: string;
        value?: IIssues;
        index?: number;
        title?: string;
        link?: string;
        priority?: string;

    }) => {
    let stateCopy
    switch (action.type) {
        case UPDATE_ISSUES:
            stateCopy = {
                ...state,
                issues: action.value
            }
            return stateCopy
        case ADD_ISSUE:
            stateCopy = {
                ...state,
            }
            if (action.value) {
                stateCopy.push(action.value)
            }
            return stateCopy
        case DELETE_ISSUE:
            stateCopy = {
                ...state,
            }
            // stateCopy.splice(action.index, action.index)
            return stateCopy
        case EDIT_ISSUE_TITLE:
            stateCopy = {
                ...state,
            }
            console.log("stateCopy", stateCopy)
            if (action.index && action.title) {
                stateCopy[action.index].title = action.title
            }
            return stateCopy
        case EDIT_ISSUE_LINK:
            stateCopy = {
                ...state,

            }
            // stateCopy[action.index].link = action.link
            return stateCopy
        case EDIT_ISSUE_PRIORITY:
            stateCopy = {
                ...state,
            }
            // stateCopy[action.index].priority = action.priority
            return stateCopy

        default:
            return state
    }

}
export default issuesReducer
