const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const Path = require("path");

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader')
      },
      {
        loader: require.resolve('react-docgen-typescript-loader')
      },
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: { parser: 'typescript' }
      }
    ]
  });
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader'
      },
      {
        loader: 'sass-loader'
      }
    ]
  });
  config.resolve.extensions.push('.ts', '.tsx', '.scss');
  config.resolve.plugins = [
    new TsconfigPathsPlugin({
      configFile: Path.resolve(__dirname, "../tsconfig.json")
    })
  ];
  return config;
};
