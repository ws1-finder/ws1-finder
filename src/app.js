import React, { useEffect, useState } from 'react';
import Entitlements from './entitlements';

const App = ({ entitlementLoader }) => {
    const [entitlements, setEntitlements] = useState([]);

    useEffect(() => {
        let mounted = true;

        entitlementLoader((entitlements) => {
            if(mounted) {
              setEntitlements(entitlements)
            }
        })
        return () => mounted = false;
      }, [])

    return <div>
        <div className="title">
            <a id="ws1-url" href="https://www.vmware.com/products/workspace-one.html">Workspace One Finder</a>
        </div>
        <form autoComplete="off">
            <input type="text" id="appSearch" placeholder="Search for apps.."></input>
        </form>

        <Entitlements entitlements = {entitlements} />,
    </div>
}
export default App
