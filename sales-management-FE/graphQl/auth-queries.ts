import { gql } from "@apollo/client";

// Login mutation
export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      message
      accessToken
      refreshToken
      user {
        id
        email
        firstName
        lastName
        role
        isActive
        isTwoFactorEnabled
      }
    }
  }
`;

// Register (Create user) mutation
export const REGISTER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
      firstName
      lastName
      role
      isActive
      isTwoFactorEnabled
      createdAt
      updatedAt
    }
  }
`;

// Logout mutation
export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

// Validate token mutation
export const VALIDATE_TOKEN = gql`
  mutation ValidateToken($token: String!) {
    validateToken(token: $token)
  }
`;
