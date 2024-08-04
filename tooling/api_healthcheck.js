const https = require('http');




const response = https.request(
  {
    host: '127.0.0.1',
    method: 'GET',
    path: '/info',
    port: 443,
    timeout: 500,
    rejectUnauthorized: false,
    requestCert: true,
    agent: false
  },
  (res) => {
    let body = '';
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        const payload = JSON.parse(body);
        switch (payload.status) {
          case 1:
          case 3:
            console.log('HEALTHCHECK: online');
            process.exit(0);
          case 2:
          default:
            console.log('HEALTHCHECK: offline');
        }
      } else {
        console.log('HEALTHCHECK: offline');
      }
      process.exit(1);
    });
  }
);

response.on('error', function (err) {
  console.log('HEALTHCHECK: offline');
  process.exit(1);
});

response.end();
