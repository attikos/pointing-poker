import { connect } from "react-redux";
import { IIssues } from "../../interface";
import { addIssueAC, updateIssuesAC } from "../../store/issues-redux";
import PoppapAddIssue from "./PoppapAddIssue";

let mapStateToProps = (state: any) => {
    return {
        state: state,
    }
}

let mapDispatchToProps = (dispatch: (arg0: { type: string; data?: { title: string; link: string; priority: string; }; value?: IIssues; index?: number; }) => void)  => {
    return {
        createNewIssue(element: IIssues) {
            console.log('createNewIssue', element )
            dispatch(addIssueAC(element))
        },
        updateIssues(element: IIssues, index: number) {
            dispatch(updateIssuesAC(element, index))
        }
    }
}
const PoppapAddIssueContainer = connect(mapStateToProps, mapDispatchToProps)(PoppapAddIssue)

export default PoppapAddIssueContainer
