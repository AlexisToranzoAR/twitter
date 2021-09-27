const admin = require("firebase-admin");

const serviceAccount = require("./firebase-keys.json");

!admin.apps.length && admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://twitter-be7ec.firebaseio.com'
});

export const firestore = admin.firestore()
