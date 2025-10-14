import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { Updates } from './screens/Updates';
import { NotFound } from './screens/NotFound';
import Login from './screens/Login';
import Register from './screens/Register';
import { Ionicons } from '@expo/vector-icons';
import ProductDetail from './screens/ProductDetail';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        headerShown: false,
        title: 'Feed',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Updates: {
      screen: Updates,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Settings: {
      screen: Settings,
      options: {
        title: 'settings',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings-outline" size={size} color={color} />
        ),
      },
    }
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Login: {
      screen: Login,
      options: {
        headerShown: false
      },
    },
    ProductDetail: {
      screen: ProductDetail,
      options: {
        title: 'Product Detail',
        headerShown: true,
      },
      linking: { // linking là để định nghĩa đường dẫn động
        path: 'product/:id',
      }
    },
    Register: {
      screen: Register,
      options: {
        headerShown: false
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
