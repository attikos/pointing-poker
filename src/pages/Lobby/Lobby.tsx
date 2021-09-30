import React, { useRef, useState } from 'react';
import cn from 'classnames';
import {
  HiBan, HiOutlinePlus, HiOutlineTrash, HiPencil,
} from 'react-icons/hi';
import { AiOutlineEye } from 'react-icons/ai';
import s from './Lobby.module.scss';
import { IIssue, IUser } from '../../interface';
import { TIssuePriority, TIssueStatus, TPopupIssueStatus } from '../../types';
import { RootStateOrAny, useSelector } from 'react-redux';
import api from '../../services/api';
import PoppapAddIssue from '../../components/PopapAddIssue/PoppapAddIssue';

const Lobby = (): JSX.Element => {
  const textInput = useRef<HTMLInputElement>(null);
  const [popapActive, setPopapActive] = useState(true);
  const [issueStatus, setissueStatus] = useState<TPopupIssueStatus>('create');
  const [indexIssue, setIndexIssue] = useState('');
  const [dataIssue, setDataIssue] = useState<IIssue>({
    title: '',
    link: '',
    priority: 'middle',
    isCurrent: false,
    id: +'',
    status: 'new',
  });

  const user = useSelector((state: RootStateOrAny) => state.userData);
  const issues = useSelector((state: RootStateOrAny) => state.allData.issues);
  const members = useSelector((state: RootStateOrAny) => state.allData.members);
  const gameNiceId = useSelector((state: RootStateOrAny) => state.allData.game.niceId);

  const deleteMember = (i: string) => {
    api.deleteUser(i);
  };

  const getInitials = (firstName: string, lastName: string) => {
    if (firstName && lastName) {
      return firstName[0].toUpperCase() + lastName[0].toUpperCase();
    }
    if (firstName && !lastName) {
      return firstName[0].toUpperCase();
    }
    if (!firstName) {
      return '';
    }
    return '';
  };

  // const isThisIssue = (issueId: number) => {
  //   return issues.find(((e: IIssue[], i: number) => e[i].id = issueId));
  // };
  const isThisIssue = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    return e.currentTarget.id;
  };

  const handleCopy = () => {
    if (textInput.current) {
      textInput.current.select();
      document.execCommand('copy');
    }
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

  const onDeleteIssue = (issueId: number) => {
    api.deleteIssue(issueId);
  };

  const editIssue = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const newPriority = `${issues[+isThisIssue(e)].priority}` as TIssuePriority;
    const newStatus = `${issues[+isThisIssue(e)].status}` as TIssueStatus;

    setPopapActive(false); setissueStatus('edit');
    setIndexIssue(isThisIssue(e));
    setDataIssue({
      title: `${issues[+isThisIssue(e)].title}`,
      link: `${issues[+isThisIssue(e)].link}`,
      priority: newPriority,
      isCurrent: false,
      status: newStatus,
      id: +`${issues[+isThisIssue(e)].id}`,
    });
  };

  const findDiller = () => {
    return members.find((item: IUser, i: number) => item.isDiller);
  };

  const diller = findDiller();


  return (
    <div className={s.settings}>
      <div className={s.settingsTop}>
        <div className={s.topic}>
          <div className={s.inputTopic}>
            {issues.map((item: IIssue) => `${item.title}; `)}
          </div>
        </div>

        <div className={s.scramMaster}>
          <h6>Scram master:</h6>
            <div className={s.scramMasterCard} >
              <div className={s.noFoto}>
                {getInitials(diller.firstName, diller.lastName)}
              </div>

              <div className={s.scramMasterInfo}>
                { user.isDiller && <div>It&apos;s you:</div> }

                <div className={s.scramMasterInfoName}>
                  {diller.firstName} {diller.lastName}
                </div>

                <div>{diller.job}</div>
              </div>
            </div>
        </div>
      </div>

      {(user.isDiller)
        ? (
          <div className="row">
            <div className={cn('col-6', s.linkLobby)}>
              <h3>
                <i><b>Link to lobby:</b></i>
              </h3>

              <div className="input-group mb-3 w-50">
                <input
                  name="gameNiceId"
                  type="text"
                  value={gameNiceId}
                  className={cn('form-control', s.inputLinkLobby)}
                  readOnly
                  ref={textInput}
                />
                <button
                  className={cn('btn btn-secondary btn-lg')}
                  onClick={handleCopy}
                >
                  Copy
                </button>
              </div>
            </div>

            <div className={cn('col-6 align-self-end', s.linkLobby)}>
              <div className={cn('w-50 ms-auto', s.settingsTopButtons)}>
                <button className={cn('btn btn-secondary btn-lg')} onClick={onStartGame}>Start game</button>
                <button className={cn('btn btn-outline-secondary btn-lg')} onClick={onStopGame}>Cancel</button>
              </div>
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

            <div className={s.memberDelete} onClick={() => (members[i].id && user.isDiller) ? deleteMember(members[i].id) : null}>
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
                    <div className={s.issuesChange}
                      id={`${i}`}
                      onClick={(e) => editIssue(e)}>
                      <HiPencil className={s.issuesChangeIcon} />
                    </div>
                    <div className={s.issuesDel}
                      onClick={() => onDeleteIssue(item.id)}>
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

                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="flexSwitchCheckDefault"
                      checked={!user.isObserver}
                      onChange={(e) => { api.setAsObserver(!e.target.checked); }}
                    />
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
