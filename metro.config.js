const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable package exports for React Native Firebase
config.resolver.unstable_enablePackageExports = true;

module.exports = config;
