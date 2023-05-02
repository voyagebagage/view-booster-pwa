const { youtube } = require("./youtubeHandler");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const queries = JSON.parse(event.body);
    console.log(queries);
    const { automationYoutubeUrl, mute, chromePath } = queries;
    await youtube(automationYoutubeUrl, Boolean(mute), chromePath);
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
