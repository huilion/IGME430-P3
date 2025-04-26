const mongoose = require('mongoose');
const _ = require('underscore');

const setEntry = (entry) => _.escape(entry).trim();

const EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  entry: {
    type: String,
    required: true,
    trim: true,
    set: setEntry,
  },
  date: {
    type: Date,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  }
});

EntrySchema.statics.toAPI = (doc) => ({
  title: doc.title,
  entry: doc.entry,
  date: doc.date,
  owner: doc.owner,
});

const EntryModel = mongoose.model('Entry', EntrySchema);
module.exports = EntryModel;