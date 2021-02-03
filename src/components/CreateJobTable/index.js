import React from 'react';
import { Table, Checkbox, Input, Button } from 'antd';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';

import QuestionSearch from '../QuestionSearch';
import { IconDelete } from '../icons';

import './style.scss';
import Form from 'antd/lib/form/Form';

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />);

const SortableItem = sortableElement((props) => <tr {...props} />);
const SortableContainer = sortableContainer((props) => <tbody {...props} />);

let keyCount = 0;

class SortableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      dataSource: [],
      checkAll: {
        required: {
          checked: false,
          indeterminate: false,
        },
        text_allowed: {
          checked: false,
          indeterminate: false,
        },
        in_library: {
          checked: false,
          indeterminate: false,
        },
      },
    };
    this.inputRef = React.createRef();
    this.columns = [
      {
        dataIndex: 'sort',
        width: 30,
        className: 'sort',
        render: () => <DragHandle />,
      },
      {
        title: (
          <>
            <div className="head--name">Questions</div>
            <QuestionSearch
              onSelect={(value) => {
                const newItem = {
                  title: value,
                  required: false,
                  text_allowed: false,
                  in_library: false,
                };
                const data = [...this.state.dataSource, this.tableRowCreate(newItem)];
                this.setState({
                  dataSource: data,
                });
                this.checkBoxsStatus();
                this.props.getData(data);
              }}
            />
          </>
        ),
        dataIndex: 'question',
        className: 'question',
      },
      {
        title: () => (
          <>
            <div className="head--name">Required</div>
            <Checkbox
              checked={this.state.checkAll.required.checked}
              indeterminate={this.state.checkAll.required.indeterminate}
              onChange={(e) => {
                this.headOnChange(e, 'required');
              }}
            />
          </>
        ),

        dataIndex: 'required',
        className: 'required',
      },
      {
        title: () => (
          <>
            <div className="head--name">Text substitution</div>
            <Checkbox
              checked={this.state.checkAll.text_allowed.checked}
              indeterminate={this.state.checkAll.text_allowed.indeterminate}
              onChange={(e) => {
                this.headOnChange(e, 'text_allowed');
              }}
            />
          </>
        ),
        className: 'text_allowed',
        dataIndex: 'text_allowed',
      },
      {
        title: () => (
          <>
            <div className="head--name">Add to library</div>
            <Checkbox
              checked={this.state.checkAll.in_library.checked}
              indeterminate={this.state.checkAll.in_library.indeterminate}
              onChange={(e) => {
                this.headOnChange(e, 'in_library');
              }}
            />
          </>
        ),
        className: 'in_library',
        dataIndex: 'in_library',
      },
    ];
  }

  // componentDidMount() {
  //   const dataSource = [];
  //   this.state.data.forEach((el, i) => {
  //     const row = this.tableRowCreate(el);
  //     row.index = i;
  //     dataSource.push(row);
  //   });
  //   this.setState({
  //     dataSource: dataSource,
  //   });
  //   this.checkBoxsStatus();
  // }

  tableRowCreate({ title, required, text_allowed, in_library, key, newRow }) {
    key = key || (keyCount + 1).toString();
    const row = {
      key: key,
      question: (
        <div className="questions-table__input">
          {newRow ? (
            <Input
              name={key}
              placeholder="Type the first question"
              defaultValue={title}
              onBlur={(e) => {
                this.onChangeQuestion(e.target.value, key);
              }}
              onPressEnter={(e) => {
                this.onChangeQuestion(e.target.value, key);
              }}
              ref={this.inputRef}
            />
          ) : (
            <Input
              name={key}
              placeholder="Type the first question"
              defaultValue={title}
              onBlur={(e) => {
                this.onChangeQuestion(e.target.value, key);
              }}
              onPressEnter={(e) => {
                this.onChangeQuestion(e.target.value, key);
              }}
            />
          )}

          <button
            onClick={() => {
              this.onDeleteRow(key);
            }}>
            <IconDelete />
          </button>
        </div>
      ),
      required: (
        <Checkbox
          defaultChecked={required}
          checked={required}
          onChange={(e) => {
            this.checkOnChange({
              title,
              required: e.target.checked,
              text_allowed,
              in_library,
              key,
              name: 'required',
            });
          }}
        />
      ),
      text_allowed: (
        <Checkbox
          defaultChecked={text_allowed}
          checked={text_allowed}
          onChange={(e) => {
            this.checkOnChange({
              title,
              required,
              text_allowed: e.target.checked,
              in_library,
              key,
              name: 'text_allowed',
            });
          }}
        />
      ),
      in_library: (
        <Checkbox
          defaultChecked={in_library}
          checked={in_library}
          onChange={(e) => {
            this.checkOnChange({
              title,
              required,
              text_allowed,
              in_library: e.target.checked,
              key,
              name: 'in_library',
            });
          }}
        />
      ),
      data: {
        title: title,
        required: required,
        text_allowed: text_allowed,
        in_library: in_library,
      },
      index: keyCount,
    };
    keyCount = keyCount + 1;
    return row;
  }

  checkBoxsStatus() {
    setTimeout(() => {
      const required = this.state.dataSource.filter((item) => item.data.required).length;
      const text_allowed = this.state.dataSource.filter((item) => item.data.text_allowed).length;
      const in_library = this.state.dataSource.filter((item) => item.data.in_library).length;
      const checkAll = JSON.parse(JSON.stringify(this.state.checkAll));
      switch (true) {
        case required === 0:
          checkAll.required.indeterminate = false;
          checkAll.required.checked = false;
          break;
        case required > 0 && required < this.state.dataSource.length:
          checkAll.required.indeterminate = true;
          break;
        case required === this.state.dataSource.length:
          checkAll.required.indeterminate = false;
          checkAll.required.checked = true;
          break;
        default:
          break;
      }
      switch (true) {
        case text_allowed === 0:
          checkAll.text_allowed.indeterminate = false;
          checkAll.text_allowed.checked = false;
          break;
        case text_allowed > 0 && text_allowed < this.state.dataSource.length:
          checkAll.text_allowed.indeterminate = true;
          break;
        case text_allowed === this.state.dataSource.length:
          checkAll.text_allowed.indeterminate = false;
          checkAll.text_allowed.checked = true;
          break;
        default:
          break;
      }
      switch (true) {
        case in_library === 0:
          checkAll.in_library.indeterminate = false;
          checkAll.in_library.checked = false;
          break;
        case in_library > 0 && in_library < this.state.dataSource.length:
          checkAll.in_library.indeterminate = true;
          break;
        case in_library === this.state.dataSource.length:
          checkAll.in_library.indeterminate = false;
          checkAll.in_library.checked = true;
          break;
        default:
          break;
      }
      this.setState({
        checkAll: checkAll,
      });
    }, 100);
  }

  headOnChange(e, col) {
    const checked = e.target.checked;
    const checkAll = JSON.parse(JSON.stringify(this.state.checkAll));
    const dataSource = [];
    this.state.dataSource.forEach((el) => {
      const item = {
        title: el.data.title,
        required: el.data.required,
        text_allowed: el.data.text_allowed,
        in_library: el.data.in_library,
        key: el.key,
      };
      item[col] = checked;
      dataSource.push(this.tableRowCreate(item));
    });
    checkAll[col].checked = checked;
    checkAll[col].indeterminate = false;

    this.setState({
      dataSource: dataSource,
      checkAll: checkAll,
    });
    this.props.getData(dataSource);
  }

  checkOnChange({ title, required, text_allowed, in_library, key, name }) {
    const dataSource = [];
    this.state.dataSource.forEach((el) => {
      if (el.key === key) {
        dataSource.push(
          this.tableRowCreate({
            title,
            required,
            text_allowed,
            in_library,
            key,
          }),
        );
      } else {
        dataSource.push(el);
      }
    });
    this.setState({
      dataSource: dataSource,
    });

    this.props.getData(dataSource);

    const count = dataSource.filter((item) => item.data[name]).length;
    const checkAll = JSON.parse(JSON.stringify(this.state.checkAll));

    switch (true) {
      case count === 0:
        checkAll[name].indeterminate = false;
        checkAll[name].checked = false;
        break;
      case count > 0 && count < dataSource.length:
        checkAll[name].indeterminate = true;
        break;
      case count === dataSource.length:
        checkAll[name].indeterminate = false;
        checkAll[name].checked = true;
        break;
      default:
        break;
    }
    this.setState({
      checkAll: checkAll,
    });
  }

  onDeleteRow(key) {
    const newData = this.state.dataSource.filter((item) => item.key !== key);
    this.setState({
      dataSource: newData,
    });
    this.checkBoxsStatus();
    this.props.getData(newData);
  }

  emptyItem() {
    const newItem = {
      title: '',
      required: false,
      text_allowed: false,
      in_library: false,
      newRow: true,
    };
    const data = [...this.state.dataSource, this.tableRowCreate(newItem)];
    this.setState({
      dataSource: data,
    });
    this.checkBoxsStatus();
    setTimeout(() => {
      this.inputRef.current.focus();
    }, 100);
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.state;
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter((el) => !!el);
      this.setState({ dataSource: newData });
      this.props.getData(newData);
    }
  };

  onChangeQuestion(val, key) {
    const dataSource = [];
    this.state.dataSource.forEach((el) => {
      if (el.key === key) {
        dataSource.push(
          this.tableRowCreate({
            title: val,
            required: el.data.required,
            text_allowed: el.data.text_allowed,
            in_library: el.data.in_library,
            key,
          }),
        );
      } else {
        dataSource.push(el);
      }
    });
    this.setState({
      dataSource: dataSource,
    });
    this.props.getData(dataSource);
  }

  DraggableContainer = (props) => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={this.onSortEnd}
      {...props}
    />
  );

  DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { dataSource } = this.state;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex((x) => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  render() {
    const { dataSource } = this.state;

    return (
      <>
        <Form name="questions-form">
          <Table
            pagination={false}
            dataSource={dataSource}
            columns={this.columns}
            rowKey="index"
            className="questions-table"
            components={{
              body: {
                wrapper: this.DraggableContainer,
                row: this.DraggableBodyRow,
              },
            }}
          />
          <Button
            type="text"
            className="questions-table__add"
            onClick={() => {
              this.emptyItem();
            }}>
            +
          </Button>
        </Form>
      </>
    );
  }
}

export default SortableTable;
