import React from 'react';
import Entitlements from './entitlements';

const App = () => {
    return <div>
        <div className="title">
            <a id="ws1-url" href="https://www.vmware.com/products/workspace-one.html">Workspace One Finder</a>
        </div>
        <form autoComplete="off">
            <input type="text" id="appSearch" placeholder="Search for apps.."></input>
        </form>

        <Entitlements />,
    </div>
}
export default App
