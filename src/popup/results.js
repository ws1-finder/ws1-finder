import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Result from './result';

const Results = ({ results }) => {
    return <List>
        {results.map((result, index) => (
            <React.Fragment key={result.key}>
                <Result result={result} />
                {(index < results.length - 1) ?  <Divider variant="inset" component="li" /> : null}
            </React.Fragment>
        ))}
    </List>
}

export default Results