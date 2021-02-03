import React, { useState, useRef, useEffect } from 'react';
import { Input, AutoComplete, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserQestions } from '../../core/services';

import './style.scss';

const renderItem = (title) => {
  return {
    value: title,
  };
};

// const options = [
//   {
//     label: "Libraries",
//     options: [renderItem("Google"), renderItem("Facebook")],
//   },
//   {
//     label: "Solutions",
//     options: [renderItem("Scooterok"), renderItem("amigo")],
//   },
//   {
//     label: "Articles",
//     options: [renderItem("Hanz"), renderItem("ScoobyDoo")],
//   },
// ];

const options = [
  {
    value: 'Google',
  },
  {
    value: 'Facebook',
  },
  {
    value: 'Tesla',
  },
  {
    value: 'SpaceX',
  },
];

const Complete = (props) => {
  const [value, setValue] = useState('');
  const [results, setResults] = useState([]);
  const autoComplete = useRef();
  const questionsList = useSelector((state) => {
    return state.user;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const list = [];
    questionsList.questions.forEach((item) => {
      list.push(renderItem(item.title));
    });
    setResults(list);
  }, [questionsList]);

  const onSelect = (value, option) => {
    props.onSelect(value);
    setValue('');
    autoComplete.current.blur();
  };

  const onSearch = (val) => {
    setValue(val);
    fetchUserQestions(dispatch)(val);
  };
  return (
    <div className="questions-autocomplete">
      <AutoComplete
        dropdownClassName="certain-category-search-dropdown"
        onSearch={onSearch}
        onSelect={onSelect}
        notFoundContent={questionsList.loader ? <Spin size="small" className="questions-autocomplete-spiner" /> : null}
        options={results}
        ref={autoComplete}
        value={value}>
        <Input placeholder="Search..." />
      </AutoComplete>
    </div>
  );
};

export default Complete;
