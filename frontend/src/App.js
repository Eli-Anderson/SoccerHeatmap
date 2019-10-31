import React, { useEffect } from "react";
import "./App.css";
import { TeamSelect } from "./teamSelect";
import { Grid, makeStyles } from "@material-ui/core";
import { EventSelect } from "./eventSelect";
import { PlayerSelect } from "./playerSelect";
import { useState } from "react";
import { Heatmap } from "./heatmap";

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

/**
 * This is a dummy function for getting the Event data based on the provided filter parameters.
 * The data is asynchronously returned and depends on the event type, team, and player selected.
 */
function getData({ event, team, player }) {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!player) {
                // currently only returns data when USA is selected
                resolve(
                    {
                        USA: [
                            {
                                eventType: "goal",
                                player1: "Christiano Ronaldo",
                                player2: "Eden Hazard",
                                match: 28192831,
                                date: "2017-06-13",
                                time: "37:42",
                                location: 15
                            },
                            {
                                eventType: "penalty",
                                player1: "Zlatan Ibrahimovic",
                                player2: "Robin van Persie",
                                match: 29281923,
                                date: "2017-07-18",
                                time: "17:12",
                                location: 16
                            }
                        ]
                    }[team]
                );
            } else {
                // currently only returns data when USA's players are selected
                resolve(
                    {
                        "Andrea Pirlo": [
                            {
                                eventType: "penalty",
                                player1: "Andrea Pirlo",
                                player2: "Robin van Persie",
                                match: 29281933,
                                date: "2017-08-11",
                                time: "15:15",
                                location: 13
                            },
                            {
                                eventType: "goal",
                                player1: "Andrea Pirlo",
                                player2: null,
                                match: 29281933,
                                date: "2017-08-11",
                                time: "21:56",
                                location: 4
                            }
                        ],
                        "Robin van Persie": [
                            {
                                eventType: "penalty",
                                player1: "Robin van Persie",
                                player2: "Andrea Pirlo",
                                match: 29281933,
                                date: "2017-08-11",
                                time: "15:15",
                                location: 13
                            },
                            {
                                eventType: "goal",
                                player1: "Robin van Persie",
                                player2: null,
                                match: 29281933,
                                date: "2017-08-11",
                                time: "21:56",
                                location: 4
                            }
                        ],
                        "Yaya Toure": [
                            {
                                eventType: "penalty",
                                player1: "Yaya Toure",
                                player2: "Andrea Pirlo",
                                match: 29281933,
                                date: "2017-08-11",
                                time: "15:15",
                                location: 13
                            },
                            {
                                eventType: "goal",
                                player1: "Yaya Toure",
                                player2: null,
                                match: 29281933,
                                date: "2017-08-11",
                                time: "21:56",
                                location: 4
                            }
                        ]
                    }[player]
                );
            }
            // wait a random time, so we can ensure that loaders are working
        }, Math.random() * 3000);
    });
}

function App(props) {
    const classes = useStyles(props);
    const [event, setEvent] = useState("");
    const [team, setTeam] = useState("");
    const [player, setPlayer] = useState("");
    const [data, setData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        if (team) {
            setDataLoading(true);
            getData({ event, team, player })
                .then(d => setData(d))
                .then(() => setDataLoading(false));
        }
    }, [event, team, player]);

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
                                <EventSelect />
                            </Grid>
                            <Grid item>
                                <TeamSelect />
                            </Grid>
                            <Grid item>
                                <PlayerSelect />
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
            </AppContext.Provider>
        </div>
    );
}

export { App, AppContext };
