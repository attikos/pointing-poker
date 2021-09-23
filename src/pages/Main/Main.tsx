import React, { useState } from 'react';
import s from './Main.module.scss';
import cn from 'classnames';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import PoppapToLobbyContainer from '../../components/PopapToLobby/PoppapToLobbyContainer';
import { ValueURL } from '../../interface';
import api from '../../services/api';
import _ from 'lodash';

interface Props {
  handleSubmit: (arg0: string) => void;
  state: any,
  history: any[];
}

const Main = (props: Props) => {
  const [popapActive, setPopapActive] = useState(true);
  const [gameNiceId, setGameNiceId] = useState('');
  const [userRole, setUserRole] = useState('');

  const onSubmitPlayerForm = (
    values: ValueURL,
    { setSubmitting }: FormikHelpers<ValueURL>,
  ) => {
    setGameNiceId(values.gameNiceId);
    setPopapActive(false);
    // props.handleSubmit('player')
    setUserRole('player');
    setSubmitting(false);
  };


  const validateID = async (value: string) => {
    const DELAY_CHECK = 300;
    let error = '';

    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9]{6}$/i.test(value)) {
      error = 'Invalid ID';
    }

    if (!error) {
      error = await new Promise( res => {
        (_.debounce(async () => {
          const error = await api.checkGameId(value);
          res(error);
        }, DELAY_CHECK))();
      });
    }

    return error;
  };

  return (
        <main className={s.main}>
            <div className={s.logo}> <img className={s.logoImg} src="./assets/pokPlan.png" alt="img" /></div>
            <div className='start'>
                <div className={s.startHeader}>Start your planning:</div>
                <div>
                    <span className={cn('me-3', s.label)}>Create session:</span>
                    <button
                        className="btn btn-secondary btn-lg"
                        type="button"
                        // onClick={() => {setPopapActive(false); props.handleSubmit('master')}}
                        onClick={() => {setPopapActive(false); setUserRole('master');}}
                    >Start new Game</button>
                </div>

                <Formik
                    initialValues={{ gameNiceId: '' }}
                    onSubmit={ onSubmitPlayerForm }
                >
                    {({ errors, touched }) => (
                    <Form className={s.form}>
                        <div className={s.startHeader}>Or:</div>
                        <label
                            className={cn('mb-3', s.label)}
                            htmlFor={s.startLobby}
                        >Connect to lobby by ID:</label>

                        <div className="input-group has-validation mb-3">
                            <Field
                                name='gameNiceId'
                                type="text"
                                className={cn('form-control', s.url,
                                  { 'is-invalid' : errors.gameNiceId && touched.gameNiceId },
                                )}
                                validate={validateID}
                                placeholder="Game ID"
                            />
                            <button
                                className={cn('btn btn-secondary btn-lg'/*, s.startButton*/)}
                                type="submit"
                            >Connect</button>

                            <span className={cn('invalid-feedback', s.error)}>
                                <ErrorMessage name="gameNiceId" />
                            </span>
                        </div>
                    </Form>
                    )}
                </Formik>
            </div>

            <PoppapToLobbyContainer
                history={props.history}
                active={popapActive}
                setActive={setPopapActive}
                gameNiceId={gameNiceId}
                userRole={userRole}
            />

        </main>
  );
};
export default Main;
