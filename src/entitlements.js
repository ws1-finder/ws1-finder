import React from 'react';
import Entitlement from './entitlement';

const Entitlements = ({ entitlements }) => {
    return <div>
        <table id="results">
            <tbody>
                {entitlements.map(entitlement => <Entitlement entitlement={entitlement} key={entitlement.id} />)}
            </tbody>
        </table>
    </div >
}

export default Entitlements
