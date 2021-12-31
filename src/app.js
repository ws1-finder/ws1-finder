import React from 'react';
import Entitlements from './entitlements';
import Options from './options';

const App = () => {
    return <div>
        <div className="title">
            <a id="ws1-url" href="https://www.vmware.com/products/workspace-one.html">Workspace One Finder</a>
        </div>

        <Entitlements />
        <Options />
    </div>
}
export default App
