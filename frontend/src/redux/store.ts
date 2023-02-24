import { configureStore } from '@reduxjs/toolkit';
import sliceCards from './sliceCards';
import sliceColumns from './sliceColumns';
import sliceControls from './sliceControls';
import slicePeople from './slicePeople';
import sliceUser from './sliceUser';
import sliceWorkspaces from './sliceWorkspaces';

const store = configureStore({
  reducer: {
    user: sliceUser,
    workspaces: sliceWorkspaces,
    people: slicePeople,
    controls: sliceControls,
    columns: sliceColumns,
    cards: sliceCards,
  },
});

export default store;
