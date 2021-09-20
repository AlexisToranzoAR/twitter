import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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

const mapUserFromFirebaseAuthToUser = (user) => {
  if (!user) return null;
  const { displayName, email, photoURL } = user;
  return {
    avatar: photoURL,
    username: displayName,
    email,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizedUser);
  });
};

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};
