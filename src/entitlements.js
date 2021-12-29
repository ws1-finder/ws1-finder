import React, { useEffect, useState } from 'react';
import Entitlement from './entitlement';
import { getEntitlements } from './services/entitlements';

const Entitlements = () => {
    const [entitlements, setEntitlements] = useState([]);

    useEffect(() => {
        let mounted = true;
        getEntitlements()
            .then(items => {
                if (mounted) {
                    setEntitlements(items)
                }
            })
        return () => mounted = false;
    }, [])

    return <div>
        <table id="results">
            <tbody>
                {entitlements.map(entitlement => <Entitlement entitlement={entitlement} key={entitlement.id} />)}
            </tbody>
        </table>
    </div >
}

export default Entitlements
