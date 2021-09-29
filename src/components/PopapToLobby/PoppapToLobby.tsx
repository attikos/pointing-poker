import React, { useState } from 'react';
import cn from 'classnames';
import {
  Formik, Field, Form, ErrorMessage, FormikHelpers,
} from 'formik';
import * as Yup from 'yup';
import s from './PoppapToLobby.module.scss';
import { IUser } from '../../interface';
import { initialUserState } from '../../store/user-redux';
import { TNiceId } from '../../types';
import { useNewGame } from '../../controllers/useNewGame';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
});

interface Props {
  popapActive: boolean;
  setPopapActive: (arg0: boolean) => void;
  gameNiceId: TNiceId;
  userRole: string;
}

const PoppapToLobby = ({ setPopapActive, popapActive, gameNiceId, userRole }: Props): JSX.Element => {
  const [newGame] = useNewGame();

  const [fio, setFio] = useState({ firstName: '', lastName: '' });

  const getIinitials = (firstName: string, lastName: string) => {
    if (firstName && lastName) {
      return firstName[0].toUpperCase() + lastName[0].toUpperCase();
    }
    if (firstName && !lastName) {
      return firstName[0].toUpperCase();
    }
    if (!firstName) {
      return '';
    }
    return '';
  };

  const initials = getIinitials(fio.firstName, fio.lastName);

  const handleSubmit = async (values: { user: IUser, gameNiceId: TNiceId }): Promise<void> => {
    newGame(values);
  };

  const onFormSubmit = (
    values: IUser,
    { setSubmitting }: FormikHelpers<IUser>,
  ) => {
    handleSubmit({
      user: { ...values, ...fio },
      gameNiceId,
    });
    setPopapActive(false);
    setSubmitting(false);
  };

  const onExit = () => {
    setPopapActive(false);
  };

  return (
    <div
      className={ cn(s.formLobby, { [s.active]: popapActive } )}
      onClick={() => setPopapActive(false)}
    >
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
                  { userRole === 'master'
                    ? 'Create session'
                    : 'Connect to lobby' }
                </div>
                <div className="form-check form-switch" id={s.asObserver}>
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Connect as Observer
                  </label>

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
                onInput={(e: React.ChangeEvent<HTMLSelectElement>) => setFio({ ...fio, firstName: e.target.value })}
              />
              <span className={s.error}><ErrorMessage name="firstName" /></span>

              <label htmlFor="lastName">Your Last Name (optional)</label>
              <Field
                id="lastName"
                name="lastName"
                className={s.input}
                onInput={(e: React.ChangeEvent<HTMLSelectElement>) => setFio({ ...fio, lastName: e.target.value })}
              />
              <label htmlFor="job">Your Job Position (optional)</label>
              <Field id="job" name="job" className={s.input} />

              {initials && (
                <div className={s.foto}>
                  <div className={s.noFoto}>{initials}</div>
                </div>
              )}

              <div className={s.buttonContainer}>
                <div className={s.confirm}>
                  <button
                    className={cn('btn btn-secondary btn-lg')}
                    type="submit"
                  >
                    Confirm
                  </button>
                </div>

                <div className={s.cancel}>
                  <div
                    className={cn('btn btn-outline-secondary btn-lg')}
                    onClick={ onExit }
                  >
                    Cancel
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default PoppapToLobby;
