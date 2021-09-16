import { connect } from "react-redux";
import { updateUserAC } from "../../store/popapLobby-redux";
import PoppapToLobby from "./PoppapToLobby";
import { User, TGameNiceId } from "../../interface";
import api from '../../services/api';
import {websocket} from '../../services/socket';

let mapStateToProps = (state: any) => {
    return { state }
}

let mapDispatchToProps = (
    dispatch: (arg0: { type: string; value: User }) => void,
    props: {
        setActive: (arg0: boolean) => void;
        history: string[];
    }
) => {
    return {
        async handleSubmit(values: { user: User, gameNiceId: TGameNiceId }) {
            dispatch(updateUserAC(values.user))
            // props.setActive(true);

            const success = await api.newGame(values);
            if ( success ) {
                await websocket.connect();
                websocket.on('allData', (data:any) => console.log('!!!! ALL-DATA', data) );
                websocket.emit('getAllData');
            }
        },
        openTheLobby(id: TGameNiceId, status: string) {
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
