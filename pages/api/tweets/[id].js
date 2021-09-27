import { firestore } from "../../../firebase/admin";

export default (req, res) => {
  const { query } = req;
  const { id } = query;

  firestore
    .collection("tweets")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        res.json(data);
      } else {
        res.status(404).end();
      }
    });
};
