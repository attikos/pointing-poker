import React, { useState } from 'react';
import cn from 'classnames';
import {
  ErrorMessage,
  Field, Form, Formik,
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
  editElement: (arg1: IIssue) => void;
  index: number;
  status: TPopupIssueStatus;
  element: IIssue;
}

const PopapAddIssue = ({ active, setActive, editElement, status, element }: Props): JSX.Element => {

  const initialValues: ICreateIssue = {
    title: '',
    link: '',
    priority: 'low',
    isCurrent: false,
  };

  const [addIssue, setAddIssue] = useState<ICreateIssue>(initialValues);

  const createNewIssue = (el: IIssue | ICreateIssue) => {
    api.addIssue(el);
  };

  const updateIssues = (el: IIssue | ICreateIssue) => {
    api.addIssue(el);
  };

  const valueInput = (value: ICreateIssue | IIssue, input: string | TIssuePriority) => {
    if (input === 'title') {
      if (status === 'create') {
        value.title = addIssue.title;
      }
      if (status === 'edit') {
        value.title = element.title;
      }
      return value.title;
    }
    if (input === 'link') {
      if (status === 'create') {
        value.link = addIssue.link;
      }
      if (status === 'edit') {
        value.link = element.link;
      }
      return value.link;
    }
    if (input === 'priority') {
      if (status === 'create') {
        value.priority = addIssue.priority;
      }
      if (status === 'edit') {
        value.priority = element.priority;
      }
      return value.priority;
    }
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
            validationSchema={SignupSchema}

            onSubmit={(values: ICreateIssue | IIssue, { setSubmitting }) => {
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
                updateIssues(values);
              }
              setActive(true);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
            }) => (
              <Form className={s.form}>
                <div className={s.formLobbyTop}>
                  <div className={s.formLobbyHeader}>
                    {(status === 'create') ? 'Create Issue' : 'Edit Issue'}
                  </div>

                </div>
                <div className={s.items}>
                  <label htmlFor="title">Title:</label>
                  <div className="input-group has-validation mb-3">
                    <Field
                      name="title"
                      className={cn('form-control', s.input,
                        { 'is-invalid': errors.title && touched.title })}
                      value={valueInput(values, 'title')}
                      onInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        handleChange('title');
                        if (status === 'edit') {
                          editElement({
                            title: `${e.target.value}`,
                            link: element.link,
                            priority: element.priority,
                            isCurrent: false,
                            id: element.id,
                            status: element.status,
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

                </div>
                <span className={cn('invalid-feedback', s.error)}>
                  <ErrorMessage name="title" />
                </span>
                <div className={s.items}>
                  <label htmlFor="link">Link:</label>
                  <div className="input-group has-validation mb-3">
                    <Field
                      name="link"
                      className={cn('form-control', s.input)}
                      value={valueInput(values, 'link')}
                      onInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        handleChange('link');
                        if (status === 'edit') {
                          editElement({
                            title: element.title,
                            link: `${e.target.value}`,
                            priority: element.priority,
                            isCurrent: false,
                            status: element.status,
                            id: element.id,
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
                </div>
                <div className={s.items}>
                  <label htmlFor="link">Priority: </label>
                  <div className="input-group has-validation mb-3">
                    <Field
                      as="select"
                      name="priority"
                      value={valueInput(values, 'priority')}
                      className={cn('custom-select', s.select, s.input)}
                      id="inputGroupSelect03"
                      onInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const newPriority = e.target.value as TIssuePriority;
                        handleChange('priority');

                        if (status === 'edit') {
                          editElement({
                            title: element.title,
                            link: element.link,
                            priority: newPriority,
                            isCurrent: false,
                            status: element.status,
                            id: element.id,
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
                </div>
                <div className={s.buttonContainer}>
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
                  <div className={s.confirm}>
                    <button
                      className={cn('btn btn-secondary btn-lg')}
                      type="submit"
                    >
                      YES
                    </button>
                  </div>
                 
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div >
  );
};
export default PopapAddIssue;

