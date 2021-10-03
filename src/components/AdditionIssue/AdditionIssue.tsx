import React from 'react';
import { useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { IIssue } from '../../interface';
import { RootState } from '../../store/store-redux';
import { TPopupIssueStatus } from '../../types';
import PoppapAddIssue from '../PopapAddIssue/PoppapAddIssue';
import s from './AdditionIssue.module.scss';
import cn from 'classnames';

interface IProps {
  btnAddStyle: string;
  btnAddText?: string;
}

const AdditionIssue = ({ btnAddStyle, btnAddText }: IProps) => {
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
      <button
        className={cn(btnAddStyle)}
        onClick={() => {
          setPopapActive(false);
          setissueStatus('create');
        }}
      >
        {btnAddText ? btnAddText : null}
        <HiOutlinePlus className={s.issuesAddIcon} />
      </button>

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
