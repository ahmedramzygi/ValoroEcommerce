import React from 'react'
//Import needed features from material UI for text buttons ,,etc
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
//Import the shopping cart badge 
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/logo.png';
import useStyles from './styles';

const Navbar = () => {
    const classes=useStyles()
    return (
        <div>
            <AppBar position="fixed"className={classes.appBar} color="inherit">
                <Toolbar>
                    {/* Here is the code of left side of navbar which contains logo and name */}
                    <Typography  variant="h6" className={classes.title} color="inherit">
                         <img src={logo} alt="commerce.js" height="45px" className={classes.image} /> E-Mobiles Shop
                    </Typography>
                    {/* Here is the mid of navbar of empty space */}
                    <div className={classes.grow}/>
                    <div className={classes.button}>
                    <IconButton aria-label="Show cart items" color="inherit">
                        <Badge badgeContent={2} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    )
   
}

export default Navbar
