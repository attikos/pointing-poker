import cn from 'classnames';
import React from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { IIssue } from '../../interface';
import s from './IssueCard.module.scss';

interface IProps {
  issue: IIssue;
  onSetIsCurrentIssue:any;
}
const IssueCard = ({ issue, onSetIsCurrentIssue }: IProps): JSX.Element => {
  return (
    <div
      className={ cn( s.issuesCard, { [s.issuesCardCurrent] : issue.isCurrent }) }
      onClick={() => onSetIsCurrentIssue()}
    >
      <div className={s.issuesInfo}>
        {issue.isCurrent ? (
          <div className={s.issueCurrent}>is current</div>
        ) : null}
        <div className={s.issuesInfoName}>{issue.title}</div>
        <div className={s.issuesPriority}>{issue.priority}</div>
      </div>
      <div className={s.issuesDel}>
        <HiOutlineTrash className={s.issuesDelIcon} />
      </div>
    </div>
  );
};

export default IssueCard;
