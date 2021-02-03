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
          <h1 className="thank-you">Thank you! </h1>
          <div className="contact-us__request-message">
            Check your email, we’ll <br /> answer soon
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout isLogged={false} className="hello-page">
      <div className="hello-page__wrapper">
        <h1>For any question — contact us</h1>
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
              <Form.Item
                label="Your request"
                name="request"
                className="contact-us__request-fuild"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}>
                <Input.TextArea placeholder="Please add your request" autoComplete="off" />
              </Form.Item>
              <Form.Item className="hello-form__submit">
                <Button type="primary" htmlType="submit" size="large">
                  Request answer
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
