import s from './IssueCard.module.scss';
import { IIssues } from '../../interface';
import { HiOutlineTrash } from 'react-icons/hi';

const IssueCard = (props: { issue: IIssues }) => {
  return (
    <div className={s.issuesCard}>
      <div className={s.issuesInfo}>
      {props.issue.is_current ? <div className={s.issueCurrent}>is current</div> : null}
        <div className={s.issuesInfoName}>{props.issue.title}</div>
        <div className={s.issuesPriority}>{props.issue.priority}</div>
      </div>
      <div className={s.issuesDel}>
        <HiOutlineTrash className={s.issuesDelIcon} />
      </div>
    </div>
  );
};

export default IssueCard;
