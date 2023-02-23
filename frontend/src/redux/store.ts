import { configureStore } from '@reduxjs/toolkit';
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
  },
});

export default store;
