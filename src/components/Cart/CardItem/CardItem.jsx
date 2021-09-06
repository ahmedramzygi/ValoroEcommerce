import React from "react";
import {CardActions, Card, CardContent, CardMedia, Button, Typography, CardActionArea, } from "@material-ui/core"
import useStyles from './styles';


const CardItem = ({item, handleUpdateCartQty, handleRemoveFromCart})=>{
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
                        <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                        <Typography>{item.quantity}</Typography>
                        <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                    </div>
                    <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
                </CardActions>

        </div>
    )
}

export default CardItem;
