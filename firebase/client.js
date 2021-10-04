import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

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

export const addTweet = ({ avatar, content, id, image, video, userName }) => {
  return db.collection("tweets").add({
    content,
    image,
    video,
    comments: [],
    retweets: [],
    likes: [],
    user: {
      avatar,
      id,
      userName,
    },
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  });
};

const mapTweetFromFirebaseToTweetObject = (doc) => {
  const data = doc.data();
  const { id } = doc;
  const { createdAt } = data;

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  };
};

export const listenLatestTweets = (callback) => {
  return db
    .collection("tweets")
    .orderBy("createdAt", "desc")
    .onSnapshot(({ docs }) => {
      const newTweets = docs.map(mapTweetFromFirebaseToTweetObject);
      callback(newTweets);
    });
};

export const uploadImage = (file) => {
  const storage = firebase.storage();
  if (file.type === "video/mp4") {
    const ref = storage.ref(`video/${file.name}`);
    const task = ref.put(file);
    return task;
  }
  if (file.type === "image/jpeg") {
    const ref = storage.ref(`image/${file.name}`);
    const task = ref.put(file);
    return task;
  }
  return null;
};

export const getUserToken = async () => {
  return firebase
    .auth()
    .currentUser.getIdToken(true)
    .then((idToken) => idToken)
    .catch(e => console.log('Fallo obteniendo la id del usuario: ', e));
};
