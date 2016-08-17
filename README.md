# CORTEX Mobile

## Background
This is a hybrid app developed using the Ionic 1 framework.

## Installation

####Set up the basic environment for Ionic dev
Install node and npm from here https://nodejs.org/en/

Install git here https://git-scm.com/download

Windows: `npm install -g bower  cordova  ionic@1.7.16  gulp  ios-sim`

Mac: `sudo npm install -g bower  cordova  ionic@1.7.16  gulp  ios-sim`

####Get the code
`git clone https://github.com/scteisbe/sctemobile.git <YOUR_TARGET_DIRECTORY_HERE>`

`cd <YOUR_TARGET_DIRECTORY_HERE>`

####Install everything
`npm install`

`bower install`

`ionic config build`

####Run it in your browser
`ionic serve --lab` 

####Prepare to run on device or emulator
`ionic add platform android`

`ionic add platform ios` (only works if you're on a Mac)

####Build it (bumps `android-versionCode` and `ios-CFBundleVersion` first)
`ionic build`

You can use the following option flags when executing `ionic build`:

`--no-inc` - no version increments processed for this build (overrides other option flags)

`--inc-version` - the version tag will be incremented for this build

`--no-platform-inc` - platform specific version tags will not be incremented for this build

See https://github.com/cnring18/cordova-build-increment for more info.

####Run it on physical device connected via USB (does not bump the version numbers)
`ionic run android`

`ionic run ios`

####Deploy just the HTML5 parts immediately (or on app launch) to all users

`ionic upload --note "Your comment here" --deploy=production`

Note that this only works if you are changing JS, CSS, or HTML. Updates involving the Cordova plugins require that a new binary be uploaded to Google Play Store or the App Store.