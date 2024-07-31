module.exports = (request, response) => {
    console.log(request);
    response.send('hello world, I am in src/controllers/readBinder.js');
};