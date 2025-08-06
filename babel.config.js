module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          api: './src/api',
          screens: './src/screens',
          services: './src/services',
          shared: './src/shared',
          utils: './src/utils',
          assets: './src/shared/assets',
        },
      },
    ],
  ],
};
