import React, { useState, useEffect, useContext } from "react";
import {
    Select,
    MenuItem,
    makeStyles,
    FormControl,
    InputLabel
} from "@material-ui/core";
import { AppContext } from "./App";

const dummyFetch = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(["Penalties", "Goals", "Goal Attempts"]);
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

export const EventSelect = props => {
    const classes = useStyles(props);

    const { event, setEvent } = useContext(AppContext);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // this will run only on the initial render
    useEffect(() => {
        // fetch data here
        setLoading(true);
        dummyFetch()
            .then(setData)
            .then(() => setLoading(false));
    }, []);

    return (
        <div>
            <FormControl>
                <InputLabel htmlFor="eventSelect">Event</InputLabel>
                <Select
                    id="eventSelect"
                    className={classes.select}
                    value={event}
                    onChange={ev => setEvent(ev.target.value)}
                >
                    <MenuItem className={classes.firstItem} key="all" value="">
                        All
                    </MenuItem>
                    {loading ? (
                        <MenuItem disabled key="loading">
                            Loading...
                        </MenuItem>
                    ) : (
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
