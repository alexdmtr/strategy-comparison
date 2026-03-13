import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const multiselectAtom = atomWithStorage<boolean>('grid-multiselect', false);

export function useMultiselect(): [boolean, (val: boolean) => void] {
  return useAtom(multiselectAtom);
}
