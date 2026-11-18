// The desk is one HTML file (assets/desk.html, built by scripts/build-embed.mjs in the main project):
// it's packed into the app as a file, like a picture, not read as code.
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('html');

module.exports = config;
