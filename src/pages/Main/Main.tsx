import React, { useState } from 'react';
import cn from 'classnames';
import {
  Formik, Field, Form, FormikHelpers, ErrorMessage,
} from 'formik';
import _ from 'lodash';
import s from './Main.module.scss';
import { ValueURL } from '../../interface';
import api from '../../services/api';
import PoppapToLobby from '../../components/PopapToLobby/PoppapToLobby';
import logo from '../../assets/pokPlan.jpg';

const Main = (): JSX.Element => {
  const [userRole, setUserRole] = useState('');
  const [popapActive, setPopapActive] = useState(false);
  const [gameNiceId, setGameNiceId] = useState('');

  const onSubmitPlayerForm = (
    values: ValueURL,
    { setSubmitting }: FormikHelpers<ValueURL>,
  ) => {
    setGameNiceId(values.gameNiceId);
    setPopapActive(true);
    setUserRole('player');
    setSubmitting(false);
  };

  const onStartDillerGame = () => {
    setPopapActive(true);
    setUserRole('master');
  };

  const validateID = async (value: string) => {
    const DELAY_CHECK = 300;
    let error: string | boolean = '';

    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9]{6}$/i.test(value)) {
      error = 'Invalid ID';
    }

    if (!error) {
      error = await new Promise((res) => {
        (_.debounce(async ():Promise<void> => {
          const gameIdError = await api.checkGameId(value);
          res(gameIdError);
        }, DELAY_CHECK))();
      });
    }

    return error;
  };

  return (
    <main className={s.main}>
      <div className={s.logo}>
        <img className={s.logoImg} src={logo} alt="img" />
      </div>
      <div className="start">
        <div className={s.startHeader}>Start your planning:</div>
        <div>
          <span className={cn('me-3', s.label)}>Create session:</span>
          <button
            className={cn('btn btn-primary', s.button )}
            type="button"
            onClick={ onStartDillerGame }
          >
            Start new Game
          </button>
        </div>

        <Formik
          initialValues={{ gameNiceId: '' }}
          onSubmit={onSubmitPlayerForm}
        >
          {({ errors, touched }) => (
            <Form className={s.form}>
              <div className={s.startHeader}>Or:</div>
              <label
                className={cn('mb-3', s.label)}
                htmlFor={s.startLobby}
              >
                Connect to lobby by ID:
              </label>

              <div className="input-group has-validation mb-3">
                <Field
                  name="gameNiceId"
                  type="text"
                  className={cn('form-control', s.url,
                    { 'is-invalid': errors.gameNiceId && touched.gameNiceId })}
                  validate={validateID}
                  placeholder="Game ID"
                />
                <button
                  className={cn('btn btn-primary', s.button )}
                  type="submit"
                >
                  Connect
                </button>

                <span className={cn('invalid-feedback', s.error)}>
                  <ErrorMessage name="gameNiceId" />
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <PoppapToLobby
        popapActive={popapActive}
        setPopapActive={setPopapActive}
        gameNiceId={gameNiceId}
        userRole={userRole}
      />

    </main>
  );
};
export default Main;
