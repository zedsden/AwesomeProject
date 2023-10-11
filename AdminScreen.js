// AdminScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, StyleSheet, Dimensions } from 'react-native';
import { products } from './data';

const AdminScreen = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addProduct = () => {
    if (!productName || !productDescription || !productPrice) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const existingProduct = products.find((product) => product.name === productName);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const newProduct = {
        id: products.length + 1,
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
        quantity: 1,
      };
      products.push(newProduct);
    }

    setProductName('');
    setProductDescription('');
    setProductPrice('');

    Alert.alert('Success', 'Product added successfully');
  };

  const editProduct = () => {
    if (!selectedProduct) {
      Alert.alert('Error', 'Please select a product to edit');
      return;
    }

    const updatedProduct = products.find((product) => product.id === selectedProduct.id);
    updatedProduct.name = productName;
    updatedProduct.description = productDescription;
    updatedProduct.price = parseFloat(productPrice);

    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setSelectedProduct(null);

    Alert.alert('Success', 'Product edited successfully');
  };

  const deleteProduct = () => {
    if (!selectedProduct) {
      Alert.alert('Error', 'Please select a product to delete');
      return;
    }

    const index = products.findIndex((product) => product.id === selectedProduct.id);
    products.splice(index, 1);

    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setSelectedProduct(null);

    Alert.alert('Success', 'Product deleted successfully');
  };

  // Determine the number of products to display per row based on screen width
const screenWidth = Dimensions.get('window').width;
let productsPerRow = 1;

if (screenWidth >= 768 && screenWidth < 1024) {
  productsPerRow = 3;
} else if (screenWidth >= 1024) {
  productsPerRow = 4;
}

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Admin Screen</Text>
      <View style={styles.productForm}>
        <Text>Add/Edit Product</Text>
        <TextInput
          style={[styles.input, styles.boldText, productName && styles.boldTextActive]}
          placeholder="Name"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={productDescription}
          onChangeText={setProductDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={productPrice}
          onChangeText={setProductPrice}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add Product" onPress={addProduct} />
          <Button title="Edit Product" onPress={editProduct} />
          <Button title="Delete Product" onPress={deleteProduct} />
        </View>
      </View>
      <View style={styles.productList}>
        <Text>Product List</Text>
        <View style={styles.productsGrid}>
          {products.map((product, index) => (
            <View
              key={product.id}
              style={[
                styles.productItem,
                selectedProduct?.id === product.id && styles.selectedItem,
                (index + 1) % productsPerRow !== 0 && styles.productItemRightMargin,
              ]}
            >
              <Text
                style={[styles.boldText, selectedProduct?.id === product.id && styles.boldTextActive]}
              >
                Name: {product.name}
              </Text>
              <Text>Description: {product.description}</Text>
              <Text>Price: ${product.price}</Text>
              <Text>Quantity: {product.quantity}</Text>
              <Button title="Select" onPress={() => setSelectedProduct(product)} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
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
  productForm: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productList: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productItem: {
    flexBasis: '33.33%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  productItemRightMargin: {
    marginRight: 10,
  },
  selectedItem: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
    color: 'white',
  },
  boldText: {
    fontWeight: 'bold',
  },
  boldTextActive: {
    color: 'red',
  },
});

export default AdminScreen;