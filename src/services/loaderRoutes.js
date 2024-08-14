export default function routesManager(controllers, openapi, router) {

  for (const path in openapi.paths) {

    const route = openapi.paths[path];

    /* temp
    const conts = [];
    if (openapi.paths[path].security !== void 0) {
      conts.push(controllers.securityAuthentification);

      // AuthZ is not always needed (eg create a new binder)/*
      // But authN is needed
      conts.push(controllers.securityFindById);
      conts.push(controllers.securityAuthorization);
    }
    conts.push(controllers[route[httpMethod].operationId]);

    // Later...
    conts.push(controllers.securityErrorHandler)

    */

    for (const httpMethod in route) {
      /*
      console.log(
        'Trying to set : ', httpMethod,
        ' url : ', path.replaceAll('{',':').replaceAll('}',''),
        ' operationId : ', route[httpMethod].operationId);
      */
     
      router[httpMethod](
        path.replaceAll('{',':').replaceAll('}',''),
        controllers[route[httpMethod].operationId]
      );
    };
  };

  return router;
};