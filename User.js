import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { products } from './data';

const UserScreen = () => {
  const [cart, setCart] = useState([]);
  const [productsPerRow, setProductsPerRow] = useState(1);

  useEffect(() => {
    // Determine the number of products to display per row based on screen width
    const screenWidth = Dimensions.get('window').width;
    if (screenWidth >= 1024) {
      setProductsPerRow(3);
    } else if (screenWidth >= 768) {
      setProductsPerRow(2);
    } else {
      setProductsPerRow(1);
    }
  }, []);

  const addToCart = (product) => {
    if (product.quantity > 0) {
      product.quantity -= 1;
      const updatedCart = [...cart, product];
      setCart(updatedCart);
    } else {
      Alert.alert('Low Quantity', 'This product is low in quantity');
    }
  };

  const removeFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  const buyProducts = () => {
    if (cart.length === 0) {
      Alert.alert('Empty Cart', 'Please add products to your cart before buying.');
      return;
    }

    // Implement your logic for processing the purchase here

    // Reset the cart
    setCart([]);
    Alert.alert('Purchase Successful', 'Thank you for your purchase!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Screen</Text>
      <ScrollView>
        {products.map((product, index) => (
            <View
                key={product.id}
                style={[
                    styles.product,
                    { flexBasis: `${100 / productsPerRow}%` },
                    index % productsPerRow === productsPerRow - 1 ? styles.productRightMargin : null,
                ]}
            >
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>Description: {product.description}</Text>
                <Text style={styles.productPrice}>Price: ${product.price}</Text>
                <Text style={styles.productQuantity}>Quantity: {product.quantity}</Text>
                <Button title="Add to Cart" onPress={() => addToCart(product)} />
            </View>
        ))}
      </ScrollView>
      <View style={styles.cart}>
        <Text style={styles.cartHeader}>Cart</Text>
        {cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.cartItemName}>{item.name}</Text>
            <Button title="Remove" onPress={() => removeFromCart(item)} />
          </View>
        ))}
        <Button title="Buy" onPress={buyProducts} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  product: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productQuantity: {
    fontSize: 16,
  },
  cart: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  cartHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cartItemName: {
    fontSize: 16,
  },
  productRightMargin: {
    marginRight: 10,
  },
});

export default UserScreen;