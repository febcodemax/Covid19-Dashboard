//import liraries
import React from 'react';
import styles from './CardComponent.module.css';
import { Card, CardContent, Typography } from '@material-ui/core';

// create a component
const cardComponent = (props) => {

    const cardJSX = props.data.map((result, i) => {
        return (
            <Card className={styles.Card} variant="outlined" key={i}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h1">
                        {result.label}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {result.value}
                    </Typography>
                </CardContent>
            </Card>
        )
    });

    return (
        <div className={styles.Root}>
            {cardJSX}
        </div>
    );
}

//make this component available to the app
export default cardComponent;
