import React from 'react'
//Import needed features from material UI for text buttons ,,etc
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
//Import the shopping cart badge 
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/logo.png';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({totalItems}) => {
    const classes=useStyles()
    const location = useLocation();
    return (
        <div>
            <AppBar position="fixed"className={classes.appBar} color="inherit">
                <Toolbar>
                    {/* Here is the code of left side of navbar which contains logo and name */}
                    <Typography component={Link} to = "/"  variant="h6" className={classes.title} color="inherit">
                         <img src={logo} alt="commerce.js" height="45px" className={classes.image} /> E-Mobiles Shop
                    </Typography>
                    {/* Here is the mid of navbar of empty space */}
                    <div className={classes.grow}/>
                   {/* To show the cart logo with number of products just in cart page */}
                   {location.pathname === "/" && (
                    <div className={classes.button}>
                    <IconButton aria-label="Show cart items" color="inherit" component={Link} to = "/cart">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    </div>)}

                </Toolbar>
            </AppBar>
        </div>
    )
   
}

export default Navbar
