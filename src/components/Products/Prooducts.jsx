import React from 'react';
import Product from './Product/Product'
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';


const Products = ({ products, addCart}) => {
  const classes = useStyles();

  if (!products.length) return <p>Loading...</p>;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} addCart = {addCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};
export default Products;