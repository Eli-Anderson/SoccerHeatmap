import React, { useEffect } from "react";
// import "./App.css";
import { TeamSelect } from "./teamSelect";
import {
    Grid,
    makeStyles,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box
} from "@material-ui/core";
import { EventSelect } from "./eventSelect";
import { useState } from "react";
import { Heatmap } from "./heatmap";
import { MatchSelect } from "./matchSelect";
import { PlayerSearch } from "./PlayerSearch";
import { DataInfo } from "./DataInfo";

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
    const [allTeams, setAllTeams] = useState([]);
    const [allPlayers, setAllPlayers] = useState([]);
    const [matches, setMatches] = useState([]);

    const [searchType, setSearchType] = useState("player");

    useEffect(() => {
        fetch("http://localhost:3001/lists/allTeams")
            .then(response => response.json())
            .then(d => d.sort((a, b) => (a[1] < b[1] ? -1 : 1))) // sort alphabetically by name
            .then(setAllTeams)
            .catch(error => console.error(error));
        fetch("http://localhost:3001/lists/allPlayers")
            .then(response => response.json())
            .then(json => json.map(p => ({ id: p[0], name: p[1] })))
            .then(setAllPlayers)
            .catch(error => console.error(error));
        fetch("http://localhost:3001/lists/teamsWithEvents")
            .then(response => response.json())
            .then(d => d.sort((a, b) => (a[1] < b[1] ? -1 : 1))) // sort alphabetically by name
            .then(setTeams)
            .catch(error => console.error(error));

        // get the list of Event Types
        fetch("http://localhost:3001/lists/allEventTypes")
            .then(response => response.json())
            .then(removeDuplicates)
            .then(d => d.sort()) // sort alphabetically
            .then(setEventTypes)
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (
            searchType === "match" &&
            team &&
            team !== "none" &&
            event &&
            event !== "none"
        ) {
            // get matches for team
            fetch(`http://localhost:3001/matches/${team}/${event}`)
                .then(response => response.json())
                .then(d => d.sort((a, b) => (a[5] < b[5] ? 1 : -1))) // sort by date (new -> old)
                .then(setMatches)
                .catch(error => console.error(error));
        }
    }, [team, searchType, event]);

    useEffect(() => {
        if (
            searchType === "player" &&
            event &&
            event !== "none" &&
            player &&
            player !== "none"
        ) {
            let url = `http://localhost:3001/player/${player}/${event}`;
            setLoading(true);
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    // flip the x, y !!!
                    return json.map(
                        ([
                            y,
                            x,
                            subType,
                            teamID,
                            playerID,
                            playerFouled,
                            playerAssist
                        ]) => ({
                            x,
                            y,
                            value: 1,
                            subType,
                            teamID,
                            playerID,
                            playerFouled,
                            playerAssist
                        })
                    );
                })
                .then(setData)
                .then(() => setLoading(false));
        } else {
            setData([]);
        }
    }, [player, event, searchType]);

    /* Fetch heatmap data based on match_id */

    useEffect(() => {
        if (
            searchType === "match" &&
            event &&
            team &&
            team !== "none" &&
            match &&
            match !== "none"
        ) {
            let url = `http://localhost:3001/match/${match}/${event}`;
            setLoading(true);
            fetch(url)
                .then(response => response.json())
                .then(json =>
                    // flip the x, y !!!
                    json.map(
                        ([
                            y,
                            x,
                            subType,
                            teamID,
                            playerID,
                            playerFouled,
                            playerAssist
                        ]) => ({
                            x,
                            y,
                            value: 1,
                            subType,
                            teamID,
                            playerID,
                            playerFouled,
                            playerAssist
                        })
                    )
                )
                .then(setData)
                .then(() => setLoading(false));
        }
    }, [team, event, match, searchType]);

    useEffect(() => {
        if (searchType === "team" && event && team && team !== "none") {
            let url = `http://localhost:3001/team/${team}/${event}`;
            setLoading(true);
            fetch(url)
                .then(response => response.json())
                .then(json =>
                    // flip the x, y !!!
                    json.map(
                        ([
                            y,
                            x,
                            subType,
                            teamID,
                            playerID,
                            playerFouled,
                            playerAssist
                        ]) => ({
                            x,
                            y,
                            value: 1,
                            subType,
                            teamID,
                            playerID,
                            playerFouled,
                            playerAssist
                        })
                    )
                )
                .then(setData)
                .then(() => setLoading(false));
        }
    }, [team, event, match, searchType]);

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
                                            value="team"
                                            control={<Radio />}
                                            label="Team"
                                        />
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
                                        event={event}
                                        onChange={p => setPlayer(p)}
                                    />
                                </Grid>
                            )}
                            {searchType === "team" && (
                                <Grid item>
                                    <TeamSelect
                                        value={team}
                                        onChange={ev => {
                                            setTeam(ev.target.value);
                                            setMatch("none");
                                        }}
                                        data={teams}
                                    />
                                </Grid>
                            )}
                            {searchType === "match" && (
                                <React.Fragment>
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
                                            allTeams={allTeams}
                                        />
                                    </Grid>
                                </React.Fragment>
                            )}
                        </Grid>
                    </Grid>
                </Grid>

                <Box display="flex" justifyContent="center" marginTop="30px">
                    <Heatmap
                        data={data}
                        loading={loading}
                        allTeams={allTeams}
                        allPlayers={allPlayers}
                    />
                    <DataInfo data={data} />
                </Box>
            </div>
        </div>
    );
}

export { App };
