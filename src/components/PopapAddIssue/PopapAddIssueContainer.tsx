import { connect } from "react-redux";
import PoppapAddIssue from "./PoppapAddIssue";

let mapStateToProps = (state: any) => {
    console.log('mapStateToProps', state)
    return {
        state: state,
    }
}

let mapDispatchToProps = (dispatch: (arg0: { type: string; value?: string | boolean; }) => void) => {
    return {

    }
}

const PoppapAddIssueContainer = connect(mapStateToProps, mapDispatchToProps)(PoppapAddIssue)

export default PoppapAddIssueContainer

