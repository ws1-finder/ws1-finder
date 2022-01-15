import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import Options from "./options";
import { getBaseURL, launchURL } from "./services/url";

const WorkspaceOneHeader = () => {
    const [baseURL, setBaseURL] = useState("https://www.vmware.com/products/workspace-one.html");

    useEffect(() => {
        let mounted = true;
        getBaseURL()
            .then((url: string) => {
                if (mounted) {
                    setBaseURL(url);
                }
            });

        return () => { 
            mounted = true;
        };
    }, []);

    return (
        <Box sx={ { flexGrow: 1 } }>
            <AppBar position="static">
                <Toolbar>
                    <Options />
                    <Typography variant="h6" component="div" sx={ { flexGrow: 1 } }>
                        <Link underline="none" color="inherit" href={ baseURL } onClick={ launchURL }>
                            Workspace One Finder
                        </Link>
                    </Typography>
                    <Avatar alt="Workspace One Finder" src="/ws1-finder.svg" />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default WorkspaceOneHeader;
