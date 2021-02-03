import React from 'react';
import Library from '../../assets/img/library.svg';
import Settings from '../../assets/img/settings.svg';
import Candidates from '../../assets/img/candidates.svg';
import Clients from '../../assets/img/clients.svg';
import Postings from '../../assets/img/postings.svg';
import Replies from '../../assets/img/replies.svg';

import './icons.scss';

const IconLibrary = () => {
  return <img src={Library} alt="" />;
};
const IconSettings = () => {
  return <img src={Settings} alt="" />;
};
const IconCandidates = () => {
  return <img src={Candidates} alt="" />;
};
const IconClients = () => {
  return <img src={Clients} alt="" />;
};
const IconPostings = () => {
  return <img src={Postings} alt="" />;
};
const IconReplies = () => {
  return <img src={Replies} alt="" />;
};

const IconInfo = () => {
  return (
    <svg className="icon-info" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <g fill="none" fillRule="evenodd">
        <g>
          <g transform="translate(-912 -338) translate(912 338)">
            <path d="M0 0L16 0 16 16 0 16z" />
            <circle cx="8" cy="8" r="8" />
            <rect width="2" height="7" x="7" y="6" rx="1" />
            <rect width="2" height="2" x="7" y="3" rx="1" />
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconDelete = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="icon-delete">
      <g fill="none" fillRule="evenodd">
        <g className="icon-delete--fill">
          <g>
            <path
              d="M11.848 15.797c.545 0 .987-.442.987-.987V6.911c0-.545-.442-.987-.987-.987-.545 0-.988.442-.988.987v7.899c0 .545.443.987.988.987zm-5.924 0c.545 0 .988-.442.988-.987V6.911c0-.545-.443-.987-.988-.987-.545 0-.987.442-.987.987v7.899c0 .545.442.987.987.987zm-2.962 1.975H14.81V3.95H2.962v13.823zM16.784 1.975h-2.961V.987c0-.545-.443-.987-.988-.987H4.937c-.545 0-.988.442-.988.987v.988H.987c-.546 0-.987.442-.987.987 0 .545.441.987.987.987v13.823c0 1.09.884 1.974 1.975 1.974H14.81c1.09 0 1.974-.883 1.974-1.974V3.95c.545 0 .988-.442.988-.987 0-.545-.443-.987-.988-.987zM8.886 15.797c.545 0 .987-.442.987-.987V6.911c0-.545-.442-.987-.987-.987-.545 0-.987.442-.987.987v7.899c0 .545.442.987.987.987z"
              transform="translate(-854 -400) translate(854 400) translate(3 2)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconShare = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="icon-share">
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <path d="M0 0L24 0 24 24 0 24z" transform="translate(-1240 -268) translate(1240 268)" />
            <path
              className="icon-share--fill"
              d="M17.333 15.666c-.675 0-1.28.27-1.742.693l-6.338-3.733c.045-.207.08-.414.08-.63 0-.216-.035-.423-.08-.63L15.52 7.67c.48.45 1.111.729 1.813.729 1.476 0 2.667-1.206 2.667-2.7C20 4.206 18.809 3 17.333 3c-1.475 0-2.666 1.205-2.666 2.699 0 .216.035.423.08.63L8.48 10.026c-.48-.45-1.111-.729-1.813-.729C5.19 9.297 4 10.503 4 11.996c0 1.493 1.191 2.699 2.667 2.699.702 0 1.333-.28 1.813-.729l6.329 3.742c-.045.19-.071.387-.071.585 0 1.449 1.164 2.627 2.595 2.627 1.431 0 2.596-1.178 2.596-2.627 0-1.448-1.165-2.627-2.596-2.627zm0-10.867c.49 0 .89.405.89.9s-.4.9-.89.9c-.489 0-.889-.405-.889-.9s.4-.9.89-.9zM6.667 12.896c-.49 0-.89-.405-.89-.9s.4-.9.89-.9c.489 0 .889.405.889.9s-.4.9-.89.9zm10.666 6.315c-.489 0-.889-.405-.889-.9s.4-.9.89-.9c.488 0 .888.405.888.9s-.4.9-.889.9z"
              transform="translate(-1240 -268) translate(1240 268)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconPause = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="icon-pause">
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <path d="M0 0L24 0 24 24 0 24z" transform="translate(-1288 -268) translate(1288 268)" />
            <path
              className="icon-pause--fill"
              d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"
              transform="translate(-1288 -268) translate(1288 268)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconPlay = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="icon-play">
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <path d="M0 0L24 0 24 24 0 24z" transform="translate(-1288 -220) translate(1288 220)" />
            <path
              className="icon-play--fill"
              d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2V6z"
              transform="translate(-1288 -220) translate(1288 220)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconClose = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="icon-close">
      <defs>
        <filter id="ueyyoz5sma">
          <feColorMatrix
            in="SourceGraphic"
            values="0 0 0 0 0.117647 0 0 0 0 0.117647 0 0 0 0 0.235294 0 0 0 1.000000 0"
          />
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g
              //filter='url(#ueyyoz5sma)'
              transform="translate(-957 -24) translate(933) translate(24 24)">
              <path d="M0 0L24 0 24 24 0 24z" />
              <path
                className="icon-close--fill"
                fillRule="nonzero"
                d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

const IconWarning = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <path d="M0 0L24 0 24 24 0 24z" transform="translate(-992 -168) translate(974 144) translate(18 24)" />
              <path
                fill="#F22245"
                fillRule="nonzero"
                d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
                transform="translate(-992 -168) translate(974 144) translate(18 24)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export {
  IconLibrary,
  IconSettings,
  IconCandidates,
  IconClients,
  IconPostings,
  IconReplies,
  IconInfo,
  IconDelete,
  IconShare,
  IconPause,
  IconPlay,
  IconClose,
  IconWarning,
};
