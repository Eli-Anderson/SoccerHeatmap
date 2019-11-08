import React, { useEffect } from "react";
import "./App.css";
import { TeamSelect } from "./teamSelect";
import { Grid, makeStyles } from "@material-ui/core";
import { EventSelect } from "./eventSelect";
import { PlayerSelect } from "./playerSelect";
import { useState } from "react";
import { Heatmap } from "./heatmap";
import { MatchSelect } from "./matchSelect";

// create our context. The object inside is not necessary, but may help with knowing what
// fields we are keeping track of.
// this will help us manage the state of the app easier than passing props around between components.
const AppContext = React.createContext({
    event: null,
    setEvent: null,
    team: null,
    setTeam: null,
    player: null,
    setPlayer: null,
    match: null,
    setMatch: null,
    data: null,
    dataLoading: false
});

// define our styles here. this transforms css styles to a class so it is easier to apply
const useStyles = makeStyles({
    app: {
        margin: 20
    },
    content: {
        marginTop: 30
    }
});

const removeDuplicates = arr => {
    const results = [];
    arr.forEach(v => {
        if (!results.includes(v)) results.push(v);
    });
    return results;
};

function App(props) {
    const classes = useStyles(props);
    const [event, setEvent] = useState("");
    const [team, setTeam] = useState("");
    const [player, setPlayer] = useState("");
    const [match, setMatch] = useState("");
    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    const [eventTypes, setEventTypes] = useState([]);
    const [teams, setTeams] = useState([]);
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        /*
            Since Flask servers only allow a single connection at a time we need to request our
            data 'synchronously'. We can fetch all the data in this function and just pass it down
            to the children components (EventSelect, TeamSelect, etc)

            The general format is fetch then return the json in the response then update our data
        */
        fetch("http://localhost:3001/lists/allTeams")
            .then(response => response.json())
            .then(setTeams)
            // get the list of Event Types
            .then(() => fetch("http://localhost:3001/lists/allEventTypes"))
            .then(response => response.json())
            .then(removeDuplicates)
            .then(setEventTypes)
            // get the list of All Matches that we can filter later when a Team is selected
            // currently this does not return the data we need, only the dates of the matches
            .then(() => fetch("http://localhost:3001/lists/allMatches"))
            .then(response => response.json())
            .then(setMatches)
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        // if (team) {
        //     fetch("http://localhost:3001/search/teamsMatches/" + team)
        //         .then(response => response.json())
        //         .then(setMatches);
        // }
    }, [team]);

    return (
        <div className={"App " + classes.app}>
            <AppContext.Provider
                // pass our state and mutators on to whichever children need them
                value={{
                    event,
                    setEvent,
                    team,
                    setTeam,
                    player,
                    setPlayer,
                    match,
                    setMatch,
                    data,
                    dataLoading
                }}
            >
                <h3>Soccer Analyzer</h3>
                {/* Grid helps us manage the layout of elements */}

                <Grid
                    id="filterToolbar"
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Grid container spacing={5} direction="row">
                            <Grid item>
                                <EventSelect eventTypes={eventTypes} />
                            </Grid>
                            <Grid item>
                                <TeamSelect teams={teams} />
                            </Grid>
                            <Grid item>
                                <MatchSelect matches={matches} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Content body */}

                <Grid container className={classes.content}>
                    <Grid item>
                        <Heatmap />
                    </Grid>
                </Grid>
                <a
                    className="App-link"
                    href="localhost:3001/lists/allPlayers"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    test get_all_players_as_json_array
                </a>
            </AppContext.Provider>
        </div>
    );
}

export { App, AppContext };
