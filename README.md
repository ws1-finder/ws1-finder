<img src="public/ws1-finder.svg" width=48 align="right" />

# Workspace One Finder
>This extension will display a searchable list of the applications to which your are entitled in [VMware Workspace One](https://www.vmware.com/products/workspace-one.html)


![test](https://github.com/ws1-finder/ws1-finder/actions/workflows/test.yml/badge.svg)

# Limitations
Currently, Finder only lists Applications that can be launched from your web browser, that is where the application is not a virtual app / Launched by Horizon.

# Installation
## Chrome
<img src="https://img.shields.io/chrome-web-store/stars/aehfcfgkfhkaclkhjhonjoabaklkpggc"> <img src="https://img.shields.io/chrome-web-store/v/aehfcfgkfhkaclkhjhonjoabaklkpggc"> <img src="https://img.shields.io/chrome-web-store/users/aehfcfgkfhkaclkhjhonjoabaklkpggc">

### Install
You can find this extension in the [Chrome Web Store](https://chrome.google.com/webstore/detail/appfinder-for-workspace-o/aehfcfgkfhkaclkhjhonjoabaklkpggc)

Alternatively load the [build](#npm-run-build) as an [unpacked extension](https://developer.chrome.com/extensions/getstarted#manifest)

## Firefox
<img src="https://img.shields.io/amo/stars/appfinder-for-workspace-one"> <img src="https://img.shields.io/amo/v/appfinder-for-workspace-one"> <img src="https://img.shields.io/amo/users/appfinder-for-workspace-one">

### Install
You can find this extension here: [Firefox Browser Add-Ons](https://addons.mozilla.org/en-US/firefox/addon/appfinder-for-workspace-one)

Alternatively load the [build](#npm-run-build) as a [temporary addon](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

## Edge
[![](https://img.shields.io/badge/dynamic/json?label=rating&suffix=/5&query=%24.averageRating&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Ffaalidmfeahkcajpjccbgdfglmhepbfk)](https://microsoftedge.microsoft.com/addons/detail/workspace-one-finder/faalidmfeahkcajpjccbgdfglmhepbfk)
[![](https://img.shields.io/badge/dynamic/json?label=edge%20add-on&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Ffaalidmfeahkcajpjccbgdfglmhepbfk)](https://microsoftedge.microsoft.com/addons/detail/workspace-one-finder/faalidmfeahkcajpjccbgdfglmhepbfk)

### Install
You can find this extension at [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/workspace-one-finder/faalidmfeahkcajpjccbgdfglmhepbfk)

Alternatively you may [sideload](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading) the [build](#npm-run-build)

# Development

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Manual Testing
Looking to test this extension without access to an existing Workspace ONE account? You can sign up for a VMware Test Drive account here: [VMware Test Drive](https://portal.vmtestdrive.com/) and then update this extension's options from your browser to point to: <https://testdrive.vidmpreview.com/>

# Attributions
[Keyboard behaviors](web-extension/src/keyboard_behaviors.js) are based on [babyman/quick-tabs-chrome-extension](https://github.com/babyman/quick-tabs-chrome-extension)
