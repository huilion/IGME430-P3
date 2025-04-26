const models = require('../models');

const { Entry } = models;

const mainPage = async (req, res) => {
    res.render('app');
}

const writeEntry = async(req, res) => {
    if(!req.body.title || !req.body.entry || !req.body.date) {
        return res.status(400).json({error: "All fields are required"})
    }

    const entryData = {
        title: req.body.title,
        entry: req.body.entry,
        date: req.body.date,
        owner: req.session.account._id,
    };

    try {
        const newEntry = new Entry(entryData);
        await newEntry.save();
        return res.status(201).json({
            title: newEntry.title,
            entry: newEntry.entry,
            date: newEntry.date,
            owner: newEntry.owner
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "An error occured"})
    }
}

const getEntries = async (req, res) => {
    try {
      const query = { owner: req.session.account._id };
      const docs = await Entry.find(query).select('title entry date').lean().exec();
  
      return res.json({ entries: docs });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error retrieving domos' });
    }
  };

  const getFeedEntries = async (req, res) => {
    try {
      const docs = await Entry
        .find({})
        .select('title entry date owner') // select the fields you want
        .populate('owner', 'username')    // pull only the username from the owner
        .lean()
        .exec();
      return res.json({ entries: docs });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error retrieving feed entries' });
    }
  };
  

module.exports = {
    mainPage,
    writeEntry,
    getEntries,
    getFeedEntries
}

