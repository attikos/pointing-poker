import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import IssueCard from '../../components/IssueCard/IssueCard';
import StatisticCards from '../../components/Statistic/StatisticCards';
import { IIssue } from '../../interface';
import api from '../../services/api';
import { RootState } from '../../store/store-redux';
import s from './Results.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { array } from 'yup';
import { split } from 'lodash';

const NUMBER_OF_COLUMNS = 3;

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

  const issueForSave = (issueId: number) => {
    const curIssue = issues.find((item) => item.id === issueId);
    const link = curIssue?.link ? ', link: ' + curIssue?.link : '';
    return (
      'issue: ' + curIssue?.title + ', priority: ' + curIssue?.priority + link
    );
  };

  const listResults = () => {
    return (
      <div className={s.listResults}>
        {issues.map((item) => (
          <div key={item.id}>
            <IssueCard issue={item} onSetIsCurrentIssue={() => null} />
            <StatisticCards
              idCurrentIssue={item.id}
              returnResult={(issueId: number, results: any) =>
                (arrayResults[issueForSave(issueId)] = results)
              }
            />
          </div>
        ))}
      </div>
    );
  };

  const parsStr = (key: string) => {
    return key.split(',');
  };

  const parsObj = (obj: any) => {
    let str = '';
    for (const key in obj) {
      str = `${str} (${key}:${obj[key]}) `;
    }
    return str;
  };

  

  const downloadResults = () => {
    const data: any = [
      ['issue', 'priority', 'link', 'result(score:voices)', '\r\n'],
    ];
    for (const key in arrayResults) {
      const arr = parsStr(key).map((item) => item.split(':')[1]);
      if (arr.length !== NUMBER_OF_COLUMNS) arr.push('-');
      data.push([
        arr,
        parsObj(arrayResults[key]),
        '\r\n',
      ]);
    }
    const blob = new Blob(data, {
      type: 'text/csv;charset=utf-8',
    });
    const a = document.createElement('a');
    a.download = 'result.csv';
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className={s.resultWrapper}>
      <div className={s.topic}>
        {issues.map((item: IIssue) => item.title.slice(0, 10)).join(', ')}
      </div>
      <div className={s.attention}>
        ATTENTION! For view results in Excel: click the Data tab, then From
        Text. Select the CSV file that has the data clustered into one column.
        Select Delimited, then make sure the File Origin is Unicode UTF-8.
        Select Comma. Finally, click Finish.
      </div>
      <div className={s.controlBtn}>
        <Link to='/'>
          <button className={cn('btn btn-secondary btn-lg')}>
            One more game
          </button>
        </Link>
        <button
          className={cn('btn btn-secondary btn-lg')}
          onClick={() => downloadResults()}
        >
          Save result
        </button>
      </div>
      {listResults()}
    </div>
  );
};

export default Result;
