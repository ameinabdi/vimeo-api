import React from 'react';
import { useSelector } from 'react-redux';
import { Progress, Alert } from 'antd';
import { i18n } from 'src/i18n';
import ImporterStatusWrapper from 'src/view/shared/importer/styles/ImporterStatusWrapper';

export default (selectors) => {
  const ImporterStatus = (props) => {
    const completed = useSelector(
      selectors.selectCompleted,
    );
    const importing = useSelector(
      selectors.selectImporting,
    );
    const nonPendingRowsCount = useSelector(
      selectors.selectNonPendingRowsCount,
    );
    const rowsCount = useSelector(
      selectors.selectRowsCount,
    );
    const percent: number = useSelector(
      selectors.selectPercent,
    );
    const errorRowsCount = useSelector(
      selectors.selectErrorRowsCount,
    );

    const renderCompleted = () => {
      return (
        <Alert
          message={i18n('importer.completed.success')}
          type="success"
          showIcon
        />
      );
    };

    const renderCompletedSomeErrors = () => {
      return (
        <Alert
          message={i18n('importer.completed.someErrors')}
          type="warning"
          showIcon
        />
      );
    };

    const renderCompletedAllErrors = () => {
      return (
        <Alert
          message={i18n('importer.completed.allErrors')}
          type="error"
          showIcon
        />
      );
    };

    const renderProcessing = () => {
      return (
        <>
          <Progress
            percent={percent}
            showInfo={false}
            status="active"
          />
          <p>
            {i18n(
              'importer.importedMessage',
              nonPendingRowsCount,
              rowsCount,
            )}{' '}
            {i18n('importer.noNavigateAwayMessage')}
          </p>
        </>
      );
    };

    const renderBody = () => {
      const isAllErrors = errorRowsCount === rowsCount;

      if (completed && isAllErrors) {
        return renderCompletedAllErrors();
      }

      const isSomeErrors = Boolean(errorRowsCount);

      if (completed && isSomeErrors) {
        return renderCompletedSomeErrors();
      }

      const allSuccess = !errorRowsCount;

      if (completed && allSuccess) {
        return renderCompleted();
      }

      return renderProcessing();
    };

    if (!importing && !completed) {
      return null;
    }

    return (
      <ImporterStatusWrapper>
        {renderBody()}
      </ImporterStatusWrapper>
    );
  };

  return ImporterStatus;
};
