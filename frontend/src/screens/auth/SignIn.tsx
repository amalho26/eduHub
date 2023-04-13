import { Auth } from "aws-amplify";
import { useMemo, useState } from "react";
import {
  Button,
  Dimensions,
  TextInput,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useDispatch } from "react-redux";
import BoxButton from "../../components/atom/BoxButton";
import Header from "../../components/atom/Header";
import TextButton from "../../components/atom/TextButton";
import TitleText from "../../components/atom/TitleText";
import { signIn } from "../../redux/modules/auth";
import { thunkSignIn } from "../../redux/modules/auth/thunks";
import { Color, TEXT_INPUT_BACKGROUND_COLOR } from "../../theme";
import { DEFAULT_PADDING } from "../../values";

interface SignInScreenProps {
  navigation: any;
}

const SignInScreen = (props: SignInScreenProps) => {
  const dispatch = useDispatch<any>();

  const windowWidth = Dimensions.get("window").width;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isButtonDisabled = useMemo(() => {
    return email === "" || password === "";
  }, [email, password]);

  async function onPressSignIn() {
    // test
    dispatch(
      thunkSignIn({
        username: email,
        password,
      })
    );
  }

  function onPressForgotPassword() {
    props.navigation.navigate("Forgot Password");
  }

  function onPressSignUp() {
    props.navigation.navigate("Sign Up");
  }

  return (
    <ScrollView style={{ backgroundColor: Color.BACKGROUND_COLOR }}>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          paddingHorizontal: DEFAULT_PADDING,
          paddingTop: 20,
        }}
      >
        <View
          style={{ alignSelf: "stretch", paddingHorizontal: DEFAULT_PADDING }}
        >
          <Header
            onPressBackButton={() => props.navigation.goBack()}
            hideBackButton={true}
          />
          <TitleText style={{ fontWeight: "bold", marginBottom: 20 }}>
            👋 Welcome Back!
          </TitleText>
          <TextInput
            style={{
              alignSelf: "stretch",
              height: 50,
              borderColor: Color.BUTTON_BACKGROUND_COLOR,
              borderWidth: 1,
              color: Color.TEXT_COLOR,
              paddingHorizontal: 16,
              borderRadius: 8,
              marginBottom: 20,
            }}
            value={email}
            autoCapitalize="none"
            textContentType="emailAddress"
            placeholder="Enter email..."
            onChangeText={setEmail}
            placeholderTextColor={Color.PLACEHOLDER_TEXT_COLOR}
          />
          <TextInput
            style={{
              alignSelf: "stretch",
              height: 50,
              borderColor: Color.BUTTON_BACKGROUND_COLOR,
              borderWidth: 1,
              color: Color.TEXT_COLOR,
              paddingHorizontal: 16,
              borderRadius: 8,
              marginBottom: 20,
            }}
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
            textContentType="password"
            placeholder="Enter password..."
            onChangeText={setPassword}
            placeholderTextColor={Color.PLACEHOLDER_TEXT_COLOR}
          />
          <TextButton
            onPress={onPressForgotPassword}
            title="Forgot Password?"
            style={{ marginBottom: 40 }}
          />
          <BoxButton
            isDisabled={isButtonDisabled}
            onPress={onPressSignIn}
            title="Sign In"
            style={{ marginBottom: 20}}
          />
          <TextButton
            onPress={onPressSignUp}
            title="Don't have an account? Sign up"
            style={{ alignSelf: 'center' }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  roundButton1: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: Color.BUTTON_BACKGROUND_COLOR,
    marginBottom: 5,
  },
});

export default SignInScreen;
