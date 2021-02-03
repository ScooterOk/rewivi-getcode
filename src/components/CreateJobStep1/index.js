import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Input, Upload, Button, Popover, Form } from 'antd';
import UploadVideo from '../UploadVideo';

import InputAutocomplete from '../InputAutocomlete';
import { postCreatedUpdate } from '../../core/actions';
import { fetchUserQestions } from '../../core/services';

import Tags from '../Tags';
import { IconInfo } from '../icons';

import './style.scss';

const { TextArea } = Input;

const Step1 = ({ nextStep, updatePost, fetchUserQestions, preload }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    //fetchUserQestions();
    console.log(preload);
    fetchUserQestions();
  }, []);

  const customRequest = ({ file, onSuccess }) => {
    form.setFieldsValue({
      client_logo: file,
    });
    onSuccess('ok');
  };
  const onFinish = (values) => {
    updatePost(values);
    nextStep();
    console.log(values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="create-job__step-1">
      <div className="steps-wrapper">
        <Form
          name="basic"
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          initialValues={{
            title: preload.title,
            description: preload.description,
          }}>
          <div className="form-control">
            <Form.Item
              label="Name of the Vacant Position"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name of the Vacant Position!',
                },
              ]}>
              <TextArea placeholder="Please add Name of the vacant position" />
            </Form.Item>
            <Popover
              placement="right"
              content="This will be a title of the Questionnaire which candidate will see. Use the job title and some interesting details here"
              getPopupContainer={() => document.querySelector('.create-job')}>
              <span className="popover-icon">
                <IconInfo />
              </span>
            </Popover>
          </div>

          <Form.Item name="video" valuePropName="fileList" getValueFromEvent={normFile}>
            <UploadVideo
              file={preload.video}
              getVideo={(file) => {
                form.setFieldsValue({
                  video: file,
                });
              }}
            />
          </Form.Item>
          <div className="form-control">
            <Form.Item
              label="Position description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input your Position description!',
                },
              ]}>
              <TextArea placeholder="Please add Name of the vacant position" showCount maxLength={100} />
            </Form.Item>
            <Popover
              placement="right"
              content="This will be a title of the Questionnaire which candidate will see. Use the job title and some interesting details here"
              getPopupContainer={() => document.querySelector('.create-job')}>
              <span className="popover-icon">
                <IconInfo />
              </span>
            </Popover>
          </div>

          <div className="steps__client">
            <Form.Item
              name="client_name"
              label="Client"
              valuePropName="value"
              rules={[
                {
                  required: true,
                  message: 'Please input your Client!',
                },
              ]}>
              <InputAutocomplete
                placeholder="Company Name"
                onSelect={(e) => {
                  form.setFieldsValue({
                    client_name: e,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              name="client_description"
              rules={[
                {
                  required: true,
                  message: 'Please input your Company description!',
                },
              ]}>
              <TextArea placeholder="Company description" />
            </Form.Item>
            <Popover
              placement="right"
              content={
                <div>
                  <p>
                    Start typing. The company info can appear from the list of created you can create a new one. Manage
                    the list in
                  </p>
                  <a href="">Client space</a>
                </div>
              }
              getPopupContainer={() => document.querySelector('.create-job')}>
              <span className="popover-icon">
                <IconInfo />
              </span>
            </Popover>
          </div>

          <Form.Item name="client_logo" hidden={true}>
            <Input />
          </Form.Item>

          <div className="form-control">
            <Upload maxCount={1} customRequest={customRequest} accept="image/*" className="steps-company-upload">
              <span>Upload company logo</span>
            </Upload>
          </div>

          <Form.Item name="tags" label="Tags">
            <div className="tags-control">
              <Tags />
            </div>
          </Form.Item>

          <Form.Item>
            <Button className="steps-continue" htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    preload: state.postCreate.post,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (data) => {
      dispatch(postCreatedUpdate(data));
    },
    fetchUserQestions: fetchUserQestions(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
