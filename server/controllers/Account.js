const models = require('../models'); // Import all models

const { Account } = models;

// Render login handlebars
const loginPage = (req, res) => res.render('login'); // Render the login page

// Handling logging out
const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

// Handling logging in
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/main' }); // Redirect user to the main page
  });
};

// Handling signing up for an account
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });

    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/main' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username is already in use' });
    }
    return res.status(500).json({ error: 'An error occured' });
  }
};

module.exports = {
  loginPage,
  login,
  logout,
  signup,
};
