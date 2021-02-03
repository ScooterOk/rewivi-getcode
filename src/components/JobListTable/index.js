import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Tag, Tooltip, Dropdown, Menu, Pagination } from 'antd';
import { fetchPosts, fetchPostDelete } from '../../core/services';
import { withRouter } from 'react-router-dom';
import { columns } from './columns';

import JobListTableFilter from '../JobListTableFilter';

import { IconShare, IconPause, IconPlay, IconDelete, IconClose } from '../icons';

import './style.scss';
import Modal from 'antd/lib/modal/Modal';

class JobListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      filterSource: [],
      deleteModal: false,
      deleteId: null,
      pagination: {
        current: 1,
        total: 0,
        pageSize: 0,
      },
      postStatus: {
        1: 'DRAFT',
        2: 'PUBLISHED',
        3: 'UNPUBLISHED',
        4: 'PAUSED',
      },
      sorter: {},
      filter: {},
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.postsList) !== JSON.stringify(this.props.postsList) && this.props.postsList.data) {
      const editPostList = JSON.parse(JSON.stringify(this.props.postsList.data));
      editPostList.map((item) => (item.key = '' + item.id));
      if (this.props.postsList.last_page < this.props.postsList.current_page) {
        this.props.fetchPosts(`?&page=${this.props.postsList.last_page}`);
      } else {
        this.setState({
          dataSource: editPostList,
          filterSource: editPostList,
          pagination: {
            current: this.props.postsList.current_page,
            total: this.props.postsList.total,
            pageSize: this.props.postsList.per_page,
          },
        });
      }
    }
  }

  setResults = (results) => {
    this.setState({
      filter: results,
    });
    setTimeout(() => {
      this.updateTable();
    }, 0);
    // this.setState({
    //   filterSource: results.length ? results : this.state.dataSource,
    // });
  };

  onDeleteModal = (id) => {
    this.setState({
      deleteId: id,
    });
    this.setState({
      deleteModal: true,
    });
  };
  onDelete = () => {
    const id = this.state.deleteId;
    this.props.fetchPostDelete(id).then((error) => {
      if (!error) this.updateTable();
    });
    this.setState({
      deleteModal: false,
    });
  };

  updateTable() {
    let params = '?';
    for (let i in this.state.sorter) {
      params = `${params}sort=${this.state.sorter[i] === 'descend' ? '-' : ''}${i}`;
    }
    for (let i in this.state.filter) {
      params = `${params}&filter[${i}]=`;
      for (let n in this.state.filter[i]) {
        params = `${params}${n === 'published' ? 2 : 1},`;
      }
    }
    params = `${params}&page=${this.state.pagination.current}`;
    this.props.fetchPosts(params);
  }

  handleChange(pagination, filters, sorter, extra) {
    const status = {};
    if (sorter.order) status[sorter.field] = sorter.order;
    this.setState({
      sorter: status,
    });
    setTimeout(() => {
      this.updateTable();
    }, 0);
  }

  paginationOnChange(page) {
    this.setState({
      pagination: {
        ...this.state.pagination,
        current: page,
      },
    });
    setTimeout(() => {
      this.updateTable();
    }, 0);
  }

  render() {
    return (
      <div className="job-list-table">
        <div className="job-list-table__actions">
          <JobListTableFilter data={this.state.dataSource} setResults={this.setResults} />
          {/* <Select
            defaultValue="latest"
            size="large"
            showArrow={false}
            className="actions--select"
            dropdownClassName="custom-select-dropdown"
            style={{ width: 200 }}>
            <Option value="latest">Latest</Option>
            <Option value="newtest">Newtest</Option>
          </Select> */}
          <Button
            type="primary"
            className="full"
            onClick={() => {
              this.props.history.push('/create-job-posting/');
            }}>
            Create new
          </Button>
        </div>
        <Table
          columns={columns(this.onDeleteModal, this.state.postStatus)}
          dataSource={this.state.dataSource}
          onChange={(pagination, filters, sorter, extra) => {
            this.handleChange(pagination, filters, sorter, extra);
          }}
          pagination={false}
          //scroll={{ x: true }}
          loading={this.props.postsLoading}
        />
        {this.state.pagination.total > 10 && (
          <Pagination
            current={this.state.pagination.current}
            total={this.state.pagination.total}
            pageSize={this.state.pagination.pageSize}
            onChange={(page) => {
              this.paginationOnChange(page);
            }}
          />
        )}
        <Modal
          visible={this.state.deleteModal}
          closable={true}
          width={610}
          className="delete-modal"
          closeIcon={<IconClose />}
          footer={[
            <Button
              key="back"
              type="text"
              onClick={() => {
                this.setState({ deleteModal: false });
              }}>
              Pause
            </Button>,
            <Button key="submit" type="primary" onClick={this.onDelete}>
              Delete
            </Button>,
          ]}
          onCancel={() => {
            this.setState({ deleteModal: false });
          }}>
          <div className="modal__title">Are you sure you want to delete the job posting?</div>
          <div className="modal__text">
            If you delete — you lost the time of camplaing, You can pause it for 30 days maximun and turn on any time
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ postsList }) {
  return {
    postsList: postsList.postList,
    postsLoading: postsList.loader,
    postsLoadingError: postsList.error,
    deleteSuccess: postsList.deleteSuccess,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: fetchPosts(dispatch),
    fetchPostDelete: fetchPostDelete(dispatch),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobListTable));
