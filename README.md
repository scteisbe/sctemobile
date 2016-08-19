# CORTEX Mobile
![alt text](https://raw.githubusercontent.com/scteisbe/sctemobile/master/resources/ios/icon/icon-72%402x.png "CORTEX Mobile")

## Background
This is a hybrid app developed using the Ionic 1 framework.

## Install the tools

####Set up the basic environment for Ionic dev
Install node and npm from here https://nodejs.org/en/

Install Git and Git Bash here https://git-scm.com/download

Windows (via Git Bash, not Command Prompt): `npm install -g bower cordova ionic@1.7.16 gulp`

Mac (via Terminal): `sudo npm install -g bower cordova ionic@1.7.16 gulp ios-sim`

## Install the app

####Get the code
`git clone https://github.com/scteisbe/sctemobile.git <YOUR_TARGET_DIRECTORY_HERE>`

`cd <YOUR_TARGET_DIRECTORY_HERE>`

####Install everything
`npm install`

`bower install`

`ionic config build`

If you're using Chrome, this will help you https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi

####Run it in your browser
`ionic serve`

That's it! If you have problems loading APIs in your PC browser, you'll want to use this: https://developers.google.com/web/tools/chrome-devtools/iterate/device-mode/?hl=en

## Debugging and modifying

####Prepare to run on device or emulator
`ionic add platform android`

`ionic add platform ios` (only works if you're on a Mac with XCode installed)

####Run it on physical device connected via USB (does not bump the version numbers)
`ionic run android`

`ionic run ios`

or without a physical device connected, you can run it in the XCode emulator (or Genymotion for Android) with a command like

`ionic emulate ios`

## Ship it

####Deploy just the HTML5 parts (requires an authorized Ionic account)

`ionic upload`

Then use https://apps.ionic.io/app/4d6169d2/deploy to set version compatibility and make it the active deploy.

Note that this (Ionic Deploy) only works if you are changing JS, CSS, or HTML. Updates involving the Cordova plugins require that a new binary be uploaded to Google Play Store or the App Store.

To deploy immediately (on next app launch) to all users (and ignoring binary compatibility), use `ionic upload --note "Your comment for developers only to see" --deploy=production`

####Package complete iOS and Android binaries for the App Store and Google Play

(requires an authorized Ionic account)

`ionic package build android --release --profile scte_android_production`

`ionic package build ios --release --profile scte_ios_production`

Check status and download .apk and .ipa from https://apps.ionic.io/app/4d6169d2/package

##Publish it

From any computer, upload .apk file via browser to Google Play developer console.

On a Mac with XCode, run an app called Application Loader to upload .ipa to App Store.

Go through the publishing processes as with any other app.

