import React from "react";
import { Box, Typography } from "@material-ui/core";

export const DataInfo = ({ data }) => {
    return (
        <Box display="flex" alignItems="center">
            <Box margin="16px">
                <Box>
                    <Typography component="span">Count: </Typography>
                    <Typography component="span">{data.length}</Typography>
                </Box>
            </Box>
        </Box>
    );
};
