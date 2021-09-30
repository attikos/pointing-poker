import React from 'react';
import { useSelector } from 'react-redux';
import IssueCard from '../../components/IssueCard/IssueCard';
import StatisticCards from '../../components/Statistic/StatisticCards';
import { API_URL } from '../../env/development.env';
import { IIssue } from '../../interface';
import api from '../../services/api';
import { RootState } from '../../store/store-redux';
import s from './Results.module.scss';
import cn from 'classnames';

const Result = (): JSX.Element => {
  const issues = useSelector((state: RootState) => state.allData.issues);
  const arrayResults: any = {};

  const removeStatusCurrent = () => {
    const currentIssue = issues.find((item) => item.isCurrent);
    if (currentIssue !== undefined) {
      api.setIssueAsCurrent(currentIssue.id, false);
    }
  };

  removeStatusCurrent();

  const listResults = () => {
    return (
      <div className={s.listResults}>
        {issues.map((item) => (
          <div key={item.id}>
            <IssueCard issue={item} onSetIsCurrentIssue={() => null} />
            <StatisticCards
              idCurrentIssue={item.id}
              returnResult={(issueId: number, results: any) =>
                (arrayResults['issueId: ' + issueId] = results)
              }
            />
          </div>
        ))}
      </div>
    );
  };

  const downloadResults = () => {
    const blob = new Blob([JSON.stringify(arrayResults, null, 2)], {
      type: 'application/json',
    });
    const a = document.createElement('a');
    a.download = 'result.txt';
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className={s.resultWrapper}>
      <div className={s.topic}>
        {issues.map((item: IIssue) => `${item.title} `)}
      </div>
      <button
        className={cn('btn btn-secondary btn-lg h-25')}
        onClick={() => downloadResults()}
      >
        Save result
      </button>
      {listResults()}
    </div>
  );
};

export default Result;
