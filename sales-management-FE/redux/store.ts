import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import userReducer from "./slices/userSlice";

// Configure persist options
const persistConfig = {
  key: "user",
  storage,
};

// Create persisted reducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Create store with explicit type assertion to bypass TypeScript error
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
  // Using 'as any' to bypass TypeScript error with middleware configuration
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }) as any,
});

// Create persistor
export const persistor = persistStore(store);

// Define RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
