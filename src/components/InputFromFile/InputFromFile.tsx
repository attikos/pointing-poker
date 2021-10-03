import React from 'react';
import cn from 'classnames';
import s from './InputFromFile.module.scss';
import api from '../../services/api';
import { HiOutlinePlus } from 'react-icons/hi';

const InputFromFile = () => {
  const [active, setActive] = React.useState(false);
  const [files, setFile] = React.useState<FileList | null>();

  const parseFile = async (text: any) => {
    if (typeof text === 'string') {
      const rows = text.split('\n');
      try {
        rows.forEach((item) => {
          const issue = item.split(';');
          issue[1] = issue[1].replace(' ', '');
          if (
            issue[1] === 'low' ||
            issue[1] === 'middle' ||
            issue[1] === 'high'
          ) {
            let link = '';
            if (issue.length > 2 && issue[2] !== '\n') link = issue[2];
            api.addIssue({
              title: issue[0],
              link: issue[2],
              priority: issue[1],
              isCurrent: false,
            });
          } else console.error('bad priority of issue: ', issue[0]);
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const createIssues = async () => {
    if (files !== undefined && files !== null) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        parseFile(reader.result);
      };
    }
  };


  const modalWindow = () => {
    if (active) {
      return (
        <div className={s.background} onClick={() => setActive(false)}> 
          <div className={s.modalWindow} onClick={(e) => e.stopPropagation()}>
              <div className={cn('modal-content', s.modalContent)}>
                <div className={cn('modal-header')}>
                  <h5 className={cn('modal-title')}>Add issues from file</h5>
                  <button type='button' className={cn('btn-close')} onClick={()=> setActive(false)} />
                </div>
                <div className={cn('modal-body')}>
                  Format data in file: <br />
                  <b>issueName;issuePriority[; issueLink]</b>
                  <br />
                  Example: <br />
                  develop header; high;
                  https://ru.reactjs.org/docs/hello-world.html; <br />
                  develop footer; middle; <br />
                  <b>
                    Priority - low/middle/high.
                    <br /> Issues separated by line break (\n) <br />
                    File format - .csv or .txt
                    <br />{' '}
                  </b>
                </div>
                <div className={cn('input-group mb-3')}>
                  <input
                    type={'file'}
                    className={cn('form-control')}
                    accept='.csv,.txt'
                    onChange={(e) => setFile(e.target.files)}
                  />
                   <button
                  className={cn('btn btn-primary')}
                  onClick={() => {
                    setActive(false);
                    createIssues();
                  }}
                >
                  Upload
                </button>
                </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <button
        className={cn('btn btn-primary')}
        onClick={() => setActive(true)}
      >
        Add from file
        <HiOutlinePlus className={s.issuesAddIcon} />
      </button>
      {modalWindow()}
    </div>
  );
};

export default InputFromFile;
