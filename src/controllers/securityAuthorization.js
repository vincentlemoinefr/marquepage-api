// This will check the user permission on the queried object
export default function securityAuthorization(request, response, next) {
  response.status(500).end();
};