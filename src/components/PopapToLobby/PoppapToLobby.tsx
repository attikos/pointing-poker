import React from "react";
import s from './PoppapToLobby.module.scss';
import cn from 'classnames'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup"
import { User } from "../../interface";


const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),

});
const PoppapToLobby = (props: { active: any; setActive: (arg0: boolean) => void; handleSubmit: (arg0: { isObserver: boolean; firstName: string; lastName: string; job: string; foto: string; }) => void; getIinitials: (arg0: any, arg1: any) => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; state: { formData: { firstName: any; lastName: any; }; }; }) => {
    const initialValues: User = {
        isObserver: false,
        firstName: '',
        lastName: '',
        job: '',
        foto: '',
    }
    return (
        <div className={cn(s.formLobby,
            { [s.active]: !props.active }
        )} onClick={() => props.setActive(true)}>
            <div className={s.body}>
                <div className={s.content} onClick={(e) => e.stopPropagation()}>
                    <Formik
                         initialValues = {initialValues}
                        validationSchema={SignupSchema}
                        onSubmit={(values, { setSubmitting }
                        ) => {
                            props.handleSubmit(values);
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
                            <label htmlFor="jobName">Image:</label>
                            <input type="file" className="select-foto-input input" name="jobName"
                            />
                            <div className={s.foto}> <div className={s.noFoto}>{
                            props.getIinitials(props.state.formData.firstName, props.state.formData.lastName)}</div></div>
                            <div className={s.buttonContainer}>
                                <div className={s.confirm}>
                                    <button className={cn(s.buttonBlue, s.button)} type='submit' >Confirm</button>
                                </div>
                                <div className={s.cancel}><button className={cn(s.buttonWhite, s.button)} onClick={() => props.setActive(true)} >Cancel</button></div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div >
    )
}
export default PoppapToLobby

