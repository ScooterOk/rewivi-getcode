import { Input, AutoComplete } from 'antd';
import { useState } from 'react';

const renderItem = (title, count) => {
  return {
    value: title,
  };
};
const options = [
  {
    label: 'Libraries',
    options: [renderItem('Google'), renderItem('Facebook')],
  },
  {
    label: 'Solutions',
    options: [renderItem('Amazon'), renderItem('Tesla')],
  },
  {
    label: 'Articles',
    options: [renderItem('SpaceX'), renderItem('Neuralink')],
  },
];

const InputAutocomplete = ({ placeholder, value, onSelect }) => {
  const [results, setResults] = useState(options);

  const onSearch = (val) => {
    let categoryFilter = [];
    const parse = JSON.stringify({ options: options });

    if (val.trim().length > 0) {
      categoryFilter = JSON.parse(parse).options.filter((item) =>
        item.options.some((a) => a.value.toLowerCase().indexOf(val.toLowerCase()) !== -1),
      );
      categoryFilter.forEach((el) => {
        el.options = el.options.filter((item) => item.value.toLowerCase().indexOf(val.toLowerCase()) !== -1);
      });
    } else {
      categoryFilter = options;
    }
    setResults(categoryFilter);
  };

  return (
    <AutoComplete onSearch={onSearch} onSelect={onSelect} options={results} defaultValue={value}>
      <Input placeholder={placeholder} />
    </AutoComplete>
  );
};

export default InputAutocomplete;
