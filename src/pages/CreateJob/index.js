import React, { useState } from 'react';
import { PageHeader, Button, Steps, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';
import Step1 from '../../components/CreateJobStep1';
import Step2 from '../../components/CreateJobStep2';

import './style.scss';
import { connect } from 'react-redux';
import { fetchPostsCreate } from '../../core/services';
import VideoPlayer from '../../components/VideoPlayer';

import iconImportant from '../../assets/img/important.svg';
import iconText from '../../assets/img/text.svg';

const { Step } = Steps;

const CreateJob = ({ fetchPostsCreate, postData }) => {
  const [current, setCurrent] = useState(0);
  const [buttonsActive, setButtonsActive] = useState(true);
  const [previewModal, setPreviewModal] = useState(false);
  const [videoSrc, setVideoSrc] = useState();
  const [clientLogoSrc, setClientLogoSrc] = useState();
  const history = useHistory();

  const { post } = postData;

  const steps = [
    {
      title: 'Step 1.',
      subTitle: 'General information',
      content: <Step1 nextStep={() => setCurrent((prevCurrent) => prevCurrent + 1)} />,
    },
    {
      title: 'Step 2.',
      subTitle: 'Questions',
      content: (
        <Step2
          activatedButtons={(status) => {
            setButtonsActive(status);
          }}
        />
      ),
    },
  ];

  const createPost = () => {
    fetchPostsCreate(postData, 'publish', history);
    setPreviewModal(false);
  };

  const openModal = () => {
    if (post.client_logo) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setClientLogoSrc(e.target.result);
      };
      reader.onprogress = function (e) {
        console.log('progress: ', Math.round((e.loaded * 100) / e.total));
      };
      reader.readAsDataURL(post.client_logo);
    }
    if (post.video) {
      setVideoSrc(URL.createObjectURL(post.video));
    }
    setPreviewModal(true);
  };

  const shareDraft = () => {
    fetchPostsCreate(postData, 'draft');
    setPreviewModal(false);
  };

  return (
    <Layout className="create-job" isLogged={true}>
      <Link to="">Back to the list</Link>
      <PageHeader
        title="Create a Job posting"
        subTitle="Changes Saved"
        backIcon={false}
        extra={[
          <Button key="3" type="text" onClick={shareDraft} disabled={buttonsActive}>
            Share a draft
          </Button>,
          <Button key="2" type="text" onClick={openModal} disabled={buttonsActive}>
            Preview
          </Button>,

          <Button
            key="1"
            type="primary"
            loading={postData.loader}
            className="full"
            onClick={createPost}
            disabled={buttonsActive}>
            Publish
          </Button>,
        ]}
      />
      <div className="steps-header">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} subTitle={item.subTitle} />
          ))}
        </Steps>
      </div>
      <div className={`steps-content step-${current + 1}`}>{steps[current].content}</div>
      <Modal
        visible={previewModal}
        closable={false}
        width={800}
        className="post-create-preview-modal"
        footer={false}
        onCancel={() => {
          setPreviewModal(false);
        }}>
        <div className="post-create-preview-modal__header">
          <div className="header--comany">
            {post.client_logo && <img src={clientLogoSrc} alt="" />}
            <span>{post.client_name}</span>
          </div>
          <div className="header--actions">
            <Button type="text" onClick={shareDraft}>
              Share a draft
            </Button>
            ,
            <Button key="submit" type="primary" onClick={createPost}>
              Publish
            </Button>
          </div>
        </div>
        <div className="post-create-preview-modal__body">
          <h2>{post.title}</h2>
          {post.video && <VideoPlayer src={videoSrc} />}
          <div className="body--description">{post.description}</div>
          <div className="body--questions">
            <h3>Questions:</h3>
            <ul>
              {post.questions.map((el, i) => (
                <li key={`key-${i}`}>
                  {el.required && (
                    <span>
                      <img src={iconImportant} alt="" />
                    </span>
                  )}
                  {el.text_allowed && (
                    <span>
                      <img src={iconText} alt="" />
                    </span>
                  )}
                  {el.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="post-create-preview-modal__footer">
          <div className="footer-wrapper">
            <div className="footer--comany-logo">
              {post.client_logo && <img src={clientLogoSrc} alt="" />}
              <span>{post.client_name}</span>
            </div>
            <div className="footer--comany-description">
              <span>{post.client_description}</span>
            </div>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

function mapStateToProps({ postCreate }) {
  return {
    postData: postCreate,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostsCreate: fetchPostsCreate(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateJob);
