export default function loadConfig(
  {
    schemaConfig,
    config = {},
    yaml,
    fs
  },
  nextConfig = false, 
  finalConfig = false
) {

  // if it's Openapi we only want to load, not chance original config
  if (typeof nextConfig === 'string' && nextConfig.includes('Openapi')) {
    nextConfig = loadYaml(nextConfig, yaml, fs);
    if (nextConfig !== 'cantLoadError') {
      return nextConfig;
    };
  };

  // if it's a string we will load it as yaml
  if (typeof nextConfig === 'string') {
    nextConfig = loadYaml(nextConfig, yaml, fs);
  };

  // At this point nextConfig should be an object, return config if not
  if (!nextConfig instanceof Object) {
    return config;
  };

  const { value: validConfig , error }
    = schemaConfig.validate({...config, ...nextConfig});

  if (error !== void 0 && finalConfig) {
    console.log('Those configurations are required :');
    for (const detail of error.details) {
      console.log(detail.message);
    };
    process.exit(1);
  };

  return validConfig;
};

function loadYaml(Yamlfile, yaml, fs) {
  if (!fs.existsSync(Yamlfile)) {
    console.log(Yamlfile, 'doesnt exist.');
    return 'cantLoadError';
  };

  const yamlContent = fs.readFileSync(Yamlfile, 'utf8');

  if (!yamlContent) {
    console.log('Yaml file', Yamlfile, 'is empty.');
    return 'cantLoadError';
  };
  
  const yamlConfig = yaml.parseDocument(yamlContent);

  if (yamlConfig.warnings.length !== 0 || yamlConfig.errors.length !== 0) {

    for (const error of yamlConfig.errors) {
      console.log(error)
    };

    for (const warning of yamlConfig.warnings) {
      console.log(warning)
      
    };
    return 'cantLoadError';
  };

  return yamlConfig.toJS();
};