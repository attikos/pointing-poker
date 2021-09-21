const UPDATE_PLAYER_OR_MASTER = 'UPDATE_PLAYER_OR_MASTER'

let init = {
    playerOrMaster: '',
}
export const updatePlayerOrMasterAC = (value: string) => {
    return {
        type: UPDATE_PLAYER_OR_MASTER,
        value,
    }
}
const updatePlayerOrMasterReducer = (state: {
    playerOrMaster: string,
} = init,
    action: {
        type: string;
        value: string
    }) => {
    let stateCopy
    switch (action.type) {
        case UPDATE_PLAYER_OR_MASTER:
            stateCopy = {
                ...state,
                playerOrMaster: action.value
            }
            return stateCopy
        default:
            return state
    }

}
export default updatePlayerOrMasterReducer
