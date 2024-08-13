// This will validate the structure of every http request we recieve
export default function securityHttpRequest(request, response, next) {
  response.status(500).end();
};