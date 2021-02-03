import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

import LoginForm from '../../components/LoginForm';

import './style.scss';

const HowToStart = (props) => {
  const [success, setSuccess] = useState(false);

  const onFinish = (form) => {
    setSuccess(true);
  };

  if (success) {
    return (
      <Layout isLogged={false} className="hello-page">
        <div className="hello-page__wrapper">
          <h1>Recovery link is on your email</h1>
          <div className="hello-page__sub-title">Don’t see it?</div>
          <div className="recovery-instruction">
            <ol>
              <li>Check Spam folder</li>
              <li>
                <Link to="">Click here and we resend the link</Link>
              </li>
            </ol>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout isLogged={false} className="hello-page">
      <div className="hello-page__wrapper">
        <h1>Password recovery</h1>
        <div className="hello-page__sub-title">Type your email and we send you a recovery link</div>
        <div className="hello-page__form">
          <div className="hello-form">
            <Form name="basic" layout="vertical" requiredMark={false} onFinish={onFinish}>
              <Form.Item
                label="Your Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please input your username!',
                  },
                ]}>
                <Input placeholder="Please add your email" autoComplete="off" />
              </Form.Item>
              <Form.Item className="hello-form__submit">
                <Button type="primary" htmlType="submit">
                  Get a link
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowToStart;
