import React, { useState, useEffect, useContext } from "react";
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

export const MatchSelect = props => {
    const { team, match, setMatch } = useContext(AppContext);
    const classes = useStyles(props);

    const [loading, setLoading] = useState(false);

    return (
        <div>
            <FormControl>
                {/* if a team is selected, show 'Match', otherwise show 'Select a team' */}
                <InputLabel htmlFor="matchSelect">
                    {team ? "Match" : "Select a team"}
                </InputLabel>
                <Select
                    id="matchSelect"
                    disabled={!team}
                    className={classes.select}
                    value={match}
                    onChange={ev => setMatch(ev.target.value)}
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
                        // otherwise just display the match names
                        props.matches.map(x => (
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
