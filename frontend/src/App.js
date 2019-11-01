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
    data: null
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

function getData({ event, team, player }) {
    return new Promise(resolve => {
        setTimeout(() => {
            if (!player) {
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
            }
            resolve();
        }, Math.random() * 3000);
    });
}

function App(props) {
    const classes = useStyles(props);
    const [event, setEvent] = useState("");
    const [team, setTeam] = useState("");
    const [player, setPlayer] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        if (event && team) {
            getData({ event, team, player }).then(d => setData(d));
        }
    }, [event, team, player]);

    return (
        <div className={"App " + classes.app}>
            {/* Include the roboto font for MaterialUI */}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <AppContext.Provider
                // pass our state and mutators on to whichever children need them
                value={{
                    event,
                    setEvent,
                    team,
                    setTeam,
                    player,
                    setPlayer,
                    data
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
