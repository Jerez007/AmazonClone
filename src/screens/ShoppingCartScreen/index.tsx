import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import CartProductItem from '../../components/CartProductItem';
import {DataStore, Auth} from 'aws-amplify';
import {Product, CartProduct} from '../../models';
import cart from '../../data/cart';

// import products from '../../data/cart';

const ShoppingCartScreen = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchCartProducts = async () => {
      //TODO euqry only my cart items
      DataStore.query(CartProduct).then(setCartProducts);
    };
    fetchCartProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      // query all products that are used in the cart
      const products = await Promise.all(
        cartProducts.map(cartProduct =>
          DataStore.query(Product, cartProduct.productID),
        ),
      );

      // assign the products to the cart items
      setCartProducts()
    };

    fetchProducts();
  }, [cartProducts]);

  const totalPrice = 0;

  // const totalPrice = cartProducts.reduce(
  //   (summedPrice, product) =>
  //     summedPrice + product.item.price * product.quantity,
  //   0,
  // );

  const onCheckout = () => {
    navigation.navigate('Address');
  };

  return (
    <View style={styles.page}>
      <View>
        <Text style={{fontSize: 18}}>
          Subtotal ({cartProducts.length} items):
          <Text style={{color: '#e47911', fontWeight: 'bold'}}>
            ${totalPrice.toFixed(2)}
          </Text>
        </Text>
        <Button
          text="Proceed to checkout"
          onPress={onCheckout}
          containerStyles={{backgroundColor: '#f1dc1c', borderColor: '#c7b782'}}
        />
      </View>

      <FlatList
        data={cartProducts}
        renderItem={({item}) => <CartProductItem cartItem={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});

export default ShoppingCartScreen;
