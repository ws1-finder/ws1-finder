import FlagIcon from "@mui/icons-material/Flag";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import Options from "./options";
import { baseURL, prereleaseMarker } from "./services/extension";
import { launchURL } from "./services/url_launcher";

const versionChip = (version: string) => {
    return                     <Chip 
        sx={ { mr: ".25rem" } }
        color="warning" 
        variant="filled" 
        role="note"
        label={ version } 
        icon={ <FlagIcon/> } size="small" 
    />;
};   
const WorkspaceOneHeader = () => {
    const [ws1URL, setWs1URL] = useState("https://www.vmware.com/products/workspace-one.html");

    useEffect(() => {
        let mounted = true;
        baseURL()
            .then((url: string) => {
                if (mounted) {
                    setWs1URL(url);
                }
            });

        return () => { 
            mounted = true;
        };
    }, []);

    return (
        <Box sx={ { flexGrow: 1 } }>
            <AppBar role="heading" position="static">
                <Toolbar>
                    <Options />
                    <Typography variant="h6" component="div" sx={ { flexGrow: 1 } }>
                        <Link underline="none" color="inherit" href={ ws1URL } onClick={ launchURL }>
                            Workspace One Finder
                        </Link>
                    </Typography>

                    { prereleaseMarker.length > 0 && versionChip(prereleaseMarker) }

                    <Avatar alt="Workspace One Finder" src="/ws1-finder.svg" />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default WorkspaceOneHeader;
