import cn from 'classnames';
import React from 'react';
import { HiCheck, HiOutlineTrash } from 'react-icons/hi';
import { IIssue } from '../../interface';
import s from './IssueCard.module.scss';

interface IProps {
  issue: IIssue;
  onSetIsCurrentIssue?: any;
  onDeleteIssue?: any;
  isDiller?: boolean;
}
const IssueCard = ({
  issue,
  onSetIsCurrentIssue = () => {},
  onDeleteIssue,
  isDiller,
}: IProps): JSX.Element => {
  return (
    <div
      className={cn(
        s.issuesCard,
        { [s.issuesCardCurrent]: issue.isCurrent },
        { [s.issueHover]: isDiller })}
      onClick={() => onSetIsCurrentIssue()}
    >
      <div className={s.issuesInfo}>
        <div className={s.issuesInfoName}>{issue.title}</div>
        <div className={s.issuesPriority}>{issue.priority}</div>
      </div>
      {issue.status === 'finished' ? <HiCheck /> : null}
      {onDeleteIssue ? (
        <div className={s.issuesDel} onClick={() => onDeleteIssue(issue.id)}>
          <HiOutlineTrash className={s.issuesDelIcon} />
        </div>
      ) : null}
    </div>
  );
};

export default IssueCard;
