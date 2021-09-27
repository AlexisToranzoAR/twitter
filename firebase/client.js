import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyANxCcsaVCDh7VmH2C4NLFBd5mtPMAY2Wo",
  authDomain: "twitter-be7ec.firebaseapp.com",
  projectId: "twitter-be7ec",
  storageBucket: "twitter-be7ec.appspot.com",
  messagingSenderId: "231317440655",
  appId: "1:231317440655:web:1b4f27c48817e8002588fa",
  measurementId: "G-BY2P5XQ95R",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user;
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) =>
  firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

export const addTweet = ({ avatar, content, userId, img, userName }) => {
  return db.collection("tweets").add({
    avatar,
    content,
    userId,
    img,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCounte: 0,
    sharedCount: 0,
  });
};

export const fetchLatestTweets = () => {
  return db
    .collection("tweets")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const { id } = doc;
        const { createdAt } = data;

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        };
      });
    });
};

export const uploadImage = (file) => {
  const storage = firebase.storage()
  const ref = storage.ref(`image/${file.name}`);
  const task = ref.put(file);
  return task;
};
