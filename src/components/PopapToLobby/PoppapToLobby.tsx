import React from "react";
import { useState } from "react";
import s from './PoppapToLobby.module.scss';
import cn from 'classnames'
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';

import * as Yup from "yup"
import { User, TGameNiceId } from "../../interface";
import { initialUserState } from '../../store/popapLobby-redux';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
});

interface Props {
    active: any;
    setActive: (arg0: boolean) => void;
    handleSubmit: (arg0: { user: User, gameNiceId : TGameNiceId, }) => void;
    getIinitials: (firstName: string, lastName: string) => string;
    openTheLobby: (gameNiceId : TGameNiceId, status: string) => void;
    gameNiceId: TGameNiceId;
    // game: {
    //     gameNiceId: TGameNiceId;
    //     status: string;
    // }
    userRole: string;
}

const PoppapToLobby = (props: Props) => {
    const [fio, setFio] = useState({firstName: '', lastName: ''});
    const {
        getIinitials,
        setActive,
        handleSubmit,
        openTheLobby,
        active,
        gameNiceId,
        // game,
        userRole
    } = props;
    const initials = getIinitials(fio.firstName, fio.lastName);

    const onFormSubmit = (
        values: User,
        { setSubmitting }: FormikHelpers<User>
    ) => {
        handleSubmit({
            user: { ...values, ...fio },
            gameNiceId,
        });
        openTheLobby(gameNiceId, 'lobby')
        setSubmitting(false);
    };

    return (
        <div className={cn(s.formLobby,
            { [s.active]: !active }
        )} onClick={() => setActive(true)}>
            <div className={s.body}>
                <div className={s.content} onClick={(e) => e.stopPropagation()}>
                    <Formik
                        initialValues={initialUserState}
                        validationSchema={SignupSchema}
                        onSubmit={onFormSubmit}
                    >
                        <Form className={s.form}>
                            <div className={s.formLobbyTop}>
                                <div className={s.formLobbyHeader}>
                                    Connect to lobby
                                </div>
                                <div className="form-check form-switch" id={s.asObserver}>
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexSwitchCheckDefault"
                                    >Connect as Observer</label>

                                    <Field
                                        className="form-check-input"
                                        type="checkbox"
                                        name="isObserver"
                                        id="flexSwitchCheckDefault"
                                    />
                                </div>
                            </div>

                            <label htmlFor="firstName">Your First Name </label>
                            <Field
                                id="firstName"
                                name="firstName"
                                className={s.input}
                                onInput={(e:any) => setFio({ ...fio, firstName: e.target.value })}
                            />
                            <span className={s.error}><ErrorMessage name="firstName" /></span>

                            <label htmlFor="lastName">Your Last Name (optional)</label>
                            <Field
                                id="lastName"
                                name="lastName"
                                className={s.input}
                                onInput={(e:any) => setFio({ ...fio, lastName: e.target.value })}
                            />
                            <label htmlFor="job">Your Job Position (optional)</label>
                            <Field id="job" name="job" className={s.input}/>

                            {/* <label htmlFor="photo">Image:</label>
                            <input type="file" className="select-foto-input input" name="photo"
                            /> */}

                            { initials && <div className={s.foto}>
                                <div className={s.noFoto}>{ initials }</div>
                            </div> }

                            <div className={s.buttonContainer}>
                                <div className={s.confirm}>
                                    <button
                                        className={cn('btn btn-secondary btn-lg')}
                                        type='submit'
                                    >Confirm</button>
                                </div>

                                <div className={s.cancel}>
                                    <div
                                        className={cn("btn btn-outline-secondary btn-lg")}
                                        onClick={() => props.setActive(true)}
                                    >Cancel</div>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div >
    )
}
export default PoppapToLobby
