import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import Button from '../../components/Button';
import CartProductItem from '../../components/CartProductItem';

import products from '../../data/cart';

const ShoppingCartScreen = () => {
  const totalPrice = products.reduce(
    (summedPrice, product) =>
      summedPrice + product.item.price * product.quantity,
    0,
  );

  return (
    <View style={styles.page}>
      <View>
        <Text style={{fontSize: 18}}>
          Subtotal ({products.length} items):
          <Text style={{color: '#e47911', fontWeight: 'bold'}}>
            {' '}
            ${totalPrice.toFixed(2)}
          </Text>
        </Text>
        <Button
          text="Proceed to checkout"
          onPress={() => console.warn('go to checkout')}
          containerStyles={{backgroundColor: '#f1dc1c', borderColor: '#c7b782'}}
        />
      </View>

      <FlatList
        data={products}
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
