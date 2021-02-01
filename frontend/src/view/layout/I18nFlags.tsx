import React from 'react';
import { getLanguages } from 'src/i18n';
import actions from 'src/modules/layout/layoutActions';
import I18nFlagsWrapper from 'src/view/layout/styles/I18nFlagsWrapper';

const I18nFlags = (props) => {
  return (
    <I18nFlagsWrapper>
      {getLanguages().map((language) => (
        <img
          key={language.id}
          alt={language.label}
          title={language.label}
          src={language.flag}
          onClick={() =>
            actions.doChangeLanguage(language.id)
          }
        />
      ))}
    </I18nFlagsWrapper>
  );
};

export default I18nFlags;
