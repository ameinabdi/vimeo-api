import moment from 'moment';

const exporterRenders = {
  stringArray: () => (value) => (value || []).join(' '),
  json: () => (value) =>
    value ? JSON.stringify(value, null, 2) : null,
  decimal: (fractionDigits?) => (value) =>
    value
      ? fractionDigits
        ? Number(value).toFixed(fractionDigits)
        : Number(value)
      : null,
  boolean: () => (value) => String(Boolean(value)),
  relationToOne: () => (value) =>
    (value && value.id) || null,
  relationToMany: () => (value) =>
    (value || []).map((item) => item.id).join(' '),
  filesOrImages: () => (value) =>
    (value || []).map((item) => item.downloadUrl).join(' '),
  datetime: () => (value) =>
    value ? moment(value).format('YYYY-MM-DD HH:mm') : null,
};

export default exporterRenders;
