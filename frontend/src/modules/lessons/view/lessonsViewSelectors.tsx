import { createSelector } from 'reselect';

const selectRaw = (state) => state.lessons.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const lessonsViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default lessonsViewSelectors;
