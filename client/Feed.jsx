import React, { useState, useEffect } from 'react';

const Feed = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const response = await fetch('/feed');
        const data = await response.json();
        console.log(data);
        setEntries(data);
        console.log(data);
      } catch (err) {
        console.error('Failed to fetch feed:', err);
      }
    };

    loadFeed();
  }, []);

  if (entries.length === 0) {
    return (
      <div className="feed">
        <h3 className="emptyFeed">No posts yet!</h3>
      </div>
    );
  }

  console.log(entries);

//   return (
//     <div className="feed">
//       {entries.map((entry) => (
//         <div key={entry._id} className="feed-entry">
//           <h4 className="feed-title">{entry.title}</h4>
//           <p className="feed-text">{entry.entry}</p>
//           <p className="feed-date">{new Date(entry.date).toLocaleDateString()}</p>
//           <p className="feed-owner">Posted by: </p>
//         </div>
//       ))}
//     </div>
//   );
};

export default Feed;
