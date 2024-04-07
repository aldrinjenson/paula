export const envConfig = {
  vapi: {
    apiUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? "https://api.vapi.ai",
    token: process.env.NEXT_PUBLIC_VAPI_API_URL ?? "vapi-web-token",
  },
};