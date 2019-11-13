import React, { useRef, useEffect } from "react";
import h337 from "heatmap.js";
import { LinearProgress, Fade, Typography } from "@material-ui/core";

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
                x: container.clientWidth / 69,
                y: container.clientHeight / 45
            };
            const formattedData = props.data.map(point => ({
                x: Math.floor(point.x * scale.x),
                y: Math.floor(point.y * scale.y),
                value: point.value
            }));
            console.log(formattedData);
            heatmap.setData({
                max: 2,
                data: formattedData
            });
        } else {
            heatmap.setData({
                max: 1,
                data: []
            });
        }
    }, [props.data]);

    return (
        <div>
            {!props.data.length && !props.loading && (
                <Typography>No Data Found</Typography>
            )}
            <Fade in={props.loading}>
                <LinearProgress style={{ height: 6 }} variant="query" />
            </Fade>
            <div ref={containerRef}>
                <img src="field.svg" alt="" />
            </div>
        </div>
    );
};
