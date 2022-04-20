const UPDATE_BUILT_MANIFEST = "UPDATE_BUILT_MANIFEST";
const argv = process.argv.slice(2);

const path = require('path/posix');
const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const package = require(paths.appPackageJson);

const manifestFilename = path.join(process.env[UPDATE_BUILT_MANIFEST] === 'true' ? paths.appBuild : paths.appPublic, './manifest.json');

let rawManifest = fs.readFileSync(manifestFilename);
let manifest = JSON.parse(rawManifest);

manifest["version"] = package.version;
let versionName = [ package.version ]

if(argv[0] && argv[0].length > 0)
   versionName.push(argv[0]);

manifest["version_name"] = versionName.join('-');

console.log(`Updating manifest version to ${package.version} and version_name to ${manifest["version_name"]}`);
fs.writeFileSync(manifestFilename, JSON.stringify(manifest, null, 2));
