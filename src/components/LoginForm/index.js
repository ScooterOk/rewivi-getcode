import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/';
import { Form, Input, Button, Checkbox, Select } from 'antd';
const { Option } = Select;

class Signup extends Component {
  render() {
    return (
      <div className="hello-form">
        <Form
          name="basic"
          layout="vertical"
          requiredMark={false}
          onFinish={(data) => {
            this.props.loginRequest(data);
          }}
          //onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Your Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
                message: 'Please input your email!',
              },
            ]}>
            <Input placeholder="Please add your email" />
          </Form.Item>

          <Form.Item
            label="Your Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}>
            <Input.Password placeholder="Please create your password" />
          </Form.Item>

          <Form.Item className="hello-form__submit">
            <Button type="primary" htmlType="submit" loading={this.props.loading}>
              Start
            </Button>
          </Form.Item>
        </Form>
        <div className="hello-form__link">
          <Link to="/password-recovery/">Forgot the password?</Link>
        </div>
        <div className="hello-form__footer-link">
          New in Rewivi? <Link to="/sign-up/">Sign up here</Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(null, mapDispatchToProps)(Signup);
