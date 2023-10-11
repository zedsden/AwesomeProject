import React, { useState } from 'react';
import { View, Button } from 'react-native';
import AdminScreen from './AdminScreen';
import UserScreen from './ShopUser';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button title="Admin" onPress={() => setIsAdmin(true)} />
        <Button title="User" onPress={() => setIsAdmin(false)} />
      </View>
      {isAdmin ? <AdminScreen /> : <UserScreen />}
    </View>
  );
};

export default App;