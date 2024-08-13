export default function definitionRead(request, response, next, definition = { test: 123}) {
  response
    .status(200)
    .json(definition);
};