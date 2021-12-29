import React from 'react';

const Entitlements = ({ entitlements }) => {
    return <div>
        <table id="results">
            <tbody>
                {entitlements.map(entitlement => (
                    <tr class="item">
                        <td><img width="40" src={entitlement._links.icon.href} /></td>
                        <td><a href={entitlement._links.launch.href}>{entitlement.name}</a></td>
                        <td class="favorite">
                            {entitlement.favorite &&
                                <img src="/css/favorite.png" width="20" height="20" />
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div >
}

export default Entitlements
