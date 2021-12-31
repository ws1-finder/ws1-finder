import React from 'react';
import Entitlements from './entitlements';
import Options from './options';
import WorkspaceOneHeader from './workspace_one_header';

const App = () => {
    return <div>
        <WorkspaceOneHeader />
        <Entitlements />
        <Options />
    </div>
}
export default App
