# CORTEX Mobile
![alt text](https://raw.githubusercontent.com/scteisbe/sctemobile/master/resources/ios/icon/icon-72%402x.png "CORTEX Mobile")

## Background
This is a hybrid app developed using the Ionic 1 framework. You don't need a Mac to do any of the development work, but you _do_ need one in order to upload a new binary to the App Store (Android can be done entirely from PC). As you'll see below, Ionic Deploy lets you do most app changes without going through the App Store i.e. without a Mac. If you're reading this because you need to update the app, probably the thing you want is Ionic Deploy.

## Install the tools

####Set up the basic environment for Ionic dev
Install node and npm from here https://nodejs.org/en/

Install Git and Git Bash here https://git-scm.com/download

Windows (via Git Bash, not Command Prompt): `npm install -g bower cordova ionic@1.7.16 gulp`

Mac (via Terminal): `sudo npm install -g bower cordova ionic@1.7.16 gulp ios-sim`

## Install the app

####Get the code
`git clone https://github.com/scteisbe/sctemobile.git` (it will create a directory called `sctemobile`)

or 

`git clone https://github.com/scteisbe/sctemobile.git <YOUR_TARGET_DIRECTORY_HERE>`

then

`cd <YOUR_TARGET_DIRECTORY_HERE>`

####Install everything
`npm install`

`bower install`

`ionic config build`

##Run, debug, modify in your browser

####Run it in your browser
`ionic serve`  (use `-b` to disable launching a new browser window)

That's it! If you have problems loading APIs in your PC browser, you'll want to use this: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi

If you're using Chrome, this will help you https://developers.google.com/web/tools/chrome-devtools/iterate/device-mode/?hl=en

## Running on actual devices

####Prepare to run on device or emulator
`ionic add platform android`

`ionic add platform ios` (only works if you're on a Mac with XCode installed)

####Run it on physical device connected via USB

Assuming you've set up things like ADB for Android, you can easy run on a real device.

`ionic run android`  (debug by hitting `chrome://inspect/#devices` in your browser)

`ionic run ios`

or without a physical device connected, you can run it in the XCode emulator (or Genymotion for Android) with a command like

`ionic emulate ios`

## Ship it

####Deploy just the HTML5 parts (requires an authorized Ionic account)

`ionic upload`

Then use https://apps.ionic.io/app/4d6169d2/deploy to set version compatibility and make it the active deploy.

Note that this (Ionic Deploy) only works if you are just changing JS, CSS, or HTML. Updates involving the Cordova plugins require that a new binary be uploaded to Google Play Store (.apk) or the App Store (.ipa).

####Package complete iOS and Android binaries for the App Store and Google Play

This lets you do both full builds in the cloud, but requires an authorized Ionic account. Alternatively, you can set up build machines for Android and iOS.

First, bump up `android-versionCode`, `ios-CFBundleVersion`, and `version` in the project's `config.xml` file. There's a section below on version numbering. Then have Ionic Package do the rest:

`ionic package build ios --release --profile scte_ios_production`

`ionic package build android --release --profile scte_android_production`

Check status and download .apk and .ipa from https://apps.ionic.io/app/4d6169d2/package. Running the `ionic package` command also creates a Deploy (see above) that should be made "active" once you set the equivalent version to the new Package version you just created. Also, see note in the Version Numbering section below.

##Publish to app stores

From any computer, upload the `.apk` file via browser to Google Play developer console.

On a Mac with XCode, run an app called Application Loader to upload the `.ipa` to App Store.

Go through the submission / publishing processes as with any other app.

##Other notes

####Version numbering

In `config.xml` you'll find a line like this:

`<widget android-versionCode="35" ios-CFBundleVersion="1.35" version="1.24.6">`

`android-versionCode` and `ios-CFBundleVersion` should be incremented every time before you make a binary build (Ionic Package) that you intend to submit to the stores (they require those to always increase). In the case above, it would be sufficient to change them to "35" and "1.35", respectively.

`version` is what users see in the app stores. You do not need to increment it with every build, but when you plan to make a new release, you should. It's not uncommon to upload several builds for one version e.g. in the process of getting Apple's approval. BTW, you also need to enter the `version` in the App Store during the process of creating a new version for approval.

When you release a new binary to the world, be sure to set the Ionic Deploy "equivalent" version to be equal to the `version` in this file.
