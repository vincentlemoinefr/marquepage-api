export default function openapiManager(path, fs, yaml) {
  const definitionYaml = fs.readFileSync(path).toString();
  return yaml.parse(definitionYaml);
};
