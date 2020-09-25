
function setupDataBase(database, url) {
    return new Promise(resolve => {
      console.log('- Creating database connection...');
      database.connect(url,  {
        useNewUrlParser: true,
        useUnifiedTopology: true}, (err, client) => {
          if (err != null) {
            throw err;
          }
          console.log('- Database connection successfully created.');
          resolve(client.db('microtest'));
        });  
    });
  }

  module.exports = setupDataBase;