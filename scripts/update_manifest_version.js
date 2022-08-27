const argv = process.argv.slice(2);

const path = require('path/posix');
const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const package = require(paths.appPackageJson);

const manifestFilename = path.join(paths.appBuild, './manifest.json');

let rawManifest = fs.readFileSync(manifestFilename);
let manifest = JSON.parse(rawManifest);

manifest["version"] = package.version.replace(/-.*$/, '');
let versionName = [package.version]

if (process.env.NODE_ENV == "development") {
   revision = require('child_process')
      .execSync('git rev-parse --short HEAD')
      .toString().trim()

   versionName.push(revision)
} else {
   if (argv[0] && argv[0].length > 0)
      versionName.push(argv[0]);

}

manifest["version_name"] = versionName.join('-');

console.log(`setting manifest version: ${manifest["version"]}, version_name: ${manifest["version_name"]}`);
fs.writeFileSync(manifestFilename, JSON.stringify(manifest, null, 2));
