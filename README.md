This is a view booster for youtube, every 30 to 60 it will change video for the next one. Youtube it's changing from time to time, this boost will run forever(as long as you wish)
[Click to watch the demo video](https://www.youtube.com/watch?v=X3KysZOTP30)  <br/>
[![Video](https://img.youtube.com/vi/X3KysZOTP30/0.jpg)](https://www.youtube.com/watch?v=X3KysZOTP30) 

It will take you 2 minutes to get started
--
1. Make/Choose a YT playlist 
2. Clone/Copy the repository on your computer ([how to clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)) <br/>
 2.1 Dev ref queries 
3. Start the server on your laptop EASY, only works locally <br/>
 3.1 __Start the App__
4. Install it or use it in the browser
5. Find your Chrome path on your computer
6. what I use for making this app

2.1 req.query , only for devs
---
```jsx
const {automationYoutubeUrl , mute, chromePath} = req.query
```
2 Clone/Copy the app on your machine 
---
- ([how to clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository))
choose a place to copy it
- Go to the parent folder and select it, if I cloned it on the desktop open the folder desktop and copy(right click) the path name, _not on the selected file but under in the path display_
![Capture d’écran 2023-07-30 à 14 39 32](https://github.com/voyagebagage/view-booster-pwa/assets/81431557/2c41d796-05e7-489d-8d9f-70fd1d94a609)
- Open your terminal cmd + space then write terminal
- ### write ```cd 'paste-the-path-you-just-copied'``` and ___DO NOT FORGET THE QUOTES ' '___    then press enter
- ### write and press enter
      yarn && yarn dev

3.1 Start the App
--
copy in your browser
```
http://localhost:3000
```



3 Install the app... or use it the browser it works too
---
simply click on the first download button on the right hand side __don't pay attention to that url on the pic__

<img width="828" alt="Capture d’écran 2022-12-03 à 09 22 31" src="https://user-images.githubusercontent.com/81431557/205454861-96ffef6e-9f62-43c4-8587-43a4494bd84d.png">

4 Chrome path
---
Simply, copy

            chrome://version
in a new chrome tab.

=> Then copy the path and insert it the last input dedicaded


<img width="593" alt="Capture d’écran 2022-12-03 à 09 42 48" src="https://user-images.githubusercontent.com/81431557/205454870-123befc1-1eab-468c-9b7f-10eb01e81888.png">

#### input
<img width="1129" alt="Capture d’écran 2022-12-04 à 01 14 35" src="https://user-images.githubusercontent.com/81431557/205455741-faa21bc9-711f-42c8-90a2-bb4ad3b9d736.png">

6 what I used
---
- Next.js
- Bootstrap  
- Puppeteer 
- Next-pwa
- Next-connect, allow me to only have the front end server on 
