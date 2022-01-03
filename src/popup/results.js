import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Result from './result';

const Results = ({ results }) => {
    return <List>
        {results.map((result, index) => (
            <div key={result.key}>
                <Result result={result} />
                {(index < results.length - 1) ? <Divider /> : null}
            </div>
        ))}
    </List>
}

export default Results
