const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

// Add platform-specific resolver for web
defaultConfig.resolver.resolverMainFields = ['browser', 'main'];

// Exclude problematic native modules when bundling for web
if (process.env.EXPO_TARGET === 'web') {
  defaultConfig.resolver.blockList = [
    /\/node_modules\/react-native-maps\/lib\/MapMarkerNativeComponent\.js$/,
    /react-native\/Libraries\/Utilities\/codegenNativeCommands/,
  ];
}

module.exports = defaultConfig;
