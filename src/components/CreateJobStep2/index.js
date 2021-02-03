import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Popover, Select, Switch } from 'antd';
import SortableTable from '../CreateJobTable';
import { postCreatedUpdate } from '../../core/actions';
import { IconClose, IconInfo } from '../icons';
import './style.scss';

const { Option } = Select;

const Step2 = ({ updatePost, activatedButtons }) => {
  const getData = (data) => {
    const questions = [];
    data.forEach((item) => {
      questions.push(item.data);
    });
    updatePost({ questions: questions });
    activatedButtons(!data.length);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="create-job__step-2">
      <div className="create-job__table">
        <SortableTable getData={getData} />
      </div>
      <div className="create-job__timing">
        <h2>Timing and additional preferences</h2>
        <div className="form-control">
          <label>Min time for answer</label>
          <Select
            defaultValue="10"
            size="large"
            showArrow={false}
            dropdownClassName="custom-select-dropdown"
            style={{ width: 120 }}>
            <Option value="10">10 sec</Option>
            <Option value="20">20 sec</Option>
            <Option value="30">30 sec</Option>
            <Option value="40">40 sec</Option>
            <Option value="50">50 sec</Option>
            <Option value="60">1 min</Option>
          </Select>
          <Popover
            placement="right"
            content="Not all candidates can answer all the questions with video. You can configure this option on the question list as well."
            getPopupContainer={() => document.querySelector('.create-job')}>
            <span className="popover-icon">
              <IconInfo />
            </span>
          </Popover>
        </div>
        <div className="form-control">
          <label>Max time for answer</label>
          <Select
            defaultValue="1"
            size="large"
            showArrow={false}
            dropdownClassName="custom-select-dropdown"
            style={{ width: 120 }}>
            <Option value="1">1 min</Option>
            <Option value="2">2 min</Option>
            <Option value="3">3 min</Option>
            <Option value="4">4 min</Option>
            <Option value="5">5 min</Option>
          </Select>
        </div>
        <div className="form-control switch">
          <label>
            <Switch size="small" defaultChecked />
            <span>Allow text substitution for all non-required questions</span>
          </label>
          <Popover
            placement="right"
            content="Not all candidates can answer all the questions with video. You can configure this option on the question list as well."
            getPopupContainer={() => document.querySelector('.create-job')}>
            <span className="popover-icon">
              <IconInfo />
            </span>
          </Popover>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    postDetails: state.postCreate,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePost: (data) => {
      dispatch(postCreatedUpdate(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
