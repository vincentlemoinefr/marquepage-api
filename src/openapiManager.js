export default function openapiManager(path, fs, yaml, log) {
  const definitionYaml = fs.readFileSync(path).toString();
  return yaml.parse(definitionYaml);
};
