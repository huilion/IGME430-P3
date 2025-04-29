const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
import WriteButton from './Write.jsx';

// Get all entries that the user has written
const EntryList = (props) => {
    const [entries, setEntries] = useState(props.entries);

    useEffect(() => {
        const loadEntriesFromServer = async () => {
            const response = await fetch('/getEntries');
            const data = await response.json();
            setEntries(data.entries);
        };
        loadEntriesFromServer();
    }, [props.reloadEntries]);


    if (entries.length === 0 ) {
        return (
            <div className="entryList">
                <h3 className="emptyEntry">Write something to share!</h3>
            </div>
        );
    }

    const entryNodes = entries.map(entry => {
        return (
            <div key={entry._id} className="entryNode">
                <h3 className="entryTitle">{entry.title}</h3>
                <h3 className="entryText">{entry.entry}</h3>
                <h3 className="entryDate">Date: {new Date(entry.date).toLocaleDateString()}</h3>
            </div>
        )
    });   

    return (
        <div className="entryList">
            {entryNodes}
        </div>
    );
}   

const App = () => {
    const [reloadJournals, setReloadJournals] = useState(false);

    return (
        <div>

                <WriteButton triggerReload={()=>setReloadJournals(!reloadJournals)}/>
                <EntryList entries={[]} reloadEntries={reloadJournals} />
        </div>
    )
}

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
}

window.onload = init;