import React from 'react';
import { useSelector } from 'react-redux';
import IssueCard from '../../components/IssueCard/IssueCard';
import StatisticCards from '../../components/Statistic/StatisticCards';
import { IIssue } from '../../interface';
import api from '../../services/api';
import { RootState } from '../../store/store-redux';
import s from './Results.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { HiDocumentDownload, HiRefresh } from 'react-icons/hi';

const NUMBER_OF_COLUMNS = 3;

const Result = (): JSX.Element => {
  const issues = useSelector((state: RootState) => state.allData.issues);
  const arrayResults: { [TScore: string]: number } = {};

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
              returnResult={(issueId: number, results: number) =>
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

  const parsObj = (obj: any):string => {
    let str = '';
    for (const key in obj) {
      str = `${str} (${key}:${obj[key]}) `;
    }
    return str;
  };

  const downloadResults = () => {
    let data = 'issue; priority; link; result(score:voices)\r\n';

    for (const key in arrayResults) {
      let numberColumns = 1;
      let arr: string = parsStr(key).reduce((accumulator, item) => {
        numberColumns++;
        return `${accumulator};${item.split(':')[1]}`;
      });
      arr = arr.split(':')[1]; // because string 'issue: name; priority; link', but need 'name; priority; link'
      if (numberColumns !== NUMBER_OF_COLUMNS) arr = arr + ';-'; //because link optional
      data = data + `${arr};${parsObj(arrayResults[key])}\r\n`;
    }

    const blob = new Blob([decodeURIComponent('%EF%BB%BF') + data], {
      type: 'text/csv;charset=UTF-8;',
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

      <div className='alert alert-success'>
        <strong>ATTENTION!</strong>
        <br />
        For view results in Excel: click the Data tab, then From Text. Select
        the CSV file that has the data clustered into one column. Select
        Delimited, then make sure the File Origin is Unicode UTF-8. Select
        semicolon(;). Finally, click Finish.
      </div>

      <div className={cn('my-4', s.controlBtn)}>
        <button
          className={cn('btn btn-secondary me-3')}
          onClick={() => downloadResults()}
        >
          Save result
          <HiDocumentDownload className='ms-1 fs-5' />
        </button>

        <Link to='/'>
          <button className={cn('btn btn-outline-primary')}>
            One more game
            <HiRefresh className='ms-1 fs-5' />
          </button>
        </Link>
      </div>

      {listResults()}
    </div>
  );
};

export default Result;
