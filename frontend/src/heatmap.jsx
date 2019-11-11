import React, { useContext, useRef, useEffect } from "react";
import { AppContext } from "./App";
import h337 from "heatmap.js";
import { LinearProgress, Fade } from "@material-ui/core";

export const Heatmap = props => {
    const { data } = useContext(AppContext);

    const containerRef = useRef();

    // data stores the filtered data: the data we want to visualize
    // we must change our visualization whenever data changes

    // we must use our own equality check on data, since React does not
    // handle array equality deeply (only checks references)

    // so we may need to import a library for this, or just come up with our own
    // function

    const heatmap = useRef();

    useEffect(() => {
        heatmap.current = h337.create({
            container: containerRef.current
        });
    }, []);

    useEffect(() => {
        if (data && data.length) {
            const scale = {
                x: containerRef.current.clientWidth / 45,
                y: containerRef.current.clientHeight / 69
            };
            console.log(
                data.map(point => ({
                    x: Math.round(point.x * scale.x),
                    y: Math.round(point.y * scale.y),
                    value: point.value
                }))
            );
            heatmap.current.setData({
                max: 2,
                data: data.map(point => ({
                    x: point.x * scale.x,
                    y: point.y * scale.y,
                    value: point.value
                }))
            });
        } else {
            heatmap.current.setData({
                max: 100,
                data: []
            });
        }
    }, [data]);

    return (
        <div>
            <Fade in={false}>
                <LinearProgress style={{ height: 6 }} variant="query" />
            </Fade>
            <div ref={containerRef}>
                <img src="field.svg" alt="" />
            </div>
        </div>
    );
};
