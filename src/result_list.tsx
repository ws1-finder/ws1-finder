import List from "@mui/material/List";
import React from "react";

const ResultList = ( { children }: { children: React.ReactNode } ) => {
    return <List id="results" role="list"
        sx={ {
            maxHeight: "300px",
            overflow: "auto",
            position: "relative",
            width: "100%"
        } }
    >
        
        { children }
    </List>;
};

export default ResultList;
