import { useEffect, useState } from 'react';
import { Button, Drawer, Input } from 'antd';

import IconFilterButton from '../../assets/img/filter-blue.svg';

import { IconClose, IconDelete } from '../icons';

import Checkbox from 'antd/lib/checkbox/Checkbox';

import './style.scss';

const JobListTableFilter = ({ data, setResults }) => {
  const [visible, setVisible] = useState(false);
  const [tagsList, setTagsList] = useState([]);
  const [filterResults, setFilterResults] = useState([]);
  const [checkboxs, setCheckboxs] = useState({
    status: {
      Published: false,
      Draft: false,
    },
  });
  const [filters, setFilter] = useState({});
  const [filterClear, setFilterClear] = useState(true);
  const [resultsCount, setResultsCount] = useState(data.length);

  useEffect(() => {
    let tags = [];
    data.forEach((item) => {
      tags = [...tags, ...item.tags];
      setCheckboxs({
        ...checkboxs,
      });
    });
    setTagsList(Array.from(new Set(tags)));
  }, []);

  useEffect(() => {
    let chackList = { ...checkboxs };
    let filterList = { ...filters };
    tagsList.forEach((tag) => {
      chackList[tag] = false;
      filterList[tag] = null;
    });
    setCheckboxs(chackList);
    setFilter(filterList);
  }, [tagsList]);

  useEffect(() => {
    let result = {};
    if (checkboxs.status.Published) {
      result = {
        ...result,
        status: {
          ...result.status,
          published: true,
        },
      };
    }
    if (checkboxs.status.Draft) {
      result = {
        ...result,
        status: {
          ...result.status,
          draft: true,
        },
      };
    }
    setFilter(result);
  }, [checkboxs]);

  const chackOnChange = (e, category, name) => {
    const checks = { ...checkboxs };
    checks[category][name] = e.target.checked;
    setCheckboxs(checks);
  };

  const clearAll = () => {
    const chacks = { ...checkboxs };
    for (let i in chacks.status) {
      chacks.status[i] = false;
    }
    setCheckboxs(chacks);
  };

  return (
    <>
      <Button
        type="text"
        className="actions--filter"
        onClick={() => {
          setVisible(true);
        }}>
        <span>Filters</span>
        <img src={IconFilterButton} alt="" />
      </Button>
      <Drawer
        placement="right"
        className="job-list-table__filter"
        width={507}
        closable={true}
        closeIcon={<IconClose />}
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}>
        <div className="filter--title">
          <span>Filters</span>
          <Button type="text" onClick={clearAll}>
            Clear all
          </Button>
          <Button
            type="primary"
            className="full"
            onClick={() => {
              setResults(filters);
              setVisible(false);
            }}>
            Show results {resultsCount === 0 ? '' : `(${resultsCount})`}
          </Button>
        </div>
        <div className="form-group">
          <div className="form-group--title">Status</div>
          <div className="form-control">
            <label>
              <Checkbox
                onChange={(e) => {
                  chackOnChange(e, 'status', 'Published');
                }}
                checked={checkboxs.status.Published}
              />
              <span>Published</span>
            </label>
          </div>
          <div className="form-control">
            <label>
              <Checkbox
                onChange={(e) => {
                  chackOnChange(e, 'status', 'Draft');
                }}
                checked={checkboxs.status.Draft}
              />
              <span>Draft</span>
            </label>
          </div>
        </div>
        {tagsList.length > 0 && (
          <div className="form-group">
            <div className="form-group--title">Tags</div>
            <ul className="filter--tags-list">
              {tagsList.map((tag) => (
                <li key={tag}>
                  <div className="form-control">
                    <label>
                      <Checkbox
                        onChange={(e) => {
                          chackOnChange(e, 'tags', tag);
                        }}
                        checked={checkboxs[tag]}
                        data-scooterok={checkboxs[tag]}
                      />
                      <span>{tag}</span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="form-group">
          <div className="form-control">
            <label>
              <Checkbox />
              <span>Hide questionnaires without replies</span>
            </label>
          </div>
        </div>
        <div className="form-group includes-question">
          <div className="form-group--title">Includes question</div>
          <div className="form-control">
            <label>Vacant position</label>
            <Input placeholder="Please add Name of the vacant position" />
          </div>
          <div className="yourself">
            <span>How would you describe yourself?</span>
            <button>
              <IconDelete />
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default JobListTableFilter;
