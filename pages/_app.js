import '../styles/globals.css';
import Head from 'next/head';


import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import users from '../reducers/users';
import files from '../reducers/files'

import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';


const reducers = combineReducers({ users, files });

const persistConfig = { key: 'WordWarden', storage };



const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});


const persistor = persistStore(store);


function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>

        <Head>
          <title>Next.js App</title>
        </Head>
        <Component {...pageProps} />

      </PersistGate>
    </Provider>

  );
}

export default App;
