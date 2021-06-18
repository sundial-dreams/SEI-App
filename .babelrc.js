const isDev = process.env.NODE_ENV === 'development';
module.exports = api => {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env', {targets: {electron: 'v12.0.9'}}],
      ['@babel/preset-typescript', {transpileOnly: true}],
      ['@babel/preset-react']
    ],
    plugins: [
      '@babel/plugin-transform-runtime'
    ].concat(isDev ? 'react-hot-loader/babel' : [])
  };
};