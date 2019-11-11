import React, { useEffect } from "react";
import "./App.css";
import { TeamSelect } from "./teamSelect";
import { Grid, makeStyles } from "@material-ui/core";
import { EventSelect } from "./eventSelect";
import { PlayerSelect } from "./playerSelect";
import { useState } from "react";
import { Heatmap } from "./heatmap";
import { MatchSelect } from "./matchSelect";

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
    const [event, setEvent] = useState("none");
    const [team, setTeam] = useState("none");
    const [player, setPlayer] = useState("none");
    const [match, setMatch] = useState("none");
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [eventTypes, setEventTypes] = useState([]);
    const [teams, setTeams] = useState([]);
    const [matches, setMatches] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        /*
            Since Flask servers only allow a single connection at a time we need to request our
            data 'synchronously'. We can fetch all the data in this function and just pass it down
            to the children components (EventSelect, TeamSelect, etc)

            The general format is fetch then return the json in the response then update our data
        */
        fetch("http://localhost:3001/lists/allTeams")
            .then(response => response.json())
            .then(d => d.sort())
            .then(setTeams);
        // get the list of Event Types
        fetch("http://localhost:3001/lists/allEventTypes")
            .then(response => response.json())
            .then(removeDuplicates)
            .then(setEventTypes);
        // get the list of All Matches that we can filter later when a Team is selected
        // currently this does not return the data we need, only the dates of the matches
        // .then(() => fetch("http://localhost:3001/lists/allMatches"))
        // .then(response => response.json())
        // .then(d => d.sort()) // sort the dates
        // .then(setMatches)
        // get the list of all Players
        fetch("http://localhost:3001/lists/allPlayers")
            .then(response => response.json())
            .then(d => d.sort()) // sort alphabetically
            .then(setPlayers)
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (player && player !== "none" && event === "foulcommit") {
            setLoading(true);
            fetch("http://localhost:3001/fouls/" + player)
                .then(response => response.json())
                .then(json => json.map(p => ({ x: p[0], y: p[1], value: 1 })))
                .then(setData)
                .then(() => setLoading(false));
        } else {
            setData([]);
        }
    }, [player, event]);

    return (
        <div className={"App " + classes.app}>
            <h3>Soccer Analyzer</h3>
            {/* Grid helps us manage the layout of elements */}
            <div>
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
                                <EventSelect
                                    value={event}
                                    onChange={ev => setEvent(ev.target.value)}
                                    data={eventTypes}
                                />
                            </Grid>
                            <Grid item>
                                <PlayerSelect
                                    value={player}
                                    onChange={ev => setPlayer(ev.target.value)}
                                    data={players}
                                />
                            </Grid>
                            <Grid item>
                                <TeamSelect
                                    value={team}
                                    onChange={ev => setTeam(ev.target.value)}
                                    data={teams}
                                />
                            </Grid>
                            <Grid item>
                                <MatchSelect
                                    value={match}
                                    onChange={ev => setMatch(ev.target.value)}
                                    team={team}
                                    data={matches}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container className={classes.content}>
                    <Grid item>
                        <Heatmap data={data} loading={loading} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export { App };
