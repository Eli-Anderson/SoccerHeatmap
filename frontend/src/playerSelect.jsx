import React, { useState, useEffect, useContext } from "react";
import {
    Select,
    MenuItem,
    makeStyles,
    InputLabel,
    FormControl
} from "@material-ui/core";
import { AppContext } from "./App";

const dummyFetch = team => {
    const teamPlayers = {
        England: ["Christiano Ronaldo", "Eden Hazard", "Mohamed Salah"],
        France: ["Andres Iniesta", "Zlatan Ibrahimovic", "Radamel Falcao"],
        USA: ["Andrea Pirlo", "Robin van Persie", "Yaya Toure"],
        Spain: ["Edinson Cavani", "Sergio Aguero", "Iker Casillas"]
    };
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(teamPlayers[team]);
        }, Math.random() * 3000);
    });
};

// define our styles here. this transforms css styles to a class so it is easier to apply
const useStyles = makeStyles({
    select: {
        width: 120
    },
    firstItem: {
        color: "gray"
    }
});

export const PlayerSelect = props => {
    const { team, player, setPlayer } = useContext(AppContext);
    const classes = useStyles(props);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // this will run only on the initial render
    useEffect(() => {
        if (team) {
            // fetch data here
            setLoading(true);
            dummyFetch(team)
                .then(setData)
                .then(() => setLoading(false));
        }
    }, [team]);

    return (
        <div>
            <FormControl>
                {/* if a team is selected, show 'Player', otherwise show 'Select a team' */}
                <InputLabel htmlFor="playerSelect">
                    {team ? "Player" : "Select a team"}
                </InputLabel>
                <Select
                    id="playerSelect"
                    disabled={!team}
                    className={classes.select}
                    value={player}
                    onChange={ev => setPlayer(ev.target.value)}
                >
                    <MenuItem className={classes.firstItem} key="all" value="">
                        All
                    </MenuItem>
                    {/* if loading, show an item to display this */}
                    {loading ? (
                        <MenuItem disabled key="loading">
                            Loading...
                        </MenuItem>
                    ) : (
                        // otherwise just display the player names
                        data.map(x => (
                            <MenuItem key={x} value={x}>
                                {x}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
        </div>
    );
};
