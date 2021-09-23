import { connect } from 'react-redux';
import Lobby from './Lobby';

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};
const mapDispatchToProps = (dispatch: (arg0: { type: string; value?: string | boolean; }) => void) => {
  return {
    getInitials(firstName: string, lastName: string) {
      if (firstName && lastName) {
        return (firstName[0].toUpperCase() + lastName[0].toUpperCase());
      }
      if (firstName && !lastName) {
        return (firstName[0].toUpperCase());
      }
      if (!firstName) {
        return '';
      }
    },
    isThisIssue(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      const element = e.currentTarget.id;
      console.log( 'isThisIssue:', element);
      return element;
    },
  };
};

const LobbyContainer = connect(mapStateToProps, mapDispatchToProps)(Lobby);

export default LobbyContainer;
