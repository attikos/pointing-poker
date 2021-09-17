import React from "react";
import s from './PopapAddIssue.module.scss';
import cn from 'classnames'
import { ErrorMessage, Field, Form, Formik } from "formik";

const PopapAddIssue = (props: { active: any; setActive: (arg0: boolean) => void; status: string; }) => {
    const initialValues = {
        title: '',
        link: '',
        priority: 'low'
    }
    return (
        <div className={cn(s.formLobby,
            { [s.active]: !props.active }
        )} onClick={() => props.setActive(true)}>
            <div className={s.body}>
                <div className={s.content} onClick={(e) => e.stopPropagation()}>

                    <Formik
                        initialValues={initialValues}
                        // validationSchema={SignupSchema}
                        onSubmit={(values, { setSubmitting }
                        ) => {
                            // props.handleSubmit(values);
                            setSubmitting(false);
                        }
                        }
                    >
                        <Form className={s.form}>
                            <div className={s.formLobbyTop}>
                                <div className={s.formLobbyHeader}>
                                    {(props.status === 'create') ? 'Create Issue' : "Edit Issue"}
                                </div>

                            </div>
                            <div className={s.items}>
                                <label htmlFor="title">Title:</label>
                                 <Field name="title" className={s.input} 
                                //  value={(props.status === 'edit') ? `${props.state.issues.}`: ''}
                                />
                            </div>
                            <span className={s.error}><ErrorMessage name="title" /></span>
                            <div className={s.items}>
                                <label htmlFor="link">Link:</label> <Field name="link" className={s.input}

                                /></div>
                            <div className={s.items}>
                                <label htmlFor="link">Priopity: </label>
                                <Field as="select" name="priopity" className={s.input}>
                                    <option value="low">Low</option>
                                    <option value="middle">Middle</option>
                                    <option value="hight">Hight</option>
                                </Field>
                            </div>
                            <div className={s.buttonContainer}>
                                <div className={s.confirm}>
                                    <button className={cn(s.buttonBlue, s.button)} type='submit' >YES</button>
                                </div>
                                <div className={s.cancel}><button className={cn(s.buttonWhite, s.button)} onClick={() => props.setActive(true)} >NO</button></div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div >
    )
}
export default PopapAddIssue

