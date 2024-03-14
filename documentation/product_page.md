# CSS styles documentation for product.tsx

### Following are the classes for products
```css
.product-price-on-sale{
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  grid-gap: 0.5rem;    
}

.product-price-on-sale s {
  opacity: 0.5;
}

/* Product info aligns the text description according to the size of device  */
.product-info{
    /*  Desktop */
    text-align:left;
    /*  tablet */
    text-align:left;
    /*  mobile */
    text-align:center;
}

.product-main {
  align-self: start;
  position: sticky;
  top: 6rem;
}


.product {
  display: grid;
  @media (min-width: 45em) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 4rem;
  }
}

```