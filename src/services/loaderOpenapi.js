export default function loaderOpenapi(path, fs, yaml) {
  const definitionYaml = fs.readFileSync(path).toString();
  return yaml.parse(definitionYaml);
};
