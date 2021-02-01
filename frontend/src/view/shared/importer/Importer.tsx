import React from 'react';
import { useSelector } from 'react-redux';
import importerFormHoc from 'src/view/shared/importer/ImporterForm';
import importerListHoc from 'src/view/shared/importer/ImporterList';
import importerStatusHoc from 'src/view/shared/importer/ImporterStatus';
import importerToolbarHoc from 'src/view/shared/importer/ImporterToolbar';

export default (
  selectors,
  actions,
  fields,
  templateHelp,
) => {
  const ImporterToolbar = importerToolbarHoc(
    selectors,
    actions,
    fields,
    templateHelp,
  );
  const ImporterStatus = importerStatusHoc(selectors);
  const ImporterList = importerListHoc(
    selectors,
    actions,
    fields,
  );
  const ImporterForm = importerFormHoc(selectors, actions);

  const Importer = (props) => {
    const hasRows = useSelector(selectors.selectHasRows);

    return (
      <>
        <ImporterToolbar />
        <ImporterStatus />
        {hasRows ? <ImporterList /> : <ImporterForm />}
      </>
    );
  };

  return Importer;
};
