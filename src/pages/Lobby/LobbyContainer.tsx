import { connect } from "react-redux";
import Lobby from "./Lobby";


let mapStateToProps = (state: any) => {
    return {
        state: state,
    }
}
let mapDispatchToProps = (dispatch: (arg0: { type: string; value?: string | boolean; }) => void) => {
    return {

    }
}

const LobbyContainer = connect(mapStateToProps, mapDispatchToProps)(Lobby)

export default LobbyContainer
