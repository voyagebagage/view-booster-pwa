import youtube from "./youtube.js";
// const nc = require("next-connect");
import nc from "next-connect";

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
    const queries = req.body;
    const { automationYoutubeUrl, mute, chromePath } = queries;
    await youtube(automationYoutubeUrl, Boolean(mute), chromePath);
    res.status(200).send({ success: true, message: "Operation successful" });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

export default handler;
