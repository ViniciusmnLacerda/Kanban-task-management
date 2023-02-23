import { configureStore } from '@reduxjs/toolkit';
import slicePeople from './slicePeople';
import sliceUser from './sliceUser';
import sliceWorkspaces from './sliceWorkspaces';

const store = configureStore({
  reducer: {
    user: sliceUser,
    workspaces: sliceWorkspaces,
    people: slicePeople,
  },
});

export default store;
