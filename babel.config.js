module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@config': './src/config',
        '@modules': './src/modules',
        '@shared': './src/shared'
      }
    }],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-transform-modules-commonjs", {
      "allowTopLevelThis": true,
      "loose": true,
      "lazy": true
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
