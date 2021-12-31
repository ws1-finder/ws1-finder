import React from 'react';
import { launchURL } from './services/url';

const Entitlement = ({ entitlement }) => {
    return <tr className="item">
        <td><img width="40" src={entitlement._links.icon.href} /></td>
        <td><a href={entitlement._links.launch.href}>{entitlement.name}</a></td>
        <td className="favorite">
            {entitlement.favorite &&
                <img src="/css/favorite.png" width="20" height="20" />
            }
        </td>
    </tr>
}

export default Entitlement
