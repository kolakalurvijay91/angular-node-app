export interface AppConfig {
  apiUrl: string;
}

declare global {
  interface Window {
    __env?: {
      apiUrl?: string;
    };
  }
}

export function getAppConfig(): AppConfig {
  const apiUrl =
    typeof window !== 'undefined' && window.__env?.apiUrl
      ? window.__env.apiUrl
      : 'http://localhost:3000/api';

  return {
    apiUrl,
  };
}
