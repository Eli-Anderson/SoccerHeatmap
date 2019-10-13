import React from "react";
import "./App.css";
import { TeamSelect } from "./teamSelect";
import { Grid, makeStyles } from "@material-ui/core";
import { EventSelect } from "./eventSelect";
import { PlayerSelect } from "./playerSelect";
import { useState } from "react";

// create our context. The object inside is not necessary, but may help with knowing what
// fields we are keeping track of.
// this will help us manage the state of the app easier than passing props around between components.
const AppContext = React.createContext({
    event: null,
    setEvent: null,
    team: null,
    setTeam: null,
    player: null,
    setPlayer: null
});

// define our styles here. this transforms css styles to a class so it is easier to apply
const useStyles = makeStyles({
    app: {
        margin: 20
    }
});

function App(props) {
    const classes = useStyles(props);
    const [event, setEvent] = useState("");
    const [team, setTeam] = useState("");
    const [player, setPlayer] = useState("");
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
                    setPlayer
                }}
            >
                <h3>Soccer Analyzer</h3>
                {/* Grid helps us manage the layout of elements */}
                <Grid
                    id="filterToolbar"
                    container
                    direction="col"
                    justify="space-between"
                >
                    <EventSelect />
                    <Grid item xs={4}>
                        <Grid
                            container
                            spacing={5}
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-end"
                        >
                            <Grid item xs={4}>
                                <TeamSelect />
                            </Grid>
                            <Grid item xs={4}>
                                <PlayerSelect />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs = {12}>
                        <img src="field.jpg" />
                    </Grid>
                </Grid>
            </AppContext.Provider>
        </div>
    );
}

export { App, AppContext };
