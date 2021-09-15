import React, { useState } from "react";
import cn from 'classnames'
import s from './Lobby.module.scss';
import { HiBan, HiOutlinePlus, HiOutlineTrash, HiPencil } from 'react-icons/hi';
import PoppapAddIssueContainer from "../../components/PopapAddIssue/PopapAddIssueContainer";
// import { AiOutlineCoffee } from "react-icons/ai";
// import LobbyTop from "../../components/Lobby/LobbyTop";

const Lobby = (props: any) => {
    console.log('Lobby', props.state)
    const [popapActive, setPopapActive] = useState(true)
    return (
        <div className={s.settings}>
            <div className={s.settingsTop}>
                <div className={s.topic}>
                    <input className={s.inputTopic} type="text" />
                    <div className={s.iconPencil}><HiPencil className={s.issuesChangeIcon} /></div>
                </div>
                <div className={s.scramMaster}>
                    <h6>Scram master:</h6>
                    <div className={s.scramMasterCard}>
                        <div className={s.noFoto}>

                        </div>
                        <div className={s.scramMasterInfo}>
                            {(props.state.playerOrMaster.playerOrMaster === 'master') ? (<div>It's you:</div>) : null}
                            <div className={s.scramMasterInfoName}>Name</div>
                            <div>Job</div>
                        </div>
                    </div>
                </div>
            </div>

            {(props.state.playerOrMaster.playerOrMaster === 'master') ?
                (<div className={s.settingsLinks}>
                    <div className={s.linkLobby}>
                        <h3> <i><b>Link to lobby:</b></i></ h3>
                        <div className={s.copyLinkLobby}>
                            <input className={s.inputLinkLobby} type="text" />
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
                <div className={s.memberCard}>
                    <div className={s.noFoto}>
                    </div>
                    <div className={s.memberInfo}>
                        <div className={s.memberInfoName}>Name</div>
                        <div>Job</div>
                    </div>
                    <div className={s.memberDelete}>
                        <HiBan className={s.iconDel} />
                    </div>
                </div>
            </div>

            {(props.state.playerOrMaster.playerOrMaster === 'master') ?
                (<div>
                    <div className={s.settingsIssues}>
                        <div className={s.issuesTitle}>
                            Issues:
                        </div>
                        <div className={s.issuesCard}>
                            <div className={s.issuesInfo}>
                                <div className={s.issuesInfoName}>Issue</div>
                                <div className={s.issuesPriority}>priority</div>
                            </div>
                            <div className={s.issuesChange}>
                                <HiPencil className={s.issuesChangeIcon} />
                            </div>
                            <div className={s.issuesDel}>
                                <HiOutlineTrash className={s.issuesDelIcon} />
                            </div>
                        </div>
                        <div className={s.issuesCardAdd} onClick={() => setPopapActive(false)} >
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
                </div>) : null}
            {
                //Diller
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
            <PoppapAddIssueContainer active={popapActive} setActive={setPopapActive} />
        </div>
    )
}
export default Lobby

