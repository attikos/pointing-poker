import React, { useState } from 'react';
import cn from 'classnames';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import * as Yup from 'yup';
import { IIssues } from '../../interface';
import s from './PopapAddIssue.module.scss';

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
});

const PopapAddIssue = (
  props: {
    active: any;
    setActive: (arg0: boolean) => void;
    createNewIssue: (element: IIssues) => void;
    updateIssues: (element: IIssues, index: number) => void;
    editElement: (arg1: IIssues) => void;
    index: number;
    status: string;
    element: IIssues;
    state: {
      issues: IIssues[]
    }
  },
) => {
  const [addIssue, setAddIssue] = useState({
    title: '',
    link: '',
    priority: 'low',
    nice_id: '',
    is_current: false,

  });
  console.log('element', props.element);
  console.log(' status', props.status);
  console.log(' state', props.state);

  const initialValues = {
    title: '',
    link: '',
    priority: 'low',
    nice_id: '',
    is_current: false,
  };

  return (
    <div
      className={cn(s.formLobby,
        { [s.active]: !props.active })}
      onClick={() => props.setActive(true)}
    >
      <div className={s.body}>
        <div
          className={s.content}
          onClick={(e) => e.stopPropagation()}
        >
          <Formik
            initialValues={
              // (props.status === 'create') ? initialValues :
              (props.status === 'edit') ? props.element : initialValues
            }
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              if (props.status === 'create') {
                values = { ...addIssue };
                console.log('values', values);
                props.createNewIssue(values);
                setAddIssue({
                  title: '',
                  link: '',
                  priority: 'low',
                  nice_id: '',
                  is_current: false,
                });
              }
              if (props.status === 'edit') {
                values = { ...props.element };
                props.updateIssues(values, props.index);
              }
              props.setActive(true);
              setSubmitting(false);
            }}
          >
            <Form className={s.form}>
              <div className={s.formLobbyTop}>
                <div className={s.formLobbyHeader}>
                  {(props.status === 'create') ? 'Create Issue' : 'Edit Issue'}
                </div>

              </div>
              <div className={s.items}>
                <label htmlFor="title">Title:</label>
                <Field
                  name="title"
                  className={s.input}
                  // validationSchema={SignupSchema}
                  value={
                    (props.status === 'create') ? addIssue.title
                      : (props.status === 'edit') ? props.element.title : ''
                  }
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    (props.status === 'edit')
                      ? props.editElement({
                        title: `${e.target.value}`,
                        link: props.element.link,
                        priority: props.element.priority,
                        nice_id: '',
                        is_current: false,
                      }) : setAddIssue({
                        title: `${e.target.value}`,
                        link: addIssue.link,
                        priority: addIssue.priority,
                        nice_id: '',
                        is_current: false,
                      });
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
                    (props.status === 'create')
                      ? addIssue.link
                      : (props.status === 'edit') ? props.element.link : ''
                  }
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    console.log('');
                    (props.status === 'edit')
                      ? props.editElement({
                        title: props.element.title,
                        link: `${e.target.value}`,
                        priority: props.element.priority,
                        nice_id: '',
                        is_current: false,
                      }) : setAddIssue({
                        title: addIssue.title,
                        link: `${e.target.value}`,
                        priority: addIssue.priority,
                        nice_id: '',
                        is_current: false,
                      });
                  }}
                />
              </div>
              <div className={s.items}>
                <label htmlFor="link">Priority: </label>
                <Field
                  as="select"
                  name="priority"
                  value={
                    (props.status === 'create') ? addIssue.priority
                      : (props.status === 'edit') ? props.element.priority : ''
                  }
                  className={s.input}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    (props.status === 'edit')
                      ? props.editElement({
                        title: props.element.title,
                        link: props.element.link,
                        priority: `${e.target.value}`,
                        nice_id: '',
                        is_current: false,
                      }) : setAddIssue({
                        title: addIssue.title,
                        link: addIssue.link,
                        priority: `${e.target.value}`,
                        nice_id: '',
                        is_current: false,
                      });
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
                      props.setActive(true); setAddIssue({
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
    </div>
  );
};
export default PopapAddIssue;
