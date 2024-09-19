import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Main from '../components/BodyHome';
import Sidebar from '../components/Sidebar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Home = ({route}) => {
  const {user} = route.params || {};
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header isHomePage={true} openSidebar={openSidebar} user={user} />
        <Main user={user}/>
        {isSidebarOpen && <Sidebar closeSidebar={closeSidebar} />}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;