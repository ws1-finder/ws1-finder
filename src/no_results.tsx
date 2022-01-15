import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import React from "react";

const NoResults = () => {
    return <Box display="flex" flexDirection="column" sx={ { m: "2em" } }>
        <Chip label={ "No Results" } variant="outlined" />
    </Box>;
};

export default NoResults;
