const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getEntries', mid.requiresLogin, controllers.Entry.getEntries);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/main', mid.requiresLogin, controllers.Entry.mainPage);
  app.post('/main', mid.requiresLogin, controllers.Entry.writeEntry);

  app.get('/getFeed', mid.requiresLogin, controllers.Entry.getFeedEntries);
  app.get('/feed', mid.requiresLogin, controllers.Entry.feedPage);

  app.post('/like/:id', mid.requiresLogin, controllers.Entry.likeEntry);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  app.all('*', controllers.Entry.notFoundPage);

  
};

module.exports = router;
