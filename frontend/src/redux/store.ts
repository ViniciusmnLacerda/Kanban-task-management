import { configureStore } from '@reduxjs/toolkit';
import sliceUser from './sliceUser';
import sliceWorkspaces from './sliceWorkspaces';

const store = configureStore({
  reducer: {
    user: sliceUser,
    workspaces: sliceWorkspaces,
  },
});

export default store;
