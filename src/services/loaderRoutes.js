export default function routesManager(
  controllers,
  authentificationHandler,
  authorizationHandler,
  idValidator,
  openapi,
  router,
  logger
) {
  for (const path in openapi.paths) {

    const pathObject = openapi.paths[path];

    for (const httpMethod in pathObject) {

      if (httpMethod === 'parameters') continue;
      const finalControllers = [];

      if (pathObject[httpMethod].security !== void 0)
        finalControllers.push(authentificationHandler);

      if (pathObject.parameters !== void 0)
        finalControllers.push(idValidator);

      if (pathObject[httpMethod].security !== void 0)
        finalControllers.push(authorizationHandler);

      finalControllers.push(controllers[pathObject[httpMethod].operationId]);

      console.log(
        'Setting :', httpMethod,
        'on', path.replaceAll('{',':').replaceAll('}',''),
        'with', finalControllers);
    
      router[httpMethod](
        path.replaceAll('{',':').replaceAll('}',''),
        finalControllers
      );
    };
  };

  return router;
};