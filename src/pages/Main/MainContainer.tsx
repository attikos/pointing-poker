import { connect } from "react-redux";
import { updatePlayerOrMasterAC } from "../../store/playerOrMaster-redux";
import Main from "./Main";


let mapStateToProps = (state: any) => {
    return {
        state: state,
    }
}
let mapDispatchToProps = (dispatch: (arg0: { type: string; value?: string | boolean; }) => void ) => {
    return {
        validateID(value: string) {
            let error;
            if (!value) {
                error = 'Required';
            } else if (!/^[A-Z0-9]{6}$/i.test(value)) {
                error = 'Invalid ID';
            }
            return error;
        },
        handleSubmit(value: string) {
            dispatch(updatePlayerOrMasterAC(value))
           
        },
    }
}

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main)

export default MainContainer