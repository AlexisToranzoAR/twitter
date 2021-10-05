const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

!admin.apps.length &&
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });

export const firestore = admin.firestore();
export const auth = admin.auth();

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, photoURL, uid } = user;
  return {
    avatar: photoURL,
    userName: displayName,
    id: uid,
  };
};

const getUserData = async (uid) => {
  const user = await auth.getUser(uid);
  return user ? mapUserFromFirebaseAuthToUser(user) : null;
};

export const likeTweet = async (tweetId, userId) => {
  const user = await getUserData(userId);
  return firestore
    .collection("tweets")
    .doc(tweetId)
    .update({
      likes: admin.firestore.FieldValue.arrayUnion(user),
    });
};

export const dislikeTweet = async (tweetId, userId) => {
  const user = await getUserData(userId);
  return firestore
    .collection("tweets")
    .doc(tweetId)
    .update({
      likes: admin.firestore.FieldValue.arrayRemove(user),
    });
};
