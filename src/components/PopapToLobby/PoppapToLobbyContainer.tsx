import { connect } from "react-redux";
import { updateUserAC } from "../../store/popapLobby-redux";
import PoppapToLobby from "./PoppapToLobby";
import { User } from "../../interface";

let mapStateToProps = (state: any) => {
    return {
        state
    }
}

let mapDispatchToProps = (
    dispatch: (arg0: { type: string; value: User }) => void,
    props: {
        setActive: (arg0: boolean) => void;
        history: string[];
    }
) => {
    return {
        handleSubmit(value: User) {
            dispatch(updateUserAC(value));
            props.setActive(true);
        },
        openTheLobby(id: string, status: string) {
            if (status === 'lobby') {
                props.history.push(`/${id}`)
            }
        },
        getIinitials(firstName: string, lastName: string) {
            if (firstName && lastName) {
                return firstName[0].toUpperCase() + lastName[0].toUpperCase()
            }
            if (firstName && !lastName) {
                return firstName[0].toUpperCase()
            }
            if (!firstName) {
                return ''
            }
            return ''
        }
    }
}

const PoppapToLobbyContainer = connect(mapStateToProps, mapDispatchToProps)(PoppapToLobby)

export default PoppapToLobbyContainer
