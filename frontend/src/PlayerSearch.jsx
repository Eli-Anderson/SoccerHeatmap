import React, { useState, useCallback, useEffect, useRef } from "react";
import { FormControl, Input, InputLabel, Popover, MenuItem } from "@material-ui/core";
import _ from "lodash";

const attemptFetch = _.debounce(value => 
    fetch("http://localhost:3001/lists/players/" + value);
, 500);
export const PlayerSearch = props => {
    const [value, setValue] = useState("");
    const [data, setData] = useState([]);

    const inputRef = useRef(null);

    useEffect(() => {
        if (value) {
            attemptFetch(value).then(r => r.json()).then(setData)
        }
    }, [value]);

    return (
        <FormControl>
            <InputLabel htmlFor="player">Player</InputLabel>
            <Input
                ref={inputRef}
                value={value}
                onChange={ev => {
                    setValue(ev.target.value);
                }}
            />
            <Popover
                open={data.length>0}
                anchorEl={inputRef}
            >
                {data.map((x,i) => <MenuItem key={i}>{x}</MenuItem>)}
            </Popover>
        </FormControl>
    );
};
