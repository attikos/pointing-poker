import React, { useState } from 'react';
import cn from 'classnames';
import {
  HiBan, HiOutlinePlus, HiOutlineTrash, HiPencil,
} from 'react-icons/hi';
import { AiOutlineEye } from 'react-icons/ai';
import s from './Lobby.module.scss';
import { IIssues, IMembers } from '../../interface';
import { RootStateOrAny, useSelector } from 'react-redux';
import PoppapAddIssue from '../../components/PopapAddIssue/PoppapAddIssue';

interface Props {
  userRole: string;
}
const Lobby = ({ userRole }: Props): JSX.Element => {
  
  const [popapActive, setPopapActive] = useState(true);
  const [createOrEditIssue, setCreateOrEditIssue] = useState('');
  const [indexIssue, setIndexIssue] = useState('');
  const [dataIssue, setDataIssue] = useState({
    title: '',
    link: '',
    priority: '',
    nice_id: '',
    is_current: false,
  });

  const issues = useSelector((state: RootStateOrAny) => state.issues);
  const members = useSelector((state: RootStateOrAny) => state.members);
  const game = useSelector((state: RootStateOrAny) => state.game);

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
    const element = e.currentTarget.id;
    return element;
  };

  return (
    <div className={s.settings}>
      <div className={s.settingsTop}>
        <div className={s.topic}>
          <div className={s.inputTopic}>

            {issues.map((item: IIssues) => `${item.title} `)}
          </div>
          <div className={s.iconPencil}>
            {/* <HiPencil className={s.issuesChangeIcon} /> */}
          </div>
        </div>
        <div className={s.scramMaster}>
          <h6>Scram master:</h6>
          {members.map((item: IMembers, i: number) => {
            if (item.is_diller) {
              return (
                <div className={s.scramMasterCard} key={i}>
                  <div className={s.noFoto}>
                    {getInitials(item.first_name, item.last_name)}
                  </div>
                  <div className={s.scramMasterInfo}>
                    {(userRole === 'master') ? (<div>It`&apos;`s you:</div>) : null}
                    <div className={s.scramMasterInfoName}>
                      {item.first_name}
                      {' '}
                      {item.last_name}
                    </div>
                    <div>{item.job}</div>
                  </div>
                </div>
              );
            } return null;
          })}
        </div>
      </div>

      {(userRole === 'master')
        ? (
          <div className={s.settingsLinks}>
            <div className={s.linkLobby}>
              <h3>
                {' '}
                <i><b>Link to lobby:</b></i>
              </h3>
              <div className={s.copyLinkLobby}>
                <div className={s.inputLinkLobby}>{`http://localhost/${game.gameNiceId}`}</div>
                <button className={cn('btn btn-secondary btn-lg')}>Copy</button>
              </div>
            </div>
            <div className={s.settingsTopButtons}>
              <button className={cn('btn btn-secondary btn-lg')}>StartGame</button>
              <button className={cn('btn btn-outline-secondary btn-lg')}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className={s.settingsPlayer}>
            <div className={s.settingsTopButtons}>
              <button className={cn('btn btn-outline-secondary btn-lg')}>Exit</button>
            </div>
          </div>
        )}
      <div className={s.settingsMembers}>
        <div className={s.memberTitle}> Members:</div>
        {members.map(({
          first_name, is_diller, is_player, job, last_name,
        }: IMembers, i: number) => (
          <div
            className={cn(s.memberCard,
              { [s.isObserverCard]: (!is_diller && !is_player) })}
            key={i}
          >
            <div className={s.noFoto}>
              {getInitials(first_name, last_name)}
            </div>
            <div className={s.memberInfo}>
              {(!is_diller && !is_player) ? (<div className={s.isObserver}><AiOutlineEye className={s.isObserverIcon} /></div>) : null}
              <div className={s.memberInfoName}>
                {first_name}
                {' '}
                {last_name}
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
        (userRole === 'master')
          ? (
            <div>
              <div className={s.settingsIssues}>
                <div className={s.issuesTitle}>
                  Issues:
                </div>
                {issues.map((item: IIssues, i: number) => (
                  <div className={s.issuesCard} key={i}>
                    <div className={s.issuesInfo}>
                      <div className={s.issuesInfoName}>{item.title}</div>
                      <div className={s.issuesPriority}>{item.priority}</div>
                    </div>
                    <div
                      className={s.issuesChange}
                      id={`${i}`}
                      onClick={(e) => {
                        setPopapActive(false); setCreateOrEditIssue('edit');
                        setIndexIssue(isThisIssue(e));
                        setDataIssue({
                          title: `${issues[+isThisIssue(e)].title}`, link: `${issues[+isThisIssue(e)].link}`, priority: `${issues[+isThisIssue(e)].priority}`, nice_id: '', is_current: false,
                        });
                      }}
                    >
                      <HiPencil className={s.issuesChangeIcon} />
                    </div>
                    <div className={s.issuesDel}>
                      <HiOutlineTrash className={s.issuesDelIcon} />
                    </div>
                  </div>
                ))}
                <div
                  className={s.issuesCardAdd}
                  onClick={() => {
                    setPopapActive(false);
                    setCreateOrEditIssue('create');
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
      <PoppapAddIssue active={popapActive} status={createOrEditIssue} setActive={setPopapActive} element={dataIssue} editElement={setDataIssue} index={+indexIssue} />
    </div>

  );
};
export default Lobby;

// eslint-disable-next-line no-lone-blocks
{ /* <div className={s.gameCards}>
                <div className={s.gameCardsTitle}>
                    Game Cards:
                </div>
                <div className={s.cards}>
                    <div className={s.cardItem}>
                        0
                    </div>
                    <div className={s.cardItem}>
                        1/2
                    </div>
                    <div className={s.cardItem}>
                        1
                    </div>
                    <div className={s.cardItem}>
                        2
                    </div>
                    <div className={s.cardItem}>
                        3
                    </div>
                    <div className={s.cardItem}>
                        5
                    </div>
                    <div className={s.cardItem}>
                        8
                    </div>
                    <div className={s.cardItem}>
                        13
                    </div>
                    <div className={s.cardItem}>
                        20
                    </div>
                    <div className={s.cardItem}>
                        40
                    </div>
                    <div className={s.cardItem}>
                        100
                    </div>
                    <div className={s.cardItem}>
                        ?
                    </div>
                    <div className={s.cardItem}>
                        <AiOutlineCoffee />
                    </div>
                </div>
            </div> */ }
