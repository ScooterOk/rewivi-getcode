import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Input, Form, Button } from 'antd';

import { postCreatedUpdate } from '../../core/actions';

import Layout from '../../components/Layout/Layout';
import UploadVideo from '../../components/UploadVideo';
import VideoPlayer from '../../components/VideoPlayer';

import video from '../../assets/videos/video.mp4';

import './style.scss';

const { TextArea } = Input;

const HowToStart = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = (values) => {
    // updatePost(values);
    dispatch(postCreatedUpdate(values));
    history.push('/create-job-posting/');
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Layout className="how-to-start" isLogged={true}>
      <h1>How to start Talenttotal</h1>
      <Row gutter={32}>
        <Col span={11}>
          <VideoPlayer src={video} />
        </Col>
        <Col span={13}>
          <div className="how-to-start__form">
            <Form name="basic" form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
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
              </div>

              <Form.Item name="video" valuePropName="fileList" getValueFromEvent={normFile}>
                <UploadVideo
                  params={{}}
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
              </div>
              <Form.Item>
                <Button className="steps-continue" htmlType="submit">
                  Continue
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default HowToStart;
