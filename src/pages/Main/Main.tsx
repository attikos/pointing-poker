import React from "react";
import { useState } from "react";
import s from './Main.module.scss';
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
                <label htmlFor={s.startCreate} > Create session:
                    <button className={s.startButton} onClick={() => {setPopapActive(false); props.handleSubmit('master')}}>Start new Game</button>
                </label>
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
                    <Form className={s.form}>
                        <div className={s.startHeader}>Or:</div>
                        <label htmlFor={s.startLobby}> Connect to lobby by ID: </label>
                        <div>
                            <Field name='url' className={s.url} validate={props.validateID} />
                            <button type='submit' className={s.startButton} >Connect</button>
                            <span className={s.error}><ErrorMessage name="url" /></span>
                        </div>
                    </Form>
                </Formik>

            </div>
            <PoppapToLobbyContainer active={popapActive} setActive={setPopapActive} />

        </main>
    )
}
export default Main


