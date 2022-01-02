<img src="web-extension/icons/icon48.png" align="right" />

# Workspace One Finder
>This extension will display a searchable list of the applications to which your are entitled in [VMware Workspace One](https://www.vmware.com/products/workspace-one.html)

# Limitations
Currently, Finder only lists Applications that can be launched from your web browser, that is where the application is not a virtual app / Launched by Horizon.

# Development

This project uses `webpack` to bundle assets in [/src](/src)

Use npm to run webpack in watch mode like so

```
npm run watch
```

You may then load the [/web-extension](/web-extension) directory as an unpacked extension in Chrome

# Installation

## Chrome
<img src="https://img.shields.io/chrome-web-store/stars/aehfcfgkfhkaclkhjhonjoabaklkpggc"> <img src="https://img.shields.io/chrome-web-store/v/aehfcfgkfhkaclkhjhonjoabaklkpggc"> <img src="https://img.shields.io/chrome-web-store/users/aehfcfgkfhkaclkhjhonjoabaklkpggc">

### Install
You can find this extension in the [Chrome Web Store](https://chrome.google.com/webstore/detail/appfinder-for-workspace-o/aehfcfgkfhkaclkhjhonjoabaklkpggc)

Alternatively load the [build](#how-to-build-the-extension) as an [unpacked extension](https://developer.chrome.com/extensions/getstarted#manifest)

## Firefox
<img src="https://img.shields.io/amo/stars/appfinder-for-workspace-one"> <img src="https://img.shields.io/amo/v/appfinder-for-workspace-one"> <img src="https://img.shields.io/amo/users/appfinder-for-workspace-one">

### Install
You can find this extension here: [Firefox Browser Add-Ons](https://addons.mozilla.org/en-US/firefox/addon/appfinder-for-workspace-one)

Alternatively load the [build](#how-to-build-the-extension) as a [temporary addon](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

## Edge
[![](https://img.shields.io/badge/dynamic/json?label=rating&suffix=/5&query=%24.averageRating&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Ffaalidmfeahkcajpjccbgdfglmhepbfk)](https://microsoftedge.microsoft.com/addons/detail/workspace-one-finder/faalidmfeahkcajpjccbgdfglmhepbfk)
[![](https://img.shields.io/badge/dynamic/json?label=edge%20add-on&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Ffaalidmfeahkcajpjccbgdfglmhepbfk)](https://microsoftedge.microsoft.com/addons/detail/workspace-one-finder/faalidmfeahkcajpjccbgdfglmhepbfk)

### Install
You can find this extension at [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/workspace-one-finder/faalidmfeahkcajpjccbgdfglmhepbfk)

Alternatively you may [sideload](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading) the [build](#how-to-build-the-extension)

## How to build the extension

run the following command from the root directory of this repository

```
npm run build
```


# Manual Testing
Looking to test this extension without access to an existing Workspace ONE account? You can sign up for a VMware Test Drive account here: [VMware Test Drive](https://portal.vmtestdrive.com/) and then update this extension's options from your browser to point to: <https://testdrive.vidmpreview.com/>
