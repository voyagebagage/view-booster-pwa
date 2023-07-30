import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

const random = () => {
  return Math.ceil(Math.random() * 10000);
};
const youtube = async (automationYoutubeUrl, mute, chromePath) => {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ["--enable-automation", "--disable-infobars"],
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      mute === true ? "--mute-audio" : "",
    ],
    defaultViewport: null,
    executablePath: chromePath,
  });
  const page = await browser.newPage();
  await page.goto(automationYoutubeUrl, { timeout: 0 });
  //---------------------------------------------------
  //              XXX-SET-UP-XXX
  // --------------------------------------------------

  await page.waitForXPath('//button[@aria-label="Loop playlist"]');

  await new Promise(function (resolve) {
    setTimeout(resolve, 200 + random(0.5));
  });
  //   await page.waitFor(200 + random(0.5));
  await new Promise(function (resolve) {
    setTimeout(resolve, 100 + random(0.5));
  });

  const totalPlaylistVideoNumber = await page.$$eval(
    "yt-formatted-string.index-message.style-scope.ytd-playlist-panel-renderer span",
    // "span.style-scope.yt-formatted-string",
    (spans) => Number(spans.at(-1).textContent)
  );
  console.log("The playlist has", totalPlaylistVideoNumber, "videos");

  const nextButton = await page.$$("a.ytp-next-button.ytp-button");
  // const previousButton = await page.$$("a.ytp-prev-button.ytp-button");
  let howManyTimesPlaylistPlayed = 0;
  let i;
  //------------------------------------------------
  //            XXX-Play FOREVER-XXX
  //------------------------------------------------
  while (true) {
    howManyTimesPlaylistPlayed += 1;
    if (howManyTimesPlaylistPlayed > 1) {
      console.log("START PLAYLIST ...", howManyTimesPlaylistPlayed, "time");
    } else {
      console.log("BEGINNING ...");
    }
    for (i = 0; i <= totalPlaylistVideoNumber; i++) {
      console.log("Play ... video #", i + 1);

      await new Promise(function (resolve) {
        setTimeout(resolve, 3000);
      });
      await new Promise(function (resolve) {
        setTimeout(resolve, random());
      });
      if (await page.$("#skip-button")) {
        try {
          let skipAdd = await page.$("#skip-button");
          await skipAdd.click();
          console.log("add skip button clicked");
        } catch (error) {
          console.log(error);
        }
      }
      await nextButton[0].click();

      let views =
        howManyTimesPlaylistPlayed === 0
          ? 1
          : howManyTimesPlaylistPlayed * totalPlaylistVideoNumber ||
            totalPlaylistVideoNumber;
      console.log(
        // "The playlist has played::",
        // howManyTimesPlaylistPlayed,
        "Views are",
        howManyTimesPlaylistPlayed,
        "x",
        totalPlaylistVideoNumber,
        "=",
        views,
        "."
      );
    }
    console.log("Just close the browser is you want to stop.");
    await page.goto(automationYoutubeUrl, {
      //   waitUntil: "load",
      timeout: 0,
    });
  }
};
export default youtube;
