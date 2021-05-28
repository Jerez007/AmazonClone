import React from 'react';
import {View, Text, SafeAreaView, Pressable} from 'react-native';
import {Auth} from 'aws-amplify';
import Button from '../../components/Button';

const MenuScreen = () => {
  const onLogout = () => {
    Auth.signOut();
  };

  return (
    <View>
      <Button text="Sign out" onPress={onLogout} />
      <Pressable onPress={onLogout}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
};

export default MenuScreen;
