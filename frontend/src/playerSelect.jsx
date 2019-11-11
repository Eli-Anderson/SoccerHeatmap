import React, { useContext } from "react";
import {
    Select,
    MenuItem,
    makeStyles,
    InputLabel,
    FormControl
} from "@material-ui/core";
import { AppContext } from "./App";

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

    return (
        <div>
            <FormControl>
                {/* if a team is selected, show 'Player', otherwise show 'Select a team' */}
                <InputLabel htmlFor="playerSelect">Player</InputLabel>
                <Select
                    id="playerSelect"
                    className={classes.select}
                    value={player}
                    onChange={ev => setPlayer(ev.target.value)}
                >
                    <MenuItem className={classes.firstItem} key="all" value="">
                        All
                    </MenuItem>
                    {/* if loading, show an item to display this */}
                    {props.loading ? (
                        <MenuItem disabled key="loading">
                            Loading...
                        </MenuItem>
                    ) : (
                        // otherwise just display the player names
                        props.players.slice(0, 60).map((x, i) => (
                            <MenuItem key={i} value={x}>
                                {x}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
        </div>
    );
};
