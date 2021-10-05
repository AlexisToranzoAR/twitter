const { auth, likeTweet, dislikeTweet } = require("../../../../firebase/admin");

export default function handler(req, res) {
  if (req.method === "POST") {
    const { tweetId } = req.query;
    const { userToken } = req.body;
    auth
      .verifyIdToken(userToken)
      .then(async (decodedToken) => {
        const { uid } = decodedToken;
        await likeTweet(tweetId, uid);
        res.json({ status: true, uid });
      })
      .catch((error) => {
        res.json({ status: false, error: error.message });
      });
  } else if (req.method === "DELETE") {
    const { tweetId } = req.query;
    const { userToken } = req.body;
    auth
      .verifyIdToken(userToken)
      .then(async (decodedToken) => {
        const { uid } = decodedToken;
        await dislikeTweet(tweetId, uid);
        res.json({ status: true, uid });
      })
      .catch((error) => {
        res.json({ status: false, error: error.message });
      });
  } else {
    res.status(404).end();
  }
}
