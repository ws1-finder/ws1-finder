import React, { useEffect, useState } from 'react';
import { launchURL, getBaseURL } from './services/url';

const WorkspaceOneHeader = () => {
    const [baseURL, setBaseURL] = useState("https://www.vmware.com/products/workspace-one.html");

    useEffect(() => {
        let mounted = true;
        getBaseURL()
            .then(url => {
                if (mounted) {
                    setBaseURL(url)
                }
            })
        return () => mounted = false;
    }, [])

    return < div className="title" >
        <a id="ws1-url" href={baseURL} onClick={launchURL}>Workspace One Finder</a>
    </div >
}

export default WorkspaceOneHeader