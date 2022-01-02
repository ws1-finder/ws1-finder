import React from 'react';
import { launchURL } from './services/url';
// icon, target, name, isFavorite
const Result = ({ result }) => {
    return <tr className="item">
        <td><img width="40" src={result.icon} /></td>
        <td><a href={result.target} onClick={launchURL}>{result.name}</a></td>
        <td className="favorite">
            {result.isFavorite &&
                <img src="/css/favorite.png" width="20" height="20" />
            }
        </td>
    </tr>
}

export default Result
