export interface UserSignUpRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}
