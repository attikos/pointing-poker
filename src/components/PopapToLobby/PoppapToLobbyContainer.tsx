import { connect } from "react-redux";
import { updateUserAC } from "../../store/popapLobby-redux";
import { updateAllData } from "../../store/all-data-redux";
import PoppapToLobby from "./PoppapToLobby";
import { User, TGameNiceId, IGame, IServerData } from "../../interface";
import api from '../../services/api';
import {websocket} from '../../services/socket';

let mapStateToProps = (state: any) => {
    return { state }
}

let mapDispatchToProps = (
    dispatch: (arg0: { type: string; value: Object }) => void,
    props: {
        setActive: (arg0: boolean) => void;
        history: string[];
    }
) => {
    const routerHandler = (history: string[], { game } : { game : IGame }) => {
        console.log('routerHandler')
        console.log('game', game)
        if (game.status === 'lobby' || game.status === 'game') {
            history.push(`/${game.niceId}`)
        }
        else {
            history.push(`/`)
        }
    }

    return {
        async handleSubmit(values: { user: User, gameNiceId: TGameNiceId }) {
            // dispatch(updateUserAC(values.user))
            // props.setActive(true);

            const success = await api.newGame(values);
            if ( success ) {
                await websocket.connect();
                websocket.subscription?.on('all-data', (data:IServerData) => {
                    console.log('!!!! all-data', data)
                    dispatch(updateAllData(data));
                    routerHandler(props.history, data);
                });
                websocket.emit('getAllData');
            }
        },
        openTheLobby(id: TGameNiceId, status: string) {
            console.log('openTheLobby')
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
