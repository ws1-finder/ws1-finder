const path = require('path/posix');
const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const package = require(paths.appPackageJson);
const manifestFilename = path.join(paths.appPublic, './manifest.json');

let rawManifest = fs.readFileSync(manifestFilename);
let manifest = JSON.parse(rawManifest);

manifest["version"] = package.version;
manifest["version_name"] = package.version;

console.log(`Updating manifest version to ${package.version}`);
fs.writeFileSync(manifestFilename, JSON.stringify(manifest, null, 2));
