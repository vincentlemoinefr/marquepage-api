// This will check that the id provided is well formed, and then query the
// Database to check if the object exists
export default function securityFindById(request, response, next) {
  response.status(500).end();
};