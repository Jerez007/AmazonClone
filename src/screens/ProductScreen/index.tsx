import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';
import product from '../../data/product';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';

const ProductSreen = () => {
  const [selectedOption, setSelectedOption] = useState(
    product.options ? product.options[0] : null,
  );
  const [quantity, setQuantity] = useState(1);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      {/* image carousel */}
      <ImageCarousel images={product.images} />

      {/* option selector */}
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}>
        {product.options.map(option => (
          <Picker.Item label={option} value={option} />
        ))}
      </Picker>

      {/* price */}
      <Text style={styles.price}>
        from ${product.price}
        {product.oldPrice && (
          <Text style={styles.oldPrice}> ${product.oldPrice}</Text>
        )}
      </Text>

      {/* description */}
      <Text style={styles.description}>{product.description}</Text>

      {/* quantity selector */}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      {/* button */}
      <Button
        text={'Add To Cart'}
        onPress={() => {
          console.warn('Add to cart');
        }}
        containerStyles={{backgroundColor: '#f19941'}}
      />
      <Button
        text={'Buy Now'}
        onPress={() => {
          console.warn('Buy now');
        }}
      />
    </View>
  );
};

export default ProductSreen;
