import React, {useState} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import countryList from 'country-list';
import styles from './styles';
import Button from '../../components/Button';

const countries = countryList.getData();

const AddressScreen = () => {
  const [country, setCountry] = useState(countries[0].code);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  const [city, setCity] = useState('');

  console.log(fullName);

  const onCheckout = () => {
    if (!fullName) {
      Alert.alert('Please enter your Full name');
      return;
    }

    console.warn('Success. Checkout');
  };

  const validateAddress = () => {
    if (address.length < 3) {
      setAddressError('Address is too short');
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Picker selectedValue={country} onValueChange={setCountry}>
          {countries.map(country => (
            <Picker.Item value={country.code} label={country.name} />
          ))}
        </Picker>
      </View>

      {/* Full name */}
      <View style={styles.row}>
        <Text style={styles.label}>Full name (First and Last name)</Text>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Phone Number */}
      <View style={styles.row}>
        <Text style={styles.label}>Phone number</Text>
        <TextInput
          keyboardType={'phone-pad'}
          style={styles.input}
          placeholder="Phone number"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* Address */}
      <View style={styles.row}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={text => {
            setAddress(text);
            setAddressError('');
          }}
          onEndEditing={validateAddress}
        />
        {!!addressError && (
          <Text style={styles.errorLabel}>{addressError}</Text>
        )}
      </View>

      {/* City */}
      <View style={styles.row}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
      </View>

      <Button text="Checkout" onPress={onCheckout} />
    </View>
  );
};

export default AddressScreen;
