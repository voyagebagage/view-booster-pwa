const youtube = require("./youtube.js");
import nc from "next-connect";

// pages/api/hello.js

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).post(async (req, res) => {
  try {
    const queries = JSON.parse(req.body);
    const { automationYoutubeUrl, mute, chromePath } = queries;
    res.send(await youtube(automationYoutubeUrl, Boolean(mute), chromePath));
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

export default handler;
