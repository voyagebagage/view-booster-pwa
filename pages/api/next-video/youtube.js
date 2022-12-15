// const { puppeteer } = require("puppeteer-extra");
const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-extra");

// Add the Imports before StealthPlugin

require("puppeteer-extra/dist/index.cjs.js");

// Now you can import the StealthPlugin :D

// // add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
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
      //   "--disable-background-timer-throttling",
      //   "--disable-gpu",
      //   "--disable-dev-shm-usage",
      //   "--no-first-run",
      //   "--no-zygote",
      //   "--single-process",
    ],
    // args: chromium.args,
    defaultViewport: null,
    // ignoreHTTPSErrors: true,
    executablePath: chromePath || (await chromium.executablePath),
  });
  const page = await browser.newPage();
  await page.goto(automationYoutubeUrl, {
    // waitUntil: "load",
    // timeout: 0,
  });
  // //----------------------------------------------------------------------------------------------------
  // //                                            XXX-SET-UP-XXX
  // //-----------------------------------------------------------------------------------------------------
  //await for the play button to appear to continue
  //   await page.waitForSelector(
  //     "button.yt-spec-touch-feedback-shape--touch-response.yt-spec-touch-feedback-shape__fill"
  //   );
  await page.waitForXPath('//button[@aria-label="Loop playlist"]');
  //   let playButton = await page.$x('//button[@title="Play (k)"]');
  let loopPlaylistEnable = await page.$x(
    '//button[@aria-label="Loop playlist"]'
  );

  //click loop, mute and play
  await loopPlaylistEnable[0].click();

  await new Promise(function (resolve) {
    setTimeout(resolve, 200 + random(0.5));
  });
  //   await page.waitFor(200 + random(0.5));
  await new Promise(function (resolve) {
    setTimeout(resolve, 100 + random(0.5));
  });

  // await page.waitFor(100 + random(0.5));

  const totalPlaylistVideoNumber = await page.$$eval(
    "span.style-scope.yt-formatted-string",
    (spans) => Number(spans.at(-1).textContent)
  );

  const nextButton = await page.$$("a.ytp-next-button.ytp-button");

  let howManyTimesPlaylistPlayed = 0;
  let i;
  // //----------------------------------------------------------------------------------------------------
  // //                                            XXX-Play FOREVER-XXX
  // //-----------------------------------------------------------------------------------------------------
  while (true) {
    howManyTimesPlaylistPlayed += 1;
    console.log("BEGINNING ...");
    //--
    for (i = 0; i <= totalPlaylistVideoNumber; i++) {
      console.log("Play ... video #", i);
      await new Promise(function (resolve) {
        setTimeout(resolve, 30000);
      });
      // console.log(random(), typeof randomVideoTime, i);
      await new Promise(function (resolve) {
        setTimeout(resolve, random());
      });

      await nextButton[0].click();
    }
    console.log("END OF THE PLAYLIST #", i + 1);
    console.log(
      "The playlist has played::",
      howManyTimesPlaylistPlayed,
      ". Views are",
      howManyTimesPlaylistPlayed,
      "x",
      totalPlaylistVideoNumber,
      "=",
      howManyTimesPlaylistPlayed * totalPlaylistVideoNumber,
      "."
    );
    console.log("Just close the browser is you want to stop.");
    //--
    await page.goto(
      automationYoutubeUrl
      // {
      //   waitUntil: "load",
      //   timeout: 0,
      // }
    );
  }
};
module.exports = youtube;
