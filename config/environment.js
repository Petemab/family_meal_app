const databaseURI = process.env.MONGODB_URI || 'mongodb://localhost/family-restaurants';
const port = process.env.PORT || 8000;


module.exports = {databaseURI, port};
