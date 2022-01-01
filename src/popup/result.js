import React from 'react';
import { launchURL } from './services/url';

const Result = ({ icon, target, name, isFavorite }) => {
    return <tr className="item">
        <td><img width="40" src={icon} /></td>
        <td><a href={target} onClick={launchURL}>{name}</a></td>
        <td className="favorite">
            {isFavorite &&
                <img src="/css/favorite.png" width="20" height="20" />
            }
        </td>
    </tr>
}

export default Result
