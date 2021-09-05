import React from "react";
import {CardActions, Card, CardContent, CardMedia, Button, Typography, CardActionArea, } from "@material-ui/core"
import useStyles from './styles';


const CardItem = ({item})=>{
    const classes = useStyles();
    return(
        <div>
                <CardMedia image = {item.media.source} alt={item.name} className={classes.media}/>
                <CardContent className= {classes.cardContent} >
                    <Typography><h4>{item.name}</h4></Typography>
                    <Typography><h5>{item.name}</h5></Typography>
                </CardContent>
                <CardActions className={classes.CardActions} >
                    <div className={classes.buttons}>
                        <Button type="button" size="small">-</Button>
                        <Typography>{item.quantity}</Typography>
                        <Button type="button" size="small">+</Button>
                    </div>
                    <Button variant="contained" type="button" color="secondary">Remove</Button>
                </CardActions>

        </div>
    )
}

export default CardItem;
