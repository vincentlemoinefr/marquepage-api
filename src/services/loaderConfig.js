export default function loadConfig(
  // Object deconstruction : get 'config' from librairies and place it in
  // 'originalConfig' and make 'originalConfig' empty object if not defined
  { config: originalConfig = {}, fs, yaml, schemaConfig },
  newConfig, 
  finalConfig = false
) {
  if (typeof newConfig === 'string' && newConfig.endsWith('.yaml')) {

    if (!fs.existsSync(newConfig)) return originalConfig;
    const yamlContent = fs.readFileSync(newConfig, 'utf8');
    if (!yamlContent) return originalConfig;
    const yamlConfig = yaml.parseDocument(yamlContent);

    if (yamlConfig.warnings.length !== 0 || yamlConfig.errors.length !== 0) {
      console.log('There was an error in this YAML file :', newConfig);
      process.exit(1);
    };

    newConfig = yamlConfig.toJS();
  };

  // todo : check if we have a file link for CERT and KEY and then load it
  if (!newConfig instanceof Object) return originalConfig;
  originalConfig = {...originalConfig, ...newConfig};
  const { value: validConfig , error } = schemaConfig.validate(originalConfig);

  if (error !== void 0 && finalConfig) {
    console.log('Terminating process because configurations are required :');
    for (const detail of error.details) console.log(detail.message);
    process.exit(1);
  };

  return validConfig;
};