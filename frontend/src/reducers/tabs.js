import * as types from '../actions/types';

const TABS = [
  { name: 'import', label: 'Import', active: true },
  { name: 'export', label: 'Export' },
]

export default (state = TABS, action) => {
  const { type, name } = action;
  switch (type) {
    case types.SELECT_TAB:
      return TABS.map(tab => ({...tab, active: (tab.name === name)}));
    default:
      return state;
  }
}
