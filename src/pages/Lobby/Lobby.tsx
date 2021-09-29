import React, { useState } from 'react';
import cn from 'classnames';
import {
  HiBan, HiOutlinePlus, HiOutlineTrash, HiPencil,
} from 'react-icons/hi';
import { AiOutlineEye } from 'react-icons/ai';
import s from './Lobby.module.scss';
import { IIssue, ICreateIssue, IUser } from '../../interface';
import { TIssuePriority, TPopupIssueStatus } from '../../types';
import { RootStateOrAny, useSelector } from 'react-redux';
import PoppapAddIssue from '../../components/PopapAddIssue/PoppapAddIssue';
import api from '../../services/api';

const Lobby = (): JSX.Element => {
  const [popapActive, setPopapActive] = useState(true);
  const [issueStatus, setissueStatus] = useState<TPopupIssueStatus>('create');
  const [indexIssue, setIndexIssue] = useState('');
  const [dataIssue, setDataIssue] = useState<ICreateIssue>({
    title: '',
    link: '',
    priority: 'middle',
    isCurrent: false,
  });
  const issues = useSelector((state: RootStateOrAny) => state.allData.issues);
  const members = useSelector((state: RootStateOrAny) => state.allData.members);
  const niceId = useSelector((state: RootStateOrAny) => state.allData.game.niceId);
  const user = useSelector((state: RootStateOrAny) => state.userData);

  const getInitials = (firstName: string, lastName: string) => {
    if (firstName && lastName) {
      return (firstName[0].toUpperCase() + lastName[0].toUpperCase());
    }
    if (firstName && !lastName) {
      return (firstName[0].toUpperCase());
    }
    if (!firstName) {
      return '';
    }
  };

  const isThisIssue = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    return e.currentTarget.id;
  };

  const onStopGame = () => {
    api.stopGame();
  };

  const onLeaveGame = () => {
    api.leaveGame();
  };

  const onStartGame = () => {
    api.startGame();
  };

  const onDeleteIssue = (issueId:string) => {
    api.deleteIssue(issueId);
  };

  return (
    <div className={s.settings}>
      <div className={s.settingsTop}>
        <div className={s.topic}>
          <div className={s.inputTopic}>

            {issues.map((item: IIssue) => `${item.title} `)}
          </div>
          <div className={s.iconPencil}>
          </div>
        </div>
        <div className={s.scramMaster}>
          <h6>Scram master:</h6>
          {members.map((item: IUser, i: number) => {
            if (item.isDiller) {
              return (
                <div className={s.scramMasterCard} key={i}>
                  <div className={s.noFoto}>
                    {getInitials(item.firstName, item.lastName)}
                  </div>
                  <div className={s.scramMasterInfo}>
                    {(user.isDiller) ? (<div>It&apos;s you:</div>) : null}
                    <div className={s.scramMasterInfoName}>
                      {item.firstName}
                      {' '}
                      {item.lastName}
                    </div>
                    <div>{item.job}</div>
                  </div>
                </div>
              );
            } return null;
          })}
        </div>
      </div>

      {(user.isDiller)
        ? (
          <div className={s.settingsLinks}>
            <div className={s.linkLobby}>
              <h3>
                <i><b>Lobby ID:</b></i>
              </h3>
              <div className={s.copyLinkLobby}>
                <div className={s.inputLinkLobby}>{niceId}</div>
                <button className={cn('btn btn-secondary btn-lg')}>Copy</button>
              </div>
            </div>
            <div className={s.settingsTopButtons}>
              <button className={cn('btn btn-secondary btn-lg')} onClick={onStartGame}>Start game</button>
              <button className={cn('btn btn-outline-secondary btn-lg')} onClick={onStopGame}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className={s.settingsPlayer}>
            <div className={s.settingsTopButtons}>
              <button className={cn('btn btn-outline-secondary btn-lg')} onClick={onLeaveGame}>Exit</button>
            </div>
          </div>
        )}
      <div className={s.settingsMembers}>
        <div className={s.memberTitle}> Members:</div>
        {members.map(({
          firstName, isDiller, isObserver, job, lastName,
        }: IUser, i: number) => (
          <div
            className={cn(s.memberCard,
              { [s.isObserverCard]: (!isDiller && isObserver) })}
            key={i}
          >
            <div className={s.noFoto}>
              {getInitials(firstName, lastName)}
            </div>
            <div className={s.memberInfo}>
              {(!isDiller && isObserver) ? (<div className={s.isObserver}><AiOutlineEye className={s.isObserverIcon} /></div>) : null}
              <div className={s.memberInfoName}>
                {firstName}
                {' '}
                {lastName}
              </div>
              <div>{job}</div>
            </div>
            <div className={s.memberDelete}>
              <HiBan className={s.iconDel} />
            </div>
          </div>
        ))}
      </div>
      {
        (user.isDiller)
          ? (
            <div>
              <div className={s.settingsIssues}>
                <div className={s.issuesTitle}>
                  Issues:
                </div>
                {issues.map((item: IIssue, i: number) => (
                  <div className={s.issuesCard} key={i}>
                    <div className={s.issuesInfo}>
                      <div className={s.issuesInfoName}>{item.title}</div>
                      <div className={s.issuesPriority}>{item.priority}</div>
                    </div>
                    <div
                      className={s.issuesChange}
                      id={`${i}`}
                      onClick={(e) => {
                        const newPriority = `${issues[+isThisIssue(e)].priority}` as TIssuePriority;

                        setPopapActive(false); setissueStatus('edit');
                        setIndexIssue(isThisIssue(e));
                        setDataIssue({
                          title: `${issues[+isThisIssue(e)].title}`,
                          link: `${issues[+isThisIssue(e)].link}`,
                          priority: newPriority,
                          isCurrent: false,
                        });
                      }}
                    >
                      <HiPencil className={s.issuesChangeIcon} />
                    </div>
                    <div className={s.issuesDel} onClick={(e) => onDeleteIssue(isThisIssue(e))}>
                      <HiOutlineTrash className={s.issuesDelIcon} />
                    </div>
                  </div>
                ))}
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
              </div>
              <div className={s.settingsGame}>
                <div className={s.gameTitle}>
                  Game settings:
                </div>
                <div className={s.settingsGameItem}>
                  <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                      Scram master as player
                    </label>
                    <input type="checkbox" className="form-check-input" id="flexSwitchCheckDefault" />
                  </div>
                </div>

              </div>
            </div>
          ) : null
      }
      <PoppapAddIssue
        active={popapActive}
        status={issueStatus}
        setActive={setPopapActive}
        element={dataIssue}
        editElement={setDataIssue}
        index={+indexIssue}
      />
    </div>

  );
};
export default Lobby;
