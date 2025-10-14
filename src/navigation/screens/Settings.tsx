import { Text } from '@react-navigation/elements';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getToken, removeToken } from '../../untils/tokenManager';
import { SettingItem } from '../../components/SettingItem';
import { useNavigation } from '@react-navigation/native';



interface InfoUser {
  name: string;
  avatar: { url: string; alt?: string };
  email: string;
}


export function Settings() {

  const [infoUser, setInfoUser] = useState<InfoUser>({ name: '', email: '', avatar: { url: '' } });

  const navigation = useNavigation();

  const fetchCurrentUser = async () => {
    const accessToken = await getToken();
    try {
      const res = await fetch('http://localhost:3000/api/auth/current-user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      const data = await res.json()
      setInfoUser(data.user)
    } catch (error) {
      console.log("error", error)
    }
  }

  const logOut = async () => {
    // Xử lý đăng xuất
    console.log("Log out")
    await removeToken();
    navigation.navigate('Login' as never)

  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  console.log("infoUser", infoUser)

  return (
    <SafeAreaView style={styles.container}>
      {/* Header   */}
      <Text style={styles.headerTitle}>
        Settings
      </Text>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          style={styles.avatar}
          source={{ uri: infoUser?.avatar.url ? (infoUser.avatar.url) : ('https://th.bing.com/th/id/R.8abfe2ef47928d571cc99392008a51b4?rik=Y%2bYhYENUvY3fMw&pid=ImgRaw&r=0') }}
        />
        <View>
          <Text style={styles.name}>
            {infoUser?.name || 'User Name'}
          </Text>
          <Text style={styles.email}>
            {infoUser?.email || 'no provided email'}
          </Text>
        </View>
      </View>

      {/* Option  */}
      <View style={styles.option}>
        <SettingItem
          icon='person-outline'
          label='Account'
        />
        <SettingItem
          icon='notifications-outline'
          label='Notifications'
        />
        <SettingItem
          icon='lock-closed-outline'
          label='Privacy'
        />
        <SettingItem
          icon='help-circle-outline'
          label='Help & Support'
        />
        <SettingItem
          icon='information-circle-outline'
          label='About'
        />
        <SettingItem
          icon='log-out-outline'
          label='Log Out'
          onPress={logOut}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Chỉ áp dụng cho Android để tạo hiệu ứng bóng đổ
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  option: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 20,
  }
});
