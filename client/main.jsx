const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');


const JournalForm = (props) => {
    return(
        <form
            onSubmit={(e) => handleEntries(e, props.triggerReload)}
            action="/main"
            method="POST"
        >
            <label htmlFor="entry">Entry: </label>
            <input type="test" name="entry" placeholder="Entry" />
            <label htmlFor="date">date: </label>
            <input type="test" name="date" placeholder="Date" />

            <input type="submit" value="Make Entry" />
        </form>
    )
}

const App = () => {
    const [reloadJournals, setReloadJournals] = useState(false);

    return (
        <div>
            <div id="makeEntry">
                <JournalForm triggerReload={() => setReloadJournals(!reloadJournals)}/>
            </div>
        </div>
    )
}

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
}

window.onload = init;