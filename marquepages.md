Notes, commands, whatever

Make a self signed certificate :
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -sha256 -days 3650 -nodes -subj "/C=FR/ST=IDF/L=Paris/O=marquepage/OU=IT/CN=localhost"

Transform joi to doc : https://github.com/jacobworrel/joi-md-doc

Packagen winston : https://www.npmjs.com/package/winston

winston max file size : https://stackoverflow.com/questions/25028454/nodejs-winston-log-file-not-change-upon-size-limit

winston max file size : https://github.com/winstonjs/winston-daily-rotate-file/issues/12

Docs, joi : https://joi.dev/api/?v=17.13.3

API, joi : https://github.com/hapijs/joi/blob/master/API.md

joi when() : https://stackoverflow.com/questions/56423558/joi-validation-how-to-require-or-optional-field-based-on-another-key-exists-in

joi default require : https://stackoverflow.com/questions/55949766/joi-make-everything-required-by-default

snyk joi : https://snyk.io/advisor/npm-package/joi

joi with express example : https://github.com/howardmann/validation

joi custom errors : https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages

Validations on the api requests : https://www.digitalocean.com/community/tutorials/how-to-use-joi-for-node-api-schema-validation

node docs : https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener

OpenAPI docs : https://learn.openapis.org/specification/paths.html

interesting but will not use : https://www.npmjs.com/package/swagger-ui-express

interesting will maybe use :https://www.npmjs.com/package/openapi?activeTab=readme

HTTP response codes : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses

OpenAPI apis examples : https://apis.guru/

Youtube Express https://www.youtube.com/watch?v=KtnHb7FMk2Q&list=PLp50dWW_m40Vruw9uKGNqySCNFLXK5YiO&index=1

Youtube Mongodb https://www.youtube.com/watch?v=Ya0H-7A5cE4&list=PLp50dWW_m40UWFSV6PTgYzciZJIxgHy7Q&index=1


Steps of my api :

1/ Config is loaded from env
2/ Validate config from a shema ? with joi
	Check no undefined parameters
	set default parameters
	Check if http / https
	if https check if certificates
	cache config? 
	how can I reload the config without rebuilding
	
3/ Load modules
	joi
	winston
	Express
	Express Rate Limit
	Cors
	Helmet
	http / https

4/ Connect to the database
5/ The api need to check the database periodically
6/ Start the api

Additionnal parameters : 

allowedOrigins": [] // CORS shit
maxSyncSize": 512000 // Max data per binder ?
throttleMaxRequests: 1000 // rate limit
throttleTimeWindow: 300000 // rate limit
allowNewSyncs": true // is the api available (eg: database down = false)

HTTP METHODS :

https://blog.octo.com/should-i-put-or-should-i-patch

https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/

SESSIONS :

https://medium.com/@prashantramnyc/authenticate-rest-apis-in-node-js-using-jwt-json-web-tokens-f0e97669aad3

https://www.acunetix.com/blog/web-security-zone/http-security/

https://expressjs.com/en/advanced/best-practice-security.html

https://www.mongodb.com/docs/manual/core/schema-validation/

PACKAGES : 

https://www.npmjs.com/package/winston

https://www.npmjs.com/package/express-rate-limit

https://github.com/goldbergyoni/nodebestpractices/tree/master

https://hub.docker.com/layers/library/node/lts-alpine3.20/images/sha256-375518d70893d14665b99393079e77bd4947884f123a66ade28744eb8340d229

https://12factor.net/

https://spec.openapis.org/oas/latest.html



21/07/2024 :

https://expressjs.com/en/api.html#req

https://expressjs.com/en/guide/routing.html

https://www.youtube.com/watch?v=fUWkVxCv4IQ

We need to manage concurrent requests if we want a shared binder :

https://medium.com/swlh/handling-concurrent-requests-in-a-restful-api-5a25a4b81a1

Do we need to manage CORS ?...
https://swagger.io/docs/open-source-tools/swagger-ui/usage/cors/


Software architecture choices :
  - The app is only an API and will never return something else than JSON
  - If we want to inform the user on missuse, we might redirect him to another server ( eg : api.domain.com redirect to domain.com ) but that server will be another application.
  - Enforce HTTPS in all environments
	- log to database instead of file ? 

Blue / Green deployment ideas :
  - A push to the main branch should trigger a deployment to the blue environment (non-live)
	- After that, we need to press a Promote to Live button to promote the non-live environment to the live environment.
	- Once an environment is live, we should be able to roll back to the previous live environment by pressing the Rollback button.
  - What about the database ? 

