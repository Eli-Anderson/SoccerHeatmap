import React, { useEffect } from "react";
import "./App.css";
import { TeamSelect } from "./teamSelect";
import {
    Grid,
    makeStyles,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@material-ui/core";
import { EventSelect } from "./eventSelect";
import { PlayerSelect } from "./playerSelect";
import { useState } from "react";
import { Heatmap } from "./heatmap";
import { MatchSelect } from "./matchSelect";
import { PlayerSearch } from "./PlayerSearch";

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

    const [searchType, setSearchType] = useState("player");

    useEffect(() => {
        fetch("http://localhost:3001/lists/allTeams")
            .then(response => response.json())
            .then(d => d.sort((a, b) => (a[1] < b[1] ? -1 : 1)))
            .then(setTeams)
            .catch(error => console.error(error));
        // get the list of Event Types
        fetch("http://localhost:3001/lists/allEventTypes")
            .then(response => response.json())
            .then(removeDuplicates)
            .then(setEventTypes)
            .catch(error => console.error(error));
        // get the list of all Players
        fetch("http://localhost:3001/lists/allPlayers")
            .then(response => response.json())
            .then(d => d.sort()) // sort alphabetically
            .then(setPlayers)
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (team && team !== "none") {
            // get matches for team
            fetch("http://localhost:3001/matches/" + team)
                .then(response => response.json())
                .then(d => d.sort((a, b) => (a[5] < b[5] ? 1 : -1))) // sort by date (new -> old)
                .then(setMatches)
                .catch(error => console.error(error));
        }
    }, [team]);

    useEffect(() => {
        if (event && event !== "none" && player && player !== "none") {
            let url = `http://localhost:3001/player/${player}/${event}`;
            setLoading(true);
            fetch(url)
                .then(response => response.json())
                .then(json =>
                    // flip the x, y !!!
                    json.map(p => ({ x: p[1], y: p[0], value: 1 }))
                )
                .then(setData)
                .then(() => setLoading(false));
        } else {
            setData([]);
        }
    }, [player, event]);

    /* Fetch heatmap data based on match_id */

    /* uncomment when API is implemented for this endpoint */
    useEffect(() => {
        if (event && team && team !== "none" && match && match !== "none") {
            let url = `http://localhost:3001/match/${match}/${event}`;
            setLoading(true);
            fetch(url)
                .then(response => response.json())
                .then(json =>
                    // flip the x, y !!!
                    json.map(p => ({ x: p[1], y: p[0], value: 1 }))
                )
                .then(setData)
                .then(() => setLoading(false));
        }
    }, [team, event, match]);

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
                        <Grid
                            container
                            spacing={5}
                            direction="row"
                            alignItems="center"
                        >
                            <Grid item>
                                <EventSelect
                                    value={event}
                                    onChange={ev => setEvent(ev.target.value)}
                                    data={eventTypes}
                                />
                            </Grid>
                            <Grid item>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Search by...
                                    </FormLabel>
                                    <RadioGroup
                                        value={searchType}
                                        onChange={(ev, value) =>
                                            setSearchType(value)
                                        }
                                    >
                                        <FormControlLabel
                                            value="player"
                                            control={<Radio />}
                                            label="Player"
                                        />
                                        <FormControlLabel
                                            value="match"
                                            control={<Radio />}
                                            label="Match"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            {searchType === "player" && (
                                <Grid item>
                                    <PlayerSearch
                                        value={player}
                                        onChange={p => setPlayer(p)}
                                        data={players}
                                    />
                                </Grid>
                            )}
                            {searchType === "match" && (
                                <>
                                    <Grid item>
                                        <TeamSelect
                                            value={team}
                                            onChange={ev =>
                                                setTeam(ev.target.value)
                                            }
                                            data={teams}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <MatchSelect
                                            value={match}
                                            onChange={ev =>
                                                setMatch(ev.target.value)
                                            }
                                            team={team}
                                            data={matches}
                                            teams={teams}
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container className={classes.content} justify="center">
                    <Grid item>
                        <Heatmap data={data} loading={loading} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export { App };
