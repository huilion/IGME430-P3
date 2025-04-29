import { useState, useEffect } from 'react';
import helper from './helper.js';
const React = require('react');
const { createRoot } = require('react-dom/client');


// Get feed entries and display it back
const Feed = () => {
  const [entries, setEntries] = useState([]);

  // Get the feed entries with router
  useEffect(() => {
    const loadFeed = async () => {
      try {
        const response = await fetch('/getFeed');
        const data = await response.json();
        setEntries(data.entries);
      } catch (err) {
        console.error('Failed to fetch feed:', err);
      }
    };

    loadFeed();
  }, []);


  // Ensure like is sent through a post request
  const handleLike = async (entryId) => {
    const data = {};
    await helper.sendPost(`/like/${entryId}`, data, (result) => {
      if (result.likes !== undefined) {
        setEntries(curr =>
          curr.map(entry =>
            entry._id === entryId ? { ...entry, likes: result.likes } : entry
          )
        );
      }
    });
  };
  

  // No entries yet
  if (entries.length === 0) { 
    return (
      <div className="feed">
        <h3 className="emptyFeed">No posts yet!</h3>
      </div>
    );
  }

  // The display of feeds
  return (
    <div className="feed">
      {entries
        .filter(entry => entry.owner && entry.owner.username) // Only keep entries that have an owner with a username
        .map((entry) => (
          <div key={entry._id} className="feed-entry">
            <h4 className="feed-title">{entry.title}</h4>
            <p className="feed-text">{entry.entry}</p>
            <p className="feed-date">{new Date(entry.date).toLocaleDateString()}</p>
            <p className="feed-owner">Posted by: {entry.owner.username}</p>
            <div className="likes-section">
              <button onClick={() => handleLike(entry._id)}>
              {entry.likes}<i class="fa-solid fa-heart"></i>
              </button>
            </div>
          </div>
      ))}
    </div>
  );
};

const App = () => {
    return (
        <div>
            <Feed />
        </div>
    )
}

const init = () => {
    const root = createRoot(document.getElementById('feed-content'));
    root.render(<App />);
}

window.onload = init;