import React from 'react';
import cn from 'classnames';
import { HiOutlineTrash } from 'react-icons/hi';
import { IIssue } from '../../interface';
import { shortText } from '../../utils/short-text';
import s from './IssueCard.module.scss';

interface IProps {
  issue: IIssue;
  average?: string;
  onSetIsCurrentIssue?: any;
  onDeleteIssue?: any;
  isDiller?: boolean;
}

const IssueCard = ({
  issue,
  average,
  onSetIsCurrentIssue = () => {},
  onDeleteIssue,
  isDiller,
}: IProps): JSX.Element => {
  const returnAverage = () => {
    if (average !== undefined)
      return <div className={s.average}>{average}</div>;
    return null;
  };

  return (
    <div
      className={cn(
        s.issuesCard,
        { [s.issuesCardCurrent]: issue.isCurrent },
        { [s.issueHover]: isDiller })}
      onClick={() => onSetIsCurrentIssue()}
    >
      {returnAverage()}
      <div className={s.issuesInfo}>
        <div className={s.issuesInfoName} title={issue.title}>{shortText(issue.title, 20)}</div>
        <div className={s.issuesPriority}>{issue.priority}</div>
      </div>
      {/*issue.status === 'finished' ? <HiCheck /> : null*/}
      {onDeleteIssue ? (
        <div className={s.issuesDel} onClick={() => onDeleteIssue(issue.id)}>
          <HiOutlineTrash className={s.issuesDelIcon} />
        </div>
      ) : null}
    </div>
  );
};

export default IssueCard;
