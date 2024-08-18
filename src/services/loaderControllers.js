export default async function loadControllers({config, fs}) {

  const directory = config.API_CONTROLLERS_DIR;
  const files = fs.readdirSync(directory);
  const controllers = {};

  for (const file of files) {
    if (file !== 'index.js' && file.endsWith('.js')) {
      const name = file.replace('.js', '');
      const constroller = await import('#controllers/' + name);
      controllers[name] = constroller.default;
    };
  };

  return controllers;
};