import React, { useState, useEffect, useContext } from "react";
import {
    Select,
    MenuItem,
    makeStyles,
    FormControl,
    InputLabel
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

export const TeamSelect = props => {
    const classes = useStyles(props);

    const { team, setTeam } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // this will run only on the initial render
    useEffect(() => {
        // fetch data here
        // setLoading(true);
        // fetch("http://localhost:3001/lists/allTeams")
        //     .then(data => data.json())
        //     .then(setData)
        //     .then(() => setLoading(false));
    }, []);

    // if we are currently fetching data, return some kind of loading element
    return (
        <div>
            <FormControl>
                <InputLabel htmlFor="teamSelect">Team</InputLabel>
                <Select
                    id="teamSelect"
                    className={classes.select}
                    value={team}
                    onChange={ev => setTeam(ev.target.value)}
                >
                    <MenuItem className={classes.firstItem} key="all" value="">
                        All
                    </MenuItem>
                    {loading ? (
                        <MenuItem disabled key="loading...">
                            Loading...
                        </MenuItem>
                    ) : (
                        props.teams.map(x => (
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
