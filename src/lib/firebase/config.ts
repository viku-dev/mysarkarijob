export type FirebaseClientConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

const envConfig: FirebaseClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

export function getMissingFirebaseEnvKeys(config = envConfig): string[] {
  return Object.entries(config).filter(([, value]) => !value).map(([key]) => key);
}

export function isFirebaseConfigured(): boolean {
  return getMissingFirebaseEnvKeys().length === 0;
}

export function getFirebaseConfig(): FirebaseClientConfig {
  const missing = getMissingFirebaseEnvKeys();
  if (missing.length > 0) {
    throw new Error(`Missing Firebase client environment variables: ${missing.join(", ")}`);
  }
  return envConfig;
}
