import path from 'path';

export default function TricksModule(moduleOptions) {
  const options = Object.assign({}, this.options.tricks, moduleOptions);
  this.addPlugin({
    src: path.resolve(__dirname, '../plugins/tricks.js.tmpl'),
    options,
  });

};

