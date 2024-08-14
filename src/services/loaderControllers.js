export default async function loadControllers(path, fs) {

  const files = fs.readdirSync(path);
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