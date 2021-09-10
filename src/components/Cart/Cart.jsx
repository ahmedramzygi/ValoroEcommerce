import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import CardItem from './CardItem/CardItem';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
  const classes = useStyles();
//Sub component 
  const renderEmptyCart = () => (
    <Typography variant="h6"color="textPrimary"align="center">There is no products in your shopping cart    
      <Link className={classes.link} to="/products" > Now add your products !</Link>
    </Typography>
  );
//If we didnt fetch items yet
  if (!cart.line_items) return 'Loading';

  const renderCart = () => (
    <>
    {/* First cart part */}
      <Grid container spacing={3}>
        {cart.line_items.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CardItem item={lineItem} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} />
          </Grid>
        ))}
      </Grid>
          {/* Second cart part */}

      <div className={classes.cardDetails}>
        <Typography variant="h4">Total Price: {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button className={classes.emptyButton} size="medium" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
          <Button className={classes.checkoutButton} component={Link}  to="/checkout" size="medium" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h4" gutterBottom>Your Cart</Typography>
      { !cart.line_items.length ? renderEmptyCart() : renderCart() }
    </Container>
  );
};

export default Cart;