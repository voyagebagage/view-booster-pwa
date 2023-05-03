const puppeteer = require("puppeteer-extra");
// import puppeteer from "puppeteer-extra";

// import StealthPlugin from "puppeteer-extra-plugin-stealth";
// // add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth")();

puppeteer.use(StealthPlugin);

const random = () => {
  return Math.ceil(Math.random() * 10000);
};
console.log(
  "exec------------------------"
  // puppeteer.executablePath(),
  // puppeteer.executablePath
);

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

    // executablePath: chromePath || (await chromium.executablePath),
    executablePath: chromePath,
    // userDataDir:
    //   "/Users/sedatif2/Library/Application Support/Google/Chrome/Default",
  });
  const page = await browser.newPage();
  await page.goto(automationYoutubeUrl, { timeout: 0 });
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
  console.log("The playlist has", totalPlaylistVideoNumber, "videos");
  const nextButton = await page.$$("a.ytp-next-button.ytp-button");
  // const confirmButton = await page.$$("div.yt-spec-touch-feedback-shape__fill");
  // const confirmButton2 = await page.$x('//button[@id="confirm-button"]');

  let howManyTimesPlaylistPlayed = 0;
  let i;
  // //----------------------------------------------------------------------------------------------------
  // //                                            XXX-Play FOREVER-XXX
  // //-----------------------------------------------------------------------------------------------------
  while (true) {
    howManyTimesPlaylistPlayed += 1;
    if (howManyTimesPlaylistPlayed > 1) {
      console.log("START PLAYLIST ...", howManyTimesPlaylistPlayed, "time");
    } else {
      console.log("BEGINNING ...");
    }
    // log("BEGINNING ...");
    //--
    for (i = 0; i < totalPlaylistVideoNumber; i++) {
      console.log("Play ... video #", i);
      if (
        await page.$("#confirm-button div.yt-spec-touch-feedback-shape__fill")
      ) {
        console.log("IF YES");
        try {
          let confirmButton = await page.$(
            "#confirm-button div.yt-spec-touch-feedback-shape__fill"
          );
          await confirmButton.click();
          console.log("confirm button clicked");
        } catch (error) {
          console.log(error);
        }
      }
      await new Promise(function (resolve) {
        setTimeout(resolve, 30000);
      });
      if (
        await page.$("#confirm-button div.yt-spec-touch-feedback-shape__fill")
      ) {
        console.log("IF YES");
        try {
          let confirmButton = await page.$(
            "#confirm-button div.yt-spec-touch-feedback-shape__fill"
          );
          await confirmButton.click();
          console.log("confirm button clicked");
        } catch (error) {
          console.log(error);
        }
      }
      // console.log(random(), typeof randomVideoTime, i);
      await new Promise(function (resolve) {
        setTimeout(resolve, random());
      });
      // console.log("After second timeout");
      if (
        await page.$("#confirm-button div.yt-spec-touch-feedback-shape__fill")
      ) {
        console.log("IF YES");
        try {
          let confirmButton = await page.$(
            "#confirm-button div.yt-spec-touch-feedback-shape__fill"
          );
          await confirmButton.click();
          console.log("confirm button clicked");
        } catch (error) {
          console.log(error);
        }
      }
      await nextButton[0].click();
    }
    console.log("END OF THE PLAYLIST #", i + 1);
    // log("END OF THE PLAYLIST #", i + 1);
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
    // log(
    //   "The playlist has played::",
    //   howManyTimesPlaylistPlayed,
    //   ". Views are",
    //   howManyTimesPlaylistPlayed,
    //   "x",
    //   totalPlaylistVideoNumber,
    //   "=",
    //   howManyTimesPlaylistPlayed * totalPlaylistVideoNumber,
    //   "."
    // );
    console.log("Just close the browser is you want to stop.");
    // log("Just close the browser is you want to stop.");
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
