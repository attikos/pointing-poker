import { connect } from "react-redux";
// import { editIssueTitleAC } from "../../store/issues-redux";
import PoppapAddIssue from "./PoppapAddIssue";

let mapStateToProps = (state: any) => {
    console.log('mapStateToProps', state)
    return {
        state: state,
    }
}

let mapDispatchToProps = (dispatch: (arg0: { type: string; value?: string | boolean; }) => void) => {
    return {
        updateTitle(e: React.ChangeEvent<HTMLSelectElement>) {
            // let value = e.currentTarget.value
            // let index = +e.currentTarget.id
        //     dispatch(editIssueTitleAC(value, index))
        },
        updateLink(e: React.ChangeEvent<HTMLSelectElement>) {
            let value = e.currentTarget.value
            return value
        },
        updatePriority(e: React.ChangeEvent<HTMLSelectElement>) {
            let value = e.currentTarget.value
            return value
        },
        createNewIssue() {

        },
        updateIssues() {

        }


    }
}
const PoppapAddIssueContainer = connect(mapStateToProps, mapDispatchToProps)(PoppapAddIssue)

export default PoppapAddIssueContainer
