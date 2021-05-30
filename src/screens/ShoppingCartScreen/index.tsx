import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicatorBase,
  ActivityIndicator,
} from 'react-native';
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
      //TODO query only my cart items
      DataStore.query(CartProduct).then(setCartProducts);
    };
    fetchCartProducts();
  }, []);

  useEffect(() => {
    if (cartProducts.filter(cp => !cp.product).length === 0) {
      return;
    }

    const fetchProducts = async () => {
      // query all products that are used in cart
      const products = await Promise.all(
        cartProducts.map(cartProduct =>
          DataStore.query(Product, cartProduct.productID),
        ),
      );

      // assign the products to the cart items
      setCartProducts(currentCartProducts =>
        currentCartProducts.map(cartProduct => ({
          ...cartProduct,
          product: products.find(p => p.id === cartProduct.productID),
        })),
      );
    };
    fetchProducts();
  }, [cartProducts]);

  const onCheckout = () => {
    navigation.navigate('Address');
  };

  if (cartProducts.filter(cp => !cp.product).length !== 0) {
    return <ActivityIndicator />;
  }

  const totalPrice = cartProducts.reduce(
    (summedPrice, product) =>
      summedPrice + (product?.product?.price || 0) * product.quantity,
    0,
  );

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
