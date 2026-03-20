export type LoginPayload = {
  email: string;
  password: string;
};

export type RequestPasswordResetPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function login(payload: LoginPayload): Promise<void> {
  // Mock: aqui entrará a API real depois.
  void payload.email;
  void payload.password;
  await delay(600);
}

export async function requestPasswordReset(
  payload: RequestPasswordResetPayload
): Promise<void> {
  // Mock: aqui entrará a API real depois.
  void payload.email;
  await delay(600);
}

export async function resetPassword(
  payload: ResetPasswordPayload
): Promise<void> {
  // Mock: aqui entrará a API real depois.
  void payload.token;
  void payload.password;
  await delay(600);
}

