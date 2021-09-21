import { connect } from 'react-redux';
import { updatePlayerOrMasterAC } from '../../store/playerOrMaster-redux';
import Main from './Main';

const mapStateToProps = (state: any) => ({
  state,
});
const mapDispatchToProps = (dispatch: (arg0: { type: string; value?: string | boolean; }) => void) => ({
  handleSubmit(value: string) {
    dispatch(updatePlayerOrMasterAC(value));
  },
});

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainContainer;
