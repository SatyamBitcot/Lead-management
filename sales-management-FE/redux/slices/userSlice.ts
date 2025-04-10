import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the user
export interface User {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  isActive?: boolean;
  isTwoFactorEnabled?: boolean;
  name?: string; // For compatibility with existing code that might use name
}

// Define the type for the user state
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

// Define the initial state
const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

// Create the user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user data
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    // Clear user data
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    // Update user data
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

// Export actions and reducer
export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
