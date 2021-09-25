import React, { useState } from 'react';
import cn from 'classnames';
import {
  Field, Form, Formik, FormikHelpers,
} from 'formik';
import * as Yup from 'yup';
import { ICreateIssue, IIssue } from '../../interface';
import { TPopupIssueStatus, TIssuePriority } from '../../types';
import s from './PopapAddIssue.module.scss';
import api from '../../services/api';

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
});

interface Props {
  active: boolean;
  setActive: (arg0: boolean) => void;
  editElement: (arg1: ICreateIssue) => void;
  index: number;
  status: TPopupIssueStatus;
  element: ICreateIssue;
}

const PopapAddIssue = ({ active, setActive, editElement, index, status, element }: Props): JSX.Element => {
  const initialValues:ICreateIssue = {
    title: '',
    link: '',
    priority: 'low',
    isCurrent: false,
  };

  const [addIssue, setAddIssue] = useState<ICreateIssue>(initialValues);

  const createNewIssue = (el: ICreateIssue) => {
    api.addIssue(el);
  };

  const updateIssues = (el: IIssue | ICreateIssue, i: number) => {
    console.log('updateIssues', el);

    api.addIssue(el);
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
              (status === 'edit') ? element : initialValues
            }
            // validationSchema={SignupSchema}
            onSubmit={(values:IIssue | ICreateIssue, { setSubmitting }) => {
              if (status === 'create') {
                values = { ...addIssue };
                createNewIssue(values);
                setAddIssue({
                  title: '',
                  link: '',
                  priority: 'low',
                  isCurrent: false,
                });
              }
              if (status === 'edit') {
                values = { ...element };
                console.log('values', values);

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
                        isCurrent: false,
                      });
                    } else if (status === 'create') {
                      setAddIssue({
                        title: `${e.target.value}`,
                        link: addIssue.link,
                        priority: addIssue.priority,
                        isCurrent: false,
                      });
                    }
                  }}
                />
              </div>
              {/* <span className={s.error}>
                <ErrorMessage name="title" />
              </span> */}
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
                        isCurrent: false,
                      });
                    } else if (status === 'create') {
                      setAddIssue({
                        title: addIssue.title,
                        link: `${e.target.value}`,
                        priority: addIssue.priority,
                        isCurrent: false,
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
                    const newPriority = e.target.value as TIssuePriority;

                    if (status === 'edit') {
                      editElement({
                        title: element.title,
                        link: element.link,
                        priority: newPriority,
                        isCurrent: false,
                      });
                    } else if (status === 'create') {
                      setAddIssue({
                        title: addIssue.title,
                        link: addIssue.link,
                        priority: newPriority,
                        isCurrent: false,
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
                        isCurrent: false,
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

