
const { REACT_APP_FIREBASE_CONFIG_KEY,
  REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
  REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
  REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
  REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_CONFIG_APP_ID,
  REACT_APP_FIREBASE_CONFIG_MEASUREMENTID } = process.env;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: `${REACT_APP_FIREBASE_CONFIG_KEY}`,
  authDomain: `${REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN}`,
  projectId: `${REACT_APP_FIREBASE_CONFIG_PROJECT_ID}`,
  storageBucket: `${REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET}`,
  messagingSenderId: `${REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID}`,
  appId: `${REACT_APP_FIREBASE_CONFIG_APP_ID}`,
  measurementId: `${REACT_APP_FIREBASE_CONFIG_MEASUREMENTID}`
};

// Initialize Firebase

export default firebaseConfig;