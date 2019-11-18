import React, { useState, useEffect, useRef } from "react";
import {
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    MenuList,
    Fade
} from "@material-ui/core";
import _ from "lodash";

import { isFocused, useFocus } from "web-api-hooks";

export const PlayerSearch = props => {
    const [value, setValue] = useState("");
    const [data, setData] = useState([]);

    const [isFocused, bindFocus] = useFocus();

    const inputRef = useRef(null);

    const attemptSearch = useRef(
        _.throttle(
            search => {
                fetch("http://localhost:3001/search/players/" + search)
                    .then(r => r.json())
                    .then(d => setData(d.map(([x]) => x)));
            },
            500,
            { trailing: true, leading: false }
        )
    );

    useEffect(() => {
        if (value && attemptSearch.current) {
            attemptSearch.current(value);
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
                {...bindFocus}
            />
            <Fade in={data.length > 0 && isFocused}>
                <MenuList
                    style={{
                        position: "absolute",
                        zIndex: 9999,
                        backgroundColor: "white",
                        top: 60,
                        maxHeight: 500,
                        overflow: "scroll",
                        boxShadow: "0px 0px 20px 2px"
                    }}
                >
                    {data.map((x, i) => (
                        <MenuItem
                            key={i}
                            onClick={() => {
                                props.onChange(x);
                                setValue(x);
                            }}
                        >
                            {x}
                        </MenuItem>
                    ))}
                </MenuList>
            </Fade>
        </FormControl>
    );
};
