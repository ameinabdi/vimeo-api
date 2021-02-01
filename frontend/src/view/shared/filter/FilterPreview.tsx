import React from 'react';
import { i18n } from 'src/i18n';
import { Tag } from 'antd';

export default function FilterPreview(props) {
  const { values, renders, onClick, onRemove } = props;

  const itemsNotEmpty = Object.keys(values || {})
    .map((key) => {
      if (!renders[key]) {
        return {
          value: null,
        };
      }

      return {
        key: key,
        label: renders[key].label,
        value: renders[key].render(values[key]),
      };
    })
    .filter(
      (item) =>
        item.value ||
        item.value === 0 ||
        item.value === false,
    );

  return (
    <div onClick={onClick} className="filter-preview">
      {!itemsNotEmpty.length || props.expanded ? (
        i18n('common.filters')
      ) : (
        <>
          {i18n('common.filters')}:
          <span className="filter-preview-values">
            {itemsNotEmpty.map((item) => (
              <Tag
                key={item.label}
                closable={Boolean(onRemove)}
                onClose={
                  onRemove
                    ? () => onRemove(item.key)
                    : undefined
                }
              >{`${item.label}: ${item.value}`}</Tag>
            ))}
          </span>
        </>
      )}
    </div>
  );
}
