const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');
import NavBar from './components.jsx';
import WriteButton from './Write.jsx';
import Feed from './Feed.jsx';

const EntryList = (props) => {
    const [entries, setEntries] = useState(props.entries);

    useEffect(() => {
        const loadEntriesFromServer = async () => {
            const response = await fetch('/getEntries');
            const data = await response.json();
            setEntries(data.entries);
            console.log(data.entries);
        };
        loadEntriesFromServer();
    }, [props.reloadEntries]);


    if (entries.length === 0 ) {
        return (
            <div className="entryList">
                <h3 className="emptyEntry">No Domos Yet!</h3>
            </div>
        );
    }

    console.log(entries);
    const entryNodes = entries.map(entry => {
        return (
            <div key={entry._id} className="entryNode">
                <h3 className="entryTitle">Title: {entry.title}</h3>
                <h3 className="entryText">Name: {entry.entry}</h3>
                <h3 className="entryDate">Date: {entry.date}</h3>
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
            <NavBar />
            <div id="makeEntry">
            </div>
            <div id="domos">
                <EntryList entries={[]} reloadEntries={reloadJournals} />
            </div>
            <div>
                <Feed />
            </div>
            <WriteButton triggerReload={()=>setReloadJournals(!reloadJournals)}/>
        </div>
    )
}

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
}

window.onload = init;