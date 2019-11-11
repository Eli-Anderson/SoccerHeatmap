import React, { useRef, useEffect } from "react";
import h337 from "heatmap.js";
import { LinearProgress, Fade } from "@material-ui/core";

export const Heatmap = props => {
    const containerRef = useRef();

    // data stores the filtered data: the data we want to visualize
    // we must change our visualization whenever data changes

    // we must use our own equality check on data, since React does not
    // handle array equality deeply (only checks references)

    // so we may need to import a library for this, or just come up with our own
    // function

    const heatmapRef = useRef(null);

    useEffect(() => {
        heatmapRef.current = h337.create({
            container: containerRef.current
        });
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const heatmap = heatmapRef.current;
        if (props.data && props.data.length && container && heatmap) {
            const scale = {
                x: container.clientWidth / 45,
                y: container.clientHeight / 69
            };
            console.log(
                props.data.map(point => ({
                    x: Math.round(point.x * scale.x),
                    y: Math.round(point.y * scale.y),
                    value: point.value
                }))
            );
            heatmap.setData({
                max: 2,
                data: props.data.map(point => ({
                    x: point.x * scale.x,
                    y: point.y * scale.y,
                    value: point.value
                }))
            });
        } else {
            heatmap.setData({
                max: 100,
                data: []
            });
        }
    }, [props.data]);

    return (
        <div>
            <Fade in={props.loading}>
                <LinearProgress style={{ height: 6 }} variant="query" />
            </Fade>
            <div ref={containerRef}>
                <img src="field.svg" alt="" />
            </div>
        </div>
    );
};
