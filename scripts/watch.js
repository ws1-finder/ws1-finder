// https://gist.github.com/int128/e0cdec598c5b3db728ff35758abdbafd

process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const config = require('react-scripts/config/webpack.config.js');
const path = require('path');

const conf = config('development');

for (const rule of conf.module.rules) {
  if (!rule.oneOf) continue

  for (const one of rule.oneOf) {
    if (
      one.loader &&
      one.loader.includes('babel-loader') &&
      one.options &&
      one.options.plugins
    ) {
      one.options.plugins = one
        .options
        .plugins
        .filter(plugin =>
          typeof plugin !== 'string' ||
          !plugin.includes('react-refresh')
        )
    }
  }
}

conf.plugins = conf
  .plugins
  .filter(plugin =>
    !(plugin instanceof webpack.HotModuleReplacementPlugin) &&
    !(plugin instanceof ReactRefreshPlugin)
  )

// We needed to output to a specific folder for cross-framework interop.
// Make sure to change the output path or to remove this line if the behavior
// of the original gist is sufficient for your needs!
conf.output.path = path.join(process.cwd(), './build');

webpack(conf).watch({}, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    copyPublicFolder();
  }
  console.error(stats.toString({
    chunks: false,
    colors: true
  }));
});

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });

  var cp = require('child_process');
  cp.fork(path.join(__dirname, '/update_manifest_version.js'),[ 'dev-watch']);
}