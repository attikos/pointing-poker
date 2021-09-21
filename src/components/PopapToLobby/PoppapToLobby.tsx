import React from "react";
import s from './PoppapToLobby.module.scss';
import cn from 'classnames'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup"
import { User } from "../../interface";
import { initialUserState } from '../../store/popapLobby-redux';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),

});
const PoppapToLobby = (
    props: {
        active: any;
        setActive: (arg0: boolean) => void;
        handleSubmit: (arg0: User) => void;
        getIinitials: (arg0: string, arg1: string) => string;
        openTheLobby: ( arg0: string, arg1: string, ) => void;
        state: {
            userData: {
                firstName: any;
                lastName: any;
            };
            game: {
                game_nice_id: string;
                status: string;
            }
        };
    }) => {
    return (
        <div className={cn(s.formLobby,
            { [s.active]: !props.active }
        )} onClick={() => props.setActive(true)}>
            <div className={s.body}>
                <div className={s.content} onClick={(e) => e.stopPropagation()}>
                    <Formik
                        initialValues={initialUserState}
                        validationSchema={SignupSchema}
                        onSubmit={(values, { setSubmitting }
                        ) => {
                            props.handleSubmit(values);
                            props.openTheLobby(props.state.game.game_nice_id, props.state.game.status)
                            setSubmitting(false);
                        }
                        }
                    >
                        <Form className={s.form}>
                            <div className={s.formLobbyTop}>
                                <div className={s.formLobbyHeader}>
                                    Connect to lobby
                                </div>
                                <div className="form-check form-switch" id={s.asObserver}>
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Connect as Observer</label>
                                    <Field className="form-check-input" type="checkbox" name="isObserver" id="flexSwitchCheckDefault"
                                    />
                                </div>
                            </div>
                            <label htmlFor="firstName">Your First Name </label>
                            <Field id="firstName" name="firstName" className={s.input}
                            />
                            <span className={s.error}><ErrorMessage name="firstName" /></span>
                            <label htmlFor="lastName">Your Last Name (optional)</label>
                            <Field id="lastName" name="lastName" className={s.input}
                            />
                            <label htmlFor="job">Your Job Position (optional)</label>
                            <Field id="job" name="job" className={s.input}
                            />
                            <label htmlFor="photo">Image:</label>
                            <input type="file" className="select-foto-input input" name="photo"
                            />
                            <div className={s.foto}> <div className={s.noFoto}>{
                                props.getIinitials(props.state.userData.firstName, props.state.userData.lastName)}</div></div>
                            <div className={s.buttonContainer}>
                                <div className={s.confirm}>
                                    <button className={cn('btn btn-secondary btn-lg')} type='submit' >Confirm</button>
                                </div>
                                <div className={s.cancel}><button className={cn("btn btn-outline-secondary btn-lg")} onClick={() => props.setActive(true)} >Cancel</button></div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div >
    )
}
export default PoppapToLobby
