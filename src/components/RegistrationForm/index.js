import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/';
import { Form, Input, Button, Checkbox, Select } from 'antd';
const { Option } = Select;

class Signup extends Component {
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="hello-form">
        <Form
          name="basic"
          layout="vertical"
          requiredMark={false}
          onFinish={(data) => {
            this.props.registrationRequest(data);
          }}
          //onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Your Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}>
            <Input placeholder="Please add your name" autoComplete="new-password" />
          </Form.Item>
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
            <Input placeholder="Please add your email" autoComplete="new-password" />
          </Form.Item>

          <Form.Item
            label="Your Country"
            name="country_id"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}>
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              className="country-select"
              autoComplete="new-password"
              // onChange={onChange}
              // onFocus={onFocus}
              // onBlur={onBlur}
              // onSearch={onSearch}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
              <Option value="1">Angola</Option>
              <Option value="2">Fiji</Option>
              <Option value="3">Saint Kitts and Nevis</Option>
            </Select>
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

          <div className="hello-form__checkboxs">
            {/* <Form.Item name="recruiting" valuePropName="checked">
              <Checkbox>I'm from recruiting agency</Checkbox>
            </Form.Item> */}
            <Form.Item
              name="agree"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => (value ? Promise.resolve() : Promise.reject('Should accept agreement')),
                },
              ]}>
              <Checkbox>
                I agree with <Link to="">everything</Link>
              </Checkbox>
            </Form.Item>
          </div>

          <Form.Item className="hello-form__submit">
            <Button type="primary" htmlType="submit" loading={this.props.loading}>
              Start
            </Button>
          </Form.Item>
        </Form>
        <div className="hello-form__link">
          Have account already? <Link to="/sign-in/">Log in</Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({});

export default connect(null, mapDispatchToProps)(Signup);
