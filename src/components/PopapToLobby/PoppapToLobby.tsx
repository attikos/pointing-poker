import React, { useState } from 'react';
import cn from 'classnames';
import {
  Formik, Field, Form, ErrorMessage, FormikHelpers,
} from 'formik';
import * as Yup from 'yup';
import s from './PoppapToLobby.module.scss';
import { User, IServerData, IGame } from '../../interface';
import { TGameNiceId } from '../../types';
import { updateUserAC, initialUserState } from '../../store/popapLobby-redux';
import { useHistory } from 'react-router';
import api from '../../services/api';
import { websocket } from '../../services/socket';
import { useDispatch } from 'react-redux';
import { updateAllData } from '../../store/all-data-redux';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
});

interface Props {
  active: boolean;
  setActive: (arg0: boolean) => void;
  gameNiceId: TGameNiceId;
}

const PoppapToLobby = (props: Props): JSX.Element => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [fio, setFio] = useState({ firstName: '', lastName: '' });
  const {
    setActive,
    active,
    gameNiceId,
  } = props;

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

  const routerHandler = ({ game }: { game: IGame }): void => {
    if (game.status === 'lobby' || game.status === 'game') {
      history.push(`/${game.niceId}`);
    } else {
      history.push('/');
    }
  };

  const handleSubmit = async (values: { user: User, gameNiceId: TGameNiceId }): Promise<void> => {
    const success = await api.newGame(values);
    if (success) {
      await websocket.connect();
      websocket.subscription?.on('all-data', (data: IServerData) => {

        console.log('!!!! all-data', data);
        dispatch(updateAllData(data));
        routerHandler(data);
      });

      websocket.subscription?.on('user', (data:User) => {
        console.log('user:', data);
        dispatch(updateUserAC(data));
      });

      api.fetchAllData();
      api.fetchUser();
    }
  };

  const openTheLobby = (id: TGameNiceId, status: string): void => {
    if (status === 'lobby') {
      history.push(`/${id}`);
    }
  };



  const onFormSubmit = (
    values: User,
    { setSubmitting }: FormikHelpers<User>,
  ) => {
    handleSubmit({
      user: { ...values, ...fio },
      gameNiceId,
    });
    openTheLobby(gameNiceId, 'lobby');
    setSubmitting(false);
  };

  return (
    <div
      className={cn(s.formLobby,
        { [s.active]: !active })}
      onClick={() => setActive(true)}
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
                  Connect to lobby
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
                onInput={(e: any) => setFio({ ...fio, firstName: e.target.value })}
              />
              <span className={s.error}><ErrorMessage name="firstName" /></span>

              <label htmlFor="lastName">Your Last Name (optional)</label>
              <Field
                id="lastName"
                name="lastName"
                className={s.input}
                onInput={(e: any) => setFio({ ...fio, lastName: e.target.value })}
              />
              <label htmlFor="job">Your Job Position (optional)</label>
              <Field id="job" name="job" className={s.input} />

              {/* <label htmlFor="photo">Image:</label>
                <input type="file" className="select-foto-input input" name="photo"
                /> */}

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
                    onClick={() => props.setActive(true)}
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
