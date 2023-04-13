import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Amplify, Auth } from "aws-amplify";
import awsmobile from "./src/aws-exports";

// Util
import { RootState, store } from "./src/redux";

// Screens - Auth
import SignInScreen from "./src/screens/auth/SignIn";
import SignUpScreen from "./src/screens/auth/SignUp";
import ForgotPasswordScreen from "./src/screens/auth/ForgotPassword";

// Screens - Main
import HomeScreen from "./src/screens/main/Home";
import ForumScreen from "./src/screens/main/Forum";
import ChatScreen from "./src/screens/main/Chat";
import ReminderScreen from "./src/screens/main/Reminder";
import ProfileScreen from "./src/screens/main/Profile";
import ConfirmSignUpScreen from "./src/screens/auth/ConfirmSignUp";
import { useEffect, useState } from "react";
import { signIn } from "./src/redux/modules/auth";
import { thunkSignIn } from "./src/redux/modules/auth/thunks";
import NewGroupScreen from "./src/screens/main/NewGroup";
import VerifyForgotPasswordScreen from "./src/screens/auth/VerifyForgotPassword";
import ChatRoomScreen from "./src/screens/main/ChatRoom";
import AddUsersScreen from "./src/screens/main/AddUsers";
import { Image, StatusBar, Text } from "react-native";
import AddReminder from "./src/screens/main/AddReminder";
import GroupInfoScreen from "./src/screens/main/GroupInfo";
import ForumPostScreen from "./src/screens/main/ForumPost";
import NewDMScreen from "./src/screens/main/NewDM";
import DMScreen from "./src/screens/main/DM";

Amplify.configure(awsmobile);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
      <Stack.Screen name="Verify Code" component={VerifyForgotPasswordScreen} />
      <Stack.Screen name="Confirm Sign Up" component={ConfirmSignUpScreen} />
    </Stack.Navigator>
  );
};

const NewGroupStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NewGroup" component={NewGroupScreen} />
      <Stack.Screen name="AddUsers" component={AddUsersScreen} />
    </Stack.Navigator>
  );
};

const NewDMStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NewDM" component={NewDMScreen} />
    </Stack.Navigator>
  );
};

const GroupInfoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GroupInfo" component={GroupInfoScreen} />
    </Stack.Navigator>
  );
};
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#292F3F",
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
  
    </Stack.Navigator>
  );
};
const ReminderStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#292F3F",
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
      }}
    >
      <Stack.Screen name="Reminder" component={ReminderScreen} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="AddReminderStack"
          component={AddReminder}
          options={{
            headerTitle: "Add Reminder",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#292F3F",
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
      }}
    >
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Group
        screenOptions={{ presentation: "modal", headerShown: false }}
      >
        <Stack.Screen name="NewGroupStack" component={NewGroupStackNavigator} />
        </Stack.Group>
        <Stack.Group
        screenOptions={{ headerShown: false}}
      >
        <Stack.Screen name="DMStackNavigator" component={DMStackNavigator} />
      </Stack.Group>
        
      
    </Stack.Navigator>
  );
};

const DMStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#292F3F",
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
      }}
    >
      <Stack.Screen name="DM" component={DMScreen} />
      <Stack.Group
        screenOptions={{ presentation: "modal", headerShown: false }}
      >
        <Stack.Screen name="NewDMStack" component={NewDMStackNavigator} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const ForumStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#292F3F",
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
      }}
    >
      <Stack.Screen name="Forum" component={ForumScreen} />
      <Stack.Screen name="ForumPost" component={ForumPostScreen} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#292F3F",
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#292F3F",
          borderTopColor: "rgba(255, 255, 255, 0.2)",
        },
        tabBarLabel: ({ focused, color, size }) => {
          return (
            <Text style={{ color: focused ? "white" : "gray", fontSize: 10 }}>
              {route.name.substring(0, route.name.length - 3)}
            </Text>
          );
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            return (
              <Image
                source={require("./assets/home-tab.png")}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "white" : "gray",
                }}
              />
            );
          } else if (route.name === "ReminderTab") {
            return (
              <Image
                source={require("./assets/reminder-tab.png")}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "white" : "gray",
                }}
              />
            );
          } else if (route.name === "ChatTab") {
            return (
              <Image
                source={require("./assets/message-tab.png")}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "white" : "gray",
                }}
              />
            );
          } else if (route.name === "ForumTab") {
            return (
              <Image
                source={require("./assets/forum-tab.png")}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "white" : "gray",
                }}
              />
            );
          } else {
            return (
              <Image
                source={require("./assets/profile-tab.png")}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "white" : "gray",
                }}
              />
            );
          }
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="ReminderTab" component={ReminderStackNavigator} />
      <Tab.Screen name="ChatTab" component={ChatStackNavigator} />
      <Tab.Screen name="ForumTab" component={ForumStackNavigator} />
      <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

const ChatRoomStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#292F3F",
        },
        headerTitleStyle: {
          color: "#ffffff",
        },
      }}
    >
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      <Stack.Group
        screenOptions={{ presentation: "modal", headerShown: false }}
      >
        <Stack.Screen name="GroupInfo" component={GroupInfoScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="ChatRoomStack" component={ChatRoomStackNavigator} />
    </Stack.Navigator>
  );
};

const RootStackNavigator = () => {
  const dispatch = useDispatch<any>();

  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  async function checkAuthenticatedUser() {
    dispatch(thunkSignIn());
  }

  useEffect(() => {
    checkAuthenticatedUser();
  }, []);

  return isLoading ? null : user ? <StackNavigator /> : <AuthStackNavigator />;
};

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <RootStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
