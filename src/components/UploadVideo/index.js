import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Upload } from 'antd';
import videojs from 'video.js';
import RecordRTC from 'recordrtc';
import Record from 'videojs-record/dist/videojs.record.js';

import ViderPlayer from '../VideoPlayer';

import iconUpload from '../../assets/img/icon-upload-video.svg';
import iconRec from '../../assets/img/icon-rec.svg';

import 'video.js/dist/video-js.min.css';
import 'videojs-record/dist/css/videojs.record.css';
import './style.scss';

const UploadVideo = ({ file, getVideo }) => {
  const [videoScr, setVideoScr] = useState(null);
  const [recordVidible, setRecordVidible] = useState(false);
  const [fileList, setFileList] = useState(null);

  const { Dragger } = Upload;

  useEffect(() => {
    //videoRecord();
    if (file) {
      setVideoScr(URL.createObjectURL(file));

      setFileList([file]);
    }
  }, []);

  const customRequest = ({ file, onSuccess }) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      setVideoScr(e.target.result);
      getVideo(file, e.target.result);
    };

    reader.readAsDataURL(file);
    setFileList([file]);
    onSuccess('ok');
  };

  const onRemove = (e) => {
    setVideoScr(null);
    setFileList([]);
  };

  const startRecord = () => {
    setRecordVidible(true);
    setTimeout(() => {
      videoRecord();
    }, 0);
  };

  const videoRecord = () => {
    var options = {
      controls: true,
      bigPlayButton: false,
      width: 1280,
      plugins: {
        record: {
          audio: true,
          video: true,
          maxLength: 10,
          displayMilliseconds: false,
          debug: true,
        },
      },
    };

    // apply some workarounds for certain browsers
    //applyVideoWorkaround();

    var player = videojs('myVideo', options, function () {
      // print version information at startup
      var msg =
        'Using video.js ' +
        videojs.VERSION +
        ' with videojs-record ' +
        videojs.getPluginVersion('record') +
        ' and recordrtc ' +
        RecordRTC.version;
      videojs.log(msg);
    });

    // error handling
    player.on('deviceError', function () {
      console.log('device error:', player.deviceErrorCode);
    });

    player.on('error', function (element, error) {
      console.error(error);
    });

    // user clicked the record button and started recording
    player.on('startRecord', function () {
      console.log('started recording!');
    });

    // user completed recording and stream is available
    player.on('finishRecord', function () {
      // the blob object contains the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log('finished recording: ', player.recordedData);

      const file = new File([player.recordedData], player.recordedData.name, { type: player.recordedData.type });

      const reader = new FileReader();

      reader.onload = function (e) {
        setRecordVidible(false);
        setVideoScr(URL.createObjectURL(player.recordedData));
        getVideo(file, e.target.result);
        console.log(player);
        player.record().destroy();
      };

      reader.readAsDataURL(file);
      setFileList([file]);
    });
  };

  // const props = {
  //   name: "file",
  //   multiple: true,
  //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  //videoRecord();

  return (
    <Row gutter={16}>
      {!recordVidible && (
        <Col span={videoScr ? 24 : 12}>
          {videoScr && (
            <div className="video-player-wrapper">
              <ViderPlayer src={videoScr} />
            </div>
          )}
          <Dragger
            className={`upload-dragger ${videoScr ? 'preview' : ''}`}
            customRequest={customRequest}
            onRemove={onRemove}
            fileList={fileList}
            accept="video/*">
            <p className="dragger--icon">
              <img src={iconUpload} alt="" />
            </p>
            <p className="dragger--text">Upload the video</p>
          </Dragger>
        </Col>
      )}

      {!videoScr && (
        <Col span={recordVidible ? 24 : 12}>
          <video
            id="myVideo"
            playsInline
            className="video-js vjs-default-skin video-record"
            style={{ display: recordVidible ? 'block' : 'none' }}></video>
          {!recordVidible && (
            <div className="record-video" onClick={startRecord}>
              <div className="record--icon">
                <img src={iconRec} alt="" />
              </div>
              <div className="record--text">Record the video</div>
            </div>
          )}
        </Col>
      )}
    </Row>
  );
};

export default UploadVideo;
