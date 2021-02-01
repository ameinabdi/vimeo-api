import { Select } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { getLanguages } from 'src/i18n';
import actions from 'src/modules/layout/layoutActions';
import selectors from 'src/modules/layout/layoutSelectors';

const I18nSelect = () => {
  const language = useSelector(selectors.selectLanguage);

  return (
    <span>
      <Select
        value={language}
        style={{
          width: 100,
        }}
        onChange={(language) =>
          actions.doChangeLanguage(language)
        }
      >
        {getLanguages().map((language) => (
          <Select.Option
            key={language.id}
            value={language.id}
          >
            {language.label}
          </Select.Option>
        ))}
      </Select>
    </span>
  );
};

export default I18nSelect;
