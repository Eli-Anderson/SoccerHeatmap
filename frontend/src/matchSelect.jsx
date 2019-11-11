import React from "react";
import { makeStyles, InputLabel, FormControl } from "@material-ui/core";

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
    const classes = useStyles(props);

    return (
        <div>
            <FormControl>
                {/* if a team is selected, show 'Match', otherwise show 'Select a team' */}
                <InputLabel htmlFor="matchSelect">
                    {props.team ? "Match" : "Select a team"}
                </InputLabel>
                <select
                    id="matchSelect"
                    disabled={!props.team}
                    className={classes.select}
                    value={props.value}
                    onChange={props.onChange}
                >
                    <option className={classes.firstItem} key="all" value="">
                        All
                    </option>
                    {props.data.map(x => (
                        <option key={x} value={x}>
                            {x}
                        </option>
                    ))}
                </select>
            </FormControl>
        </div>
    );
};
