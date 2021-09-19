import React from "react";
import s from './PopapAddIssue.module.scss';
import cn from 'classnames'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IIssues } from "../../interface";

const PopapAddIssue = (
    props: {
        active: any;
        setActive: (arg0: boolean) => void;
        updateTitle: (e: React.ChangeEvent<HTMLSelectElement>) => void;
        updateLink: (e: React.ChangeEvent<HTMLSelectElement>) => void;
        updatePriority: (e: React.ChangeEvent<HTMLSelectElement>) => void;
        createNewIssue: () => void;
        updateIssues: () => void;
        status: string;
        element: string;
        state: {
            issues: IIssues[]
        }
    }) => {
    console.log('props.status', props.status)
    let initialValues = {
        title: (props.status === 'create') ? "" :
            (props.status === 'edit') ? props.state.issues[+props.element].title : 'lll',
        link: (props.status === 'create') ? '' :
            (props.status === 'edit') ? props.state.issues[+props.element].link : 'jjj',
        priority: (props.status === 'create') ? 'low' :
            (props.status === 'edit') ? props.state.issues[+props.element].priority : 'low',

    }
    console.log('initialValues', initialValues)
    return (
        <div className={cn(s.formLobby,
            { [s.active]: !props.active }
        )} onClick={() => props.setActive(true)}>
            {console.log('props.status,v,b,jhbj,hbjhb', props.status)}
            <div className={s.body}>
                <div className={s.content} onClick={(e) => e.stopPropagation()}>
                    {console.log('initialValuesFormir', initialValues)}
                    <Formik
                        initialValues={initialValues}
                        // validationSchema={SignupSchema}
                        onSubmit={(values, { setSubmitting }
                        ) => {
                            console.log('values', values)
                            if (props.status === 'create') {
                                props.createNewIssue()
                            }
                            if (props.status === 'edit') {
                                props.updateIssues()
                            }
                            setSubmitting(false);
                        }
                        }
                    >
                        {props =>
                            <form className={s.form} onSubmit={props.handleSubmit}>
                                <div className={s.formLobbyTop}>
                                    <div className={s.formLobbyHeader}>
                                        {(props.status === 'create') ? 'Create Issue' : "Edit Issue"}
                                    </div>

                                </div>
                                {/* {props.errors.firstName && <div id="feedback">{props.errors.firstName}</div>} */}
                                <div className={s.items}>
                                    <label htmlFor="title">Title:</label>
                                    <Field
                                        name="title"
                                        className={s.input}
                                        value={props.values.title}
                                        onChange={props.handleChange}
                                    // value={
                                    //     (props.status === 'create') ? initialValuesCreate.title :
                                    //         (props.status === 'edit') ? props.state.issues[+props.element].title : ''
                                    // }
                                    // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {

                                    //     props.updateTitle(e)
                                    // }}
                                    />
                                </div>
                                <span className={s.error}>
                                    <ErrorMessage name="title" />
                                </span>
                                <div className={s.items}>
                                    <label htmlFor="link">Link:</label>
                                    <Field name="link"
                                        className={s.input}
                                        value={props.values.link}
                                        onChange={props.handleChange}
                                    // value={
                                    //     (props.status === 'create') ? initialValuesCreate.link :
                                    //         (props.status === 'edit') ? props.state.issues[+props.element].link : ''}
                                    // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    //     props.updateLink(e)
                                    // }}
                                    />
                                </div>
                                <div className={s.items}>
                                    <label htmlFor="link">Priopity: </label>
                                    <Field as="select"
                                        name="priority"
                                    // value={
                                    //     (props.status === 'create') ? initialValuesCreate.priority :
                                    //         (props.status === 'edit') ? props.state.issues[+props.element].priority : ''} className={s.input}
                                    // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    //     props.updatePriority(e)
                                    // }}
                                    >
                                        <option value="low">Low</option>
                                        <option value="middle">Middle</option>
                                        <option value="hight">Hight</option>
                                    </Field>
                                </div>
                                <div className={s.buttonContainer}>
                                    <div className={s.confirm}>
                                        <button className={cn(s.buttonBlue, s.button)} type='submit' >YES</button>
                                    </div>
                                    <div className={s.cancel}><button className={cn(s.buttonWhite, s.button)}
                                        // onClick={() => props.props.setActive(true)}
                                    >NO</button></div>
                                </div>
                            </form>
                        }
                    </Formik>
                </div>
            </div>
        </div >
    )
}
export default PopapAddIssue

