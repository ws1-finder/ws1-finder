import React from 'react';
import List from '@mui/material/List';
import Result from './result';

const Results = ({ results }) => {
    return <List>
        {results.map((result) => (
            <Result result={result} key={result.key} />
        ))}
    </List>
}

export default Results
