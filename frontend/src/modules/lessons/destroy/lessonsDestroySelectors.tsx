import { createSelector } from 'reselect';

const selectRaw = (state) => state.lessons.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const lessonsDestroySelectors = {
  selectLoading,
};

export default lessonsDestroySelectors;
