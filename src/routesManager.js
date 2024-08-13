export default function routesManager(controllers, openapi, router) {

  for (const path in openapi.paths) {

    const route = openapi.paths[path];

    for (const httpMethod in route) {
      router[httpMethod](
        path.replaceAll('{',':').replaceAll('}',''),
        controllers[route[httpMethod].operationId]
      );
    };
  };

  return router;
};