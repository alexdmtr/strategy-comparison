import createPersistedState from 'use-persisted-state';
const useMultiselectState = createPersistedState<boolean>('grid-multiselect');

export function useMultiselect() {
  return useMultiselectState(false);
}
