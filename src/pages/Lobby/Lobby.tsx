import React, { useState } from "react";
import cn from 'classnames'
import s from './Lobby.module.scss';
import { HiBan, HiOutlinePlus, HiOutlineTrash, HiPencil } from 'react-icons/hi';
import { AiOutlineEye } from "react-icons/ai"
import PoppapAddIssueContainer from "../../components/PopapAddIssue/PopapAddIssueContainer";
import { IIssues, IMembers } from "../../interface";


const Lobby = (props: any) => {
    const [popapActive, setPopapActive] = useState(true)
    const [createOrEditIssue, setCreateOrEditIssue]=useState('')
    return (
        <div className={s.settings}>
            <div className={s.settingsTop}>
                <div className={s.topic}>
                    <div className={s.inputTopic}>
                        {props.state.issues.map((item: IIssues) => {
                            return item.title + ' '
                        }
                            )}
                    </div>
                    <div className={s.iconPencil}><HiPencil className={s.issuesChangeIcon} /></div>
                </div>
                <div className={s.scramMaster}>
                    <h6>Scram master:</h6>
                    {props.state.members.map((item: IMembers) => {
                        if (item.is_diller) {
                            return (<div className={s.scramMasterCard}>
                                <div className={s.noFoto}>
                                    {props.getInitials(item.first_name, item.last_name)}
                                </div>
                                <div className={s.scramMasterInfo}>
                                    {(props.state.playerOrMaster.playerOrMaster === 'master') ? (<div>It's you:</div>) : null}
                                    <div className={s.scramMasterInfoName}>{item.first_name} {item.last_name}</div>
                                    <div>{item.job}</div>
                                </div>
                            </div>)
                        } else return null
                    }
                    )}
                </div>
            </div>

            {(props.state.playerOrMaster.playerOrMaster === 'master') ?
                (<div className={s.settingsLinks}>
                    <div className={s.linkLobby}>
                        <h3> <i><b>Link to lobby:</b></i></ h3>
                        <div className={s.copyLinkLobby}>
                            <input className={s.inputLinkLobby} type="text" value={`http://localhost/${props.state.game.game_nice_id}`}  />
                            <button className={cn(s.buttonBlue, s.button)}>Copy</button>
                        </div>
                    </div>
                    <div className={s.settingsTopButtons}>
                        <button className={cn(s.buttonBlue, s.button)}>StartGame</button>
                        <button className={cn(s.buttonWhite, s.button)}>Cancel</button>
                    </div>
                </div>) : (<div className={s.settingsPlayer}>
                    <div className={s.settingsTopButtons}>
                        <button className={cn(s.buttonWhite, s.button)}>Exit</button>
                    </div>
                </div>)
            }
            <div className={s.settingsMembers}>
                <div className={s.memberTitle}> Members:</div>
                {props.state.members.map(({ first_name, is_diller, is_player, job, last_name, nice_id }: IMembers) => {
                    return (
                        < div className={cn(s.memberCard,
                            { [s.isObserverCard]: (!is_diller && !is_player) }
                        )}>
                            <div className={s.noFoto}>{props.getInitials(first_name, last_name)}
                            </div>
                            <div className={s.memberInfo}>
                                {(!is_diller && !is_player) ? (<div className={s.isObserver}><AiOutlineEye className={s.isObserverIcon} /></div>) : null}
                                <div className={s.memberInfoName}>{first_name} {last_name}</div>
                                <div>{job}</div>
                            </div>
                            <div className={s.memberDelete}>
                                <HiBan className={s.iconDel} />
                            </div>
                        </div>)
                })}
            </div>
            {
                (props.state.playerOrMaster.playerOrMaster === 'master') ?
                    (<div>
                        <div className={s.settingsIssues}>
                            <div className={s.issuesTitle}>
                                Issues:
                            </div>
                            {props.state.issues.map((item: IIssues) => {
                                return (
                                    <div className={s.issuesCard}>
                                        <div className={s.issuesInfo}>
                                            <div className={s.issuesInfoName}>{item.title}</div>
                                            <div className={s.issuesPriority}>{item.priority}</div>
                                        </div>
                                        <div className={s.issuesChange}  onClick={(e) =>{ setPopapActive(false); setCreateOrEditIssue('edit'); props.isThisIssue(e)}}>
                                            <HiPencil className={s.issuesChangeIcon} />
                                        </div>
                                        <div className={s.issuesDel}>
                                            <HiOutlineTrash className={s.issuesDelIcon} />
                                        </div>
                                    </div>
                                )
                            })}
                            <div className={s.issuesCardAdd} onClick={() =>{ setPopapActive(false); setCreateOrEditIssue('create')}} >
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
                                <div className='form-check form-switch'>
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                        Scram master as player
                                    </label>
                                    <input type="checkbox" className="form-check-input" id="flexSwitchCheckDefault" />
                                </div>
                            </div>

                        </div>
                    </div>) : null
            }

            {/* <div className={s.gameCards}>
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
            </div> */}

            <PoppapAddIssueContainer active={popapActive} status={createOrEditIssue} setActive={setPopapActive} />
        </div >

    )
}
export default Lobby
