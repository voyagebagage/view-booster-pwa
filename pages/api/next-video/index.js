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
    const queries = req.body;
    const { automationYoutubeUrl, mute, chromePath } = queries;
    // Collect log messages in an array
    const logs = [];
    const log = (message) => logs.push(message);

    res
      .status(200)
      .send(
        await youtube(automationYoutubeUrl, Boolean(mute), chromePath, log),
        logs,
        { success: true, message: "Operation successful", logs }
      );
  } catch (error) {
    res.send({ success: false, error: error.message, logs });
  }
});

export default handler;
