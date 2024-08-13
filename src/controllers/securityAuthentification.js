// This will check that the user's JWT is valid
export default function securityAuthentification(request, response, next) {
  response.status(500).end();
};