import React from 'react';
import { useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { ICreateIssue, IIssue } from '../../interface';
import { RootState } from '../../store/store-redux';
import { TPopupIssueStatus } from '../../types';
import PoppapAddIssue from '../PopapAddIssue/PoppapAddIssue';
import s from './AdditionIssue.module.scss';

const AdditionIssue = () => {
  const [popapActive, setPopapActive] = useState(true);
  const [issueStatus, setissueStatus] = useState<TPopupIssueStatus>('create');
  const [dataIssue, setDataIssue] = useState<IIssue>({
    title: '',
    link: '',
    priority: 'middle',
    isCurrent: false,
    id: +'',
    status: 'new',
  });
  const issues = useSelector((state: RootState) => state.allData.issues);
  return (
    <div>
      <div
        className={s.issuesCardAdd}
        onClick={() => {
          setPopapActive(false);
          setissueStatus('create');
        }}
      >
        <div className={s.issuesCardAddTitle}>Create new Issue</div>

        <div className={s.issuesAdd}>
          <HiOutlinePlus className={s.issuesAddIcon} />
        </div>
      </div>
      <PoppapAddIssue
        active={popapActive}
        status={issueStatus}
        setActive={setPopapActive}
        element={dataIssue}
        editElement={setDataIssue}
        index={issues.length}
      />
    </div>
  );
};

export default AdditionIssue;
