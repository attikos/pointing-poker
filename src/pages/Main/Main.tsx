import React from "react";
import { useState } from "react";
import s from './Main.module.scss';
import cn from 'classnames'
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import PoppapToLobbyContainer from "../../components/PopapToLobby/PoppapToLobbyContainer";
import { ValueURL } from "../../interface";

const Main = (props: { handleSubmit: (arg0: string) => void; validateID: any; }) => {
    const [popapActive, setPopapActive] = useState(true)
    return (
        <main className={s.main}>
            <div className={s.logo}><img className={s.logoImg} src="./assets/pokPlan.png" alt="img" /></div>
            <div className='start'>
                <div className={s.startHeader}>Start your planning:</div>
                <div>
                    <span className={cn('me-3', s.label)}>Create session:</span>
                    <button
                        className="btn btn-secondary btn-lg"
                        type="button"
                        onClick={() => {setPopapActive(false); props.handleSubmit('master')}}
                    >Start new Game</button>
                </div>

                <Formik
                    initialValues={{
                        url: ''
                    }}
                    onSubmit={(
                        values: ValueURL,
                        { setSubmitting }: FormikHelpers<ValueURL>
                    ) => {
                        setPopapActive(false);
                        props.handleSubmit('player')
                        setSubmitting(false);
                    }
                    }
                >
                    {({ errors, touched }) => (
                    <Form className={s.form}>
                        <div className={s.startHeader}>Or:</div>
                        <label className={cn('mb-3', s.label)} htmlFor={s.startLobby}> Connect to lobby by ID: </label>
                        <div className="input-group has-validation mb-3">
                            <Field
                                name='url'
                                type="text"
                                className={cn('form-control', s.url,
                                    { 'is-invalid' : errors.url && touched.url }
                                )}
                                validate={props.validateID}
                                placeholder="Game ID like ABC123"
                            />
                            <button
                                className={cn('btn btn-secondary btn-lg'/*, s.startButton*/)}
                                type="button"
                            >Connect</button>

                            <span className={cn('invalid-feedback', s.error)}>
                                <ErrorMessage name="url" />
                            </span>
                        </div>
                    </Form>
                    )}
                </Formik>

            </div>

            <PoppapToLobbyContainer active={popapActive} setActive={setPopapActive} />

        </main>
    )
}
export default Main
