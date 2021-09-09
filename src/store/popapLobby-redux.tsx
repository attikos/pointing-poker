// const UPDATE_FIRSTNAME = 'UPDATE_FIRSTNAME'
// const UPDATE_LASTNAME = 'UPDATE_LASTNAME'
// const UPDATE_JOB = 'UPDATE_JOB'
// const UPDATE_ISOBSERVER = 'UPDATE_ISOBSERVER'
// const UPDATE_FOTO = 'UPDATE_FOTO'
const UPDATE_DATA = 'UPDATE_DATA'

let init = {
    isObserver: false,
    firstName: '',
    lastName: '',
    job: '',
    foto: '',

}
export const updateDataAC = (value: any) => {
    return {
        type: UPDATE_DATA,
        value: value
    }
}
const popapLobbyReducer = (state: {
    isObserver: boolean,
    firstName: string,
    lastName: string,
    job: string,
    foto: string,
} = init,
    action: {
        type: string;
        value: {
            isObserver: boolean,
            firstName: string,
            lastName: string,
            job: string,
            foto: string,
        }
    }) => {
    let stateCopy
    switch (action.type) {
        case UPDATE_DATA:
            stateCopy = {
                // ...state,
                ...action.value

            }

            return stateCopy
        default:
            return state
    }

}
export default popapLobbyReducer