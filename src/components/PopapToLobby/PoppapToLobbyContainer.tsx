import { connect } from "react-redux";
import { updateUserAC } from "../../store/popapLobby-redux";
import PoppapToLobby from "./PoppapToLobby";

let mapStateToProps = (state: any) => {
    console.log('mapStateToProps', state)
    return {
        state: state,
    }
}

let mapDispatchToProps = (dispatch: (arg0: { type: string; value?: string | boolean; }) => void) => {
    return {
        handleSubmit(values: {
            isObserver: boolean,
            firstName: string,
            lastName: string,
            job: string,
            foto: string,
        }) {
            dispatch(updateUserAC(values))
        },
        getIinitials(firstName: string, lastName: string) {
            if (firstName && lastName){
                return (firstName[0].toUpperCase() + lastName[0].toUpperCase())
            }
            if(firstName && !lastName){
                return (firstName[0].toUpperCase())   
            }
            if (!firstName){
                return ""
            }
        }
    }
}

const PoppapToLobbyContainer = connect(mapStateToProps, mapDispatchToProps)(PoppapToLobby)

export default PoppapToLobbyContainer
