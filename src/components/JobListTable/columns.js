import { Dropdown, Menu, Tag, Tooltip } from 'antd';
import { IconDelete, IconPause, IconPlay, IconShare } from '../icons';

const columns = (onDeleteModal, postStatus) => {
  return [
    {
      title: 'Status',
      dataIndex: 'status',
      className: 'status',
      key: 'status',
      render: (status) => {
        console.log(postStatus[status]);
        let color;
        if (status === 'Expired') {
          color = '#f22245';
        }
        return <span style={{ color: color }}>{postStatus[status]}</span>;
      },
      sorter: (a, b) => 0,
      showSorterTooltip: false,
      ellipsis: true,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      className: 'title',
      width: '20%',
      key: 'title',
      sorter: (a, b) => 0,
      showSorterTooltip: false,
      ellipsis: true,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      width: '30%',
      className: 'tags',
      render: (tags) => {
        tags.sort();
        const colors = [
          'volcano',
          'blue',
          'green',
          'red',
          'orange',
          'gold',
          'magenta',
          'lime',
          'cyan',
          'geekblue',
          'purple',
        ];
        if (tags.length > 3) {
          const menu = (
            <Menu>
              {tags.map((tag, i) => {
                const color = i < colors.length ? colors[i] : colors[i - colors.length];
                if (i > 1) {
                  return (
                    <Menu.Item key={`item-${i}`}>
                      <Tag color={color}>{tag.toUpperCase()}</Tag>
                    </Menu.Item>
                  );
                }
              })}
            </Menu>
          );
          return (
            <>
              {tags.map((tag, i) => {
                return <span key={`tag-${i}`}>{i < 2 && <Tag color={colors[i]}>{tag.toUpperCase()}</Tag>}</span>;
              })}
              <Dropdown overlayClassName="tags-dropdown" placement="bottomCenter" overlay={menu}>
                <span className="ant-dropdown-link">+ {tags.length - 2} tags</span>
              </Dropdown>
            </>
          );
        } else {
          return (
            <>
              {tags.map((tag, i) => {
                return (
                  <Tag color={colors[i]} key={`tag-${i}`}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          );
        }
      },
      sorter: (a, b) => 0,
      showSorterTooltip: false,
      ellipsis: { showTitle: true },
    },
    {
      title: 'Will finish in',
      dataIndex: 'will_finish_in',
      className: 'finish',
      key: 'finish',
      sorter: (a, b) => 0,
      showSorterTooltip: false,
      ellipsis: true,
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      className: 'created',
      key: 'created',
      render: (date) => {
        function convertDate(inputFormat) {
          function pad(s) {
            return s < 10 ? '0' + s : s;
          }
          var d = new Date(inputFormat);
          return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('.');
        }
        return convertDate(date);
      },
      sorter: (a, b) => 0,
      showSorterTooltip: false,
      ellipsis: true,
    },
    {
      title: 'Action',
      className: 'action',
      width: 140,
      key: 'action',
      render: (text, record) => {
        return (
          <div className="table--actions">
            <Tooltip title="Share">
              <button>
                <IconShare />
              </button>
            </Tooltip>
            {record.paused ? (
              <Tooltip title="Prolong">
                <button>
                  <IconPlay />
                </button>
              </Tooltip>
            ) : (
              <Tooltip title="Pause">
                <button>
                  <IconPause />
                </button>
              </Tooltip>
            )}

            <Tooltip title="Delete">
              <button
                onClick={() => {
                  onDeleteModal(record.id);
                }}>
                <IconDelete />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];
};

export { columns };
