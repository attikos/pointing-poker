import React, { useState } from 'react';
import cn from 'classnames';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import * as Yup from 'yup';
import { IIssues } from '../../interface';
import s from './PopapAddIssue.module.scss';
import { useDispatch } from 'react-redux';

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
});

interface Props {
  active: boolean;
  setActive: (arg0: boolean) => void;
  editElement: (arg1: IIssues) => void;
  index: number;
  status: string;
  element: IIssues;

}
const PopapAddIssue = ({ active, setActive, editElement, index, status, element }: Props): JSX.Element => {
  const dispatch = useDispatch();
  // const issues = useSelector((state: RootStateOrAny) => state.issues);
  const [addIssue, setAddIssue] = useState({
    title: '',
    link: '',
    priority: 'low',
    nice_id: '',
    is_current: false,

  });
  const initialValues = {
    title: '',
    link: '',
    priority: 'low',
    nice_id: '',
    is_current: false,
  };
  const createNewIssue = (el: IIssues) => {
    dispatch({ type: 'ADD_ISSUE', el });
  };
  const updateIssues = (el: IIssues, i: number) => {
    dispatch({ type: 'ADD_ISSUE', el, i });
  };
  return (
    <div
      className={cn(s.formLobby,
        { [s.active]: !active })}
      onClick={() => setActive(true)}
    >
      <div className={s.body}>
        <div
          className={s.content}
          onClick={(e) => e.stopPropagation()}
        >
          <Formik
            initialValues={
              // (props.status === 'create') ? initialValues :
              (status === 'edit') ? element : initialValues
            }
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              if (status === 'create') {
                values = { ...addIssue };
                createNewIssue(values);
                setAddIssue({
                  title: '',
                  link: '',
                  priority: 'low',
                  nice_id: '',
                  is_current: false,
                });
              }
              if (status === 'edit') {
                values = { ...element };
                updateIssues(values, index);
              }
              setActive(true);
              setSubmitting(false);
            }}
          >
            <Form className={s.form}>
              <div className={s.formLobbyTop}>
                <div className={s.formLobbyHeader}>
                  {(status === 'create') ? 'Create Issue' : 'Edit Issue'}
                </div>

              </div>
              <div className={s.items}>
                <label htmlFor="title">Title:</label>
                <Field
                  name="title"
                  className={s.input}
                  // validationSchema={SignupSchema}
                  value={
                    (status === 'create') ? addIssue.title
                      : (status === 'edit') ? element.title : ''
                  }
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    if (status === 'edit') {
                      editElement({
                        title: `${e.target.value}`,
                        link: element.link,
                        priority: element.priority,
                        nice_id: '',
                        is_current: false,
                      });
                    } else if (status === 'create') {
                      setAddIssue({
                        title: `${e.target.value}`,
                        link: addIssue.link,
                        priority: addIssue.priority,
                        nice_id: '',
                        is_current: false,
                      });
                    }
                  }}
                />
              </div>
              <span className={s.error}>
                <ErrorMessage name="title" />
              </span>
              <div className={s.items}>
                <label htmlFor="link">Link:</label>
                <Field
                  name="link"
                  className={s.input}
                  value={
                    (status === 'create')
                      ? addIssue.link
                      : (status === 'edit') ? element.link : ''
                  }
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    if (status === 'edit') {
                      editElement({
                        title: element.title,
                        link: `${e.target.value}`,
                        priority: element.priority,
                        nice_id: '',
                        is_current: false,
                      });
                    } else if (status === 'create') {
                      setAddIssue({
                        title: addIssue.title,
                        link: `${e.target.value}`,
                        priority: addIssue.priority,
                        nice_id: '',
                        is_current: false,
                      });
                    }
                  }}
                />
              </div>
              <div className={s.items}>
                <label htmlFor="link">Priority: </label>
                <Field
                  as="select"
                  name="priority"
                  value={
                    (status === 'create') ? addIssue.priority
                      : (status === 'edit') ? element.priority : ''
                  }
                  className={s.input}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    if (status === 'edit') {
                      editElement({
                        title: element.title,
                        link: element.link,
                        priority: `${e.target.value}`,
                        nice_id: '',
                        is_current: false,
                      });
                    } else if (status === 'create') {
                      setAddIssue({
                        title: addIssue.title,
                        link: addIssue.link,
                        priority: `${e.target.value}`,
                        nice_id: '',
                        is_current: false,
                      });
                    }
                  }}
                >
                  <option value="low">Low</option>
                  <option value="middle">Middle</option>
                  <option value="hight">Hight</option>
                </Field>
              </div>
              <div className={s.buttonContainer}>
                <div className={s.confirm}>
                  <button
                    className={cn('btn btn-secondary btn-lg')}
                    type="submit"
                  >
                    YES
                  </button>
                </div>
                <div className={s.cancel}>
                  <button
                    className={cn('btn btn-outline-secondary btn-lg')}
                    onClick={() => {
                      setActive(true); setAddIssue({
                        title: '',
                        link: '',
                        priority: 'low',
                        nice_id: '',
                        is_current: false,
                      });
                    }}
                  >
                    NO
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div >
  );
};
export default PopapAddIssue;
