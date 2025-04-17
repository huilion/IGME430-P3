const models = require('../models');

const { Journal } = models;

const mainPage = async (req, res) => {
    res.render('app');
}

const writeEntry = async(req, res) => {
    if(!req.body.entry || !req.body.date) {
        return res.status(400).json({error: "All fields are required"})
    }

    const journalData = {
        date: req.body.date,
        entry: req.body.entry
    };

    try {
        const newEntry = new Journal(journalData);
        await newEntry.save();
        return res.status(201).json({
            date: newEntry.date,
            entry: newEntry.entry
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "An error occured"})
    }
}
module.exports = {
    mainPage,
    writeEntry
}

