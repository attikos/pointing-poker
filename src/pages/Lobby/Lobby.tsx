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


interface Props {
  userRole: string;
}

const Lobby = ({ userRole }: Props): JSX.Element => {
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
  const id = useSelector((state: RootStateOrAny) => state.allData.game.niceId);

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
<<<<<<< HEAD
  const onStopGame = () => {
    api.stopGame();
  }
    const isThisIssue = (issueId: number) => {
      return issues.find(((e: IIssue[], i: number) => e[i].id = issueId));
    };

    const handleCopy = () => {
      if (textInput.current) {
        textInput.current.select();
        document.execCommand('copy');
      }
    };
=======
  const isThisIssue = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    return e.currentTarget.id;
  };
>>>>>>> 6cca53b (fix editIssue)

    const onLeaveGame = () => {
      api.leaveGame();
    };

    const onStartGame = () => {
      api.startGame();
    };

<<<<<<< HEAD
    const onDeleteIssue = (issueId: string) => {
      api.deleteIssue(issueId);
    };

    return (
      <div className={s.settings}>
        <div className={s.settingsTop}>
          <div className={s.topic}>
            <div className={s.inputTopic}>
              {issues.map((item: IIssue) => `${item.title} `)}
=======
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
          {(userRole === 'master') ? (<div className={s.scramMasterCard} >
            <div className={s.noFoto}>
              {getInitials(user.firstName, user.lastName)}
>>>>>>> 6cca53b (fix editIssue)
            </div>
            <div className={s.iconPencil}>
            </div>
          </div>
          <div className={s.scramMaster}>
            <h6>Scram master:</h6>
            {(userRole === 'master') ? (<div className={s.scramMasterCard} >
              <div className={s.noFoto}>
                {getInitials(user.firstName, user.lastName)}
              </div>
              <div className={s.scramMasterInfo}>
                <div>It&apos;s you:</div>
                <div className={s.scramMasterInfoName}>
                  {user.firstName}
                  {' '}
                  {user.lastName}
                </div>
                <div>{user.job}</div>
              </div>
            </div>) :
              (members.map((item: IUser, i: number) => {
                if (item.isDiller) {
                  return (
                    <div className={s.scramMasterCard} key={i}>
                      <div className={s.noFoto}>
                        {getInitials(item.firstName, item.lastName)}
                      </div>
                      <div className={s.scramMasterInfo}>
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
              })
              )}
          </div>
        </div>

<<<<<<< HEAD
        {(user.isDiller)
          ? (
            <div className={s.settingsLinks}>
              <div className={s.linkLobby}>
                <h3>
                  <i><b>Lobby ID:</b></i>
                </h3>
                <div className={s.copyLinkLobby}>
                  <input className={s.inputLinkLobby} type='text' ref={textInput} value={`http://localhost/${id}`} readOnly />
                  <button className={cn('btn btn-secondary btn-lg')} onClick={handleCopy}>Copy</button>
                </div>
              </div>
              <div className={s.settingsTopButtons}>
                <button className={cn('btn btn-secondary btn-lg')} onClick={api.startGame}>StartGame</button>
                <button className={cn('btn btn-outline-secondary btn-lg')} onClick={api.stopGame}>Cancel</button>
=======
      {(userRole === 'master')
        ? (
          <div className={s.settingsLinks}>
            <div className={s.linkLobby}>
              <h3>
                {' '}
                <i><b>Link to lobby:</b></i>
              </h3>
              <div className={s.copyLinkLobby}>
                <input className={s.inputLinkLobby} type='text' ref={textInput} value={`http://localhost/${id}`} readOnly />
                <button className={cn('btn btn-secondary btn-lg')} onClick={handleCopy}>Copy</button>
>>>>>>> 6cca53b (fix editIssue)
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
            firstName, isDiller, isObserver, job, lastName, niceId,
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

<<<<<<< HEAD
              <div className={s.memberDelete} onClick={() => (niceId) ? deleteMember(niceId) : null}>
                <HiBan className={s.iconDel} />
              </div>
=======
            <div className={s.memberDelete} onClick={() => (niceId && userRole === 'master') ? deleteMember(niceId) : null}>
              <HiBan className={s.iconDel} />
>>>>>>> e2eab37 (add: setAsObserver)
            </div>
<<<<<<< HEAD
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
                        onClick={() => {
                          const newPriority = `${issues[+isThisIssue(item.id)].priority}` as TIssuePriority;

                          setPopapActive(false); setissueStatus('edit');
                          setIndexIssue(isThisIssue(item.id));
                          setDataIssue({
                            title: `${issues[+isThisIssue(item.id)].title}`,
                            link: `${issues[+isThisIssue(item.id)].link}`,
                            priority: newPriority,
                            isCurrent: false,
                          });
                        }}
                      >
                        <HiPencil className={s.issuesChangeIcon} />
                      </div>
                      <div className={s.issuesDel} onClick={() => onDeleteIssue(isThisIssue(item.id))}>
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
=======
          </div>
        ))}
      </div>
      {
        (userRole === 'master')
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
                      onClick={() => api.deleteIssue(`${item.id}`)}>
                      <HiOutlineTrash className={s.issuesDelIcon} />
>>>>>>> 6cca53b (fix editIssue)
                    </div>
                  </div>
                </div>
<<<<<<< HEAD
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
=======
                <div className={s.settingsGameItem}>
                  <div className="form-check form-switch">
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                      Scram master as player
                    </label>
                    <input type="checkbox" className="form-check-input" id="flexSwitchCheckDefault" onChange={(e)=>{api.setAsObserver(!e.target.checked);}}/>
>>>>>>> e2eab37 (add: setAsObserver)
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
