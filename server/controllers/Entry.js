const models = require('../models');

const { Entry } = models;

// Render out the main page which holds all the user's written entries
const mainPage = async (req, res) => {
    res.render('app');
}

// Render the feed page of all the other users
const feedPage = async (req, res) => {
    res.render('feed');
}

// Write an entry and make it into an object with the schema
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
      // Make a new entry
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

// Get the entries of the user so we can display it on the main page
const getEntries = async (req, res) => {
    try {
      const query = { owner: req.session.account._id };
      const docs = await Entry.find(query).sort({date: -1}).select('title entry date').lean().exec();
  
      return res.json({ entries: docs });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error retrieving entries' });
    }
};

// Get all the entries of all users to display on the feed page
const getFeedEntries = async (req, res) => {
    try {
      const docs = await Entry
        .find({})
        .sort({ date: -1})
        .select('title entry date owner likes') // select the fields you want
        .populate('owner', 'username')    // pull only the username from the owner
        .lean()
        .exec();
      return res.json({ entries: docs });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error retrieving feed entries' });
    }
 };

// When an entry is liked, send request to like it and store the data 
const likeEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    const user = req.session.account._id;

    if (!entry) return res.status(404).json({ error: 'Entry not found' });

    if (entry.likedBy.includes(user)) {
      // Do not add like if user already liked it
      console.log("Already liked!");
      return res.json({ likes: entry.likes });
    } else {
      entry.likes += 1;
      entry.likedBy.push(user);
      await entry.save();
    }

    return res.json({ likes: entry.likes });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to like entry' });
  }
}
  

module.exports = {
    mainPage,
    feedPage,
    writeEntry,
    likeEntry,
    getEntries,
    getFeedEntries
}

