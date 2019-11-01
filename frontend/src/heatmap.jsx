import React, { useContext, useRef, useEffect } from "react";
import { AppContext } from "./App";
import h337 from "heatmap.js";
import { LinearProgress, Fade } from "@material-ui/core";

export const Heatmap = props => {
    const { data, dataLoading } = useContext(AppContext);

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
            // test heatmap with random data
            let randomData = [];
            const n = 25 + Math.random() * 50;
            for (let i = 0; i < n; i++) {
                randomData.push({
                    x: Math.round(
                        Math.random() * containerRef.current.offsetWidth
                    ),
                    y: Math.round(
                        Math.random() * containerRef.current.offsetHeight
                    ),
                    value: Math.round(Math.random() * 100)
                });
            }

            /* replace randomData with the real data when the time comes
             * the data is expected to be in the form:
             * [
             *   { x: int, y: int, value: int },
             *   ...
             * ]
             */
            heatmap.current.setData({
                max: 100,
                data: randomData
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
            <Fade in={dataLoading}>
                <LinearProgress style={{ height: 6 }} variant="query" />
            </Fade>
            <div ref={containerRef}>
                <img src="field.svg" />
            </div>
        </div>
    );
};
