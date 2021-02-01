import en from './en';
import ptBR from './pt-BR';
import _get from 'lodash/get';
import es from './es';

/**
 * Object with the languages available.
 */
const languages = {
  en: en,
  'pt-BR': ptBR,
  es: es,
};

/**
 * Replaces the parameters of a message with the args.
 *
 * @param {*} message
 * @param {*} args
 */
function format(message, args) {
  if (!message) {
    return null;
  }

  return message.replace(/{(\d+)}/g, function (
    match,
    number,
  ) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match;
  });
}

/**
 * Checks if the key exists on the language.
 *
 * @param {*} languageCode
 * @param {*} key
 */
export const i18nExists = (languageCode, key) => {
  const message = _get(languages[languageCode], key);
  return Boolean(message);
};

/**
 * Returns the translation based on the key.
 *
 * @param {*} languageCode
 * @param {*} key
 * @param  {...any} args
 */
export const i18n = (languageCode, key, ...args) => {
  const message = _get(languages[languageCode], key);

  if (!message) {
    return key;
  }

  return format(message, args);
};
