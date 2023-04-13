import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import { Color, TEXT_INPUT_BACKGROUND_COLOR } from "../../theme";
import { Auth } from "aws-amplify";
import { DEFAULT_PADDING } from "../../values";
import Header from "../../components/atom/Header";
import TitleText from "../../components/atom/TitleText";
import BoxButton from "../../components/atom/BoxButton";
import TextButton from "../../components/atom/TextButton";

interface VerifyForgotPasswordScreenProps {
  navigation: any;
  route: {
    params: {
      email: string;
    };
  };
}

const VerifyForgotPasswordScreen = (props: VerifyForgotPasswordScreenProps) => {
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isButtonDisabled = useMemo(() => {
    if (
      code === "" ||
      password === "" ||
      confirmPassword === "" ||
      password !== confirmPassword
    ) {
      return true;
    }
    return false;
  }, [code]);

  async function onPressVerifyCode() {
    console.log(props.route.params.email);
    try {
      await Auth.forgotPasswordSubmit(
        props.route.params.email,
        code,
        confirmPassword
      );
      props.navigation.popToTop();
    } catch (error) {
      console.log(error);
    }
  }

  async function onPressResendCode() {
    try {
      await Auth.forgotPassword(code);
      props.navigation.navigate("Verify Code", {
        code: code,
      });
    } catch (error) {
      console.log(error);
    }
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
            hideBackButton={false}
          />
          <TitleText style={{ fontWeight: "bold", marginBottom: 20 }}>
            Reset Password
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
            value={code}
            autoCapitalize="none"
            placeholder="Enter code..."
            onChangeText={setCode}
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
            secureTextEntry
            autoCapitalize="none"
            textContentType="password"
            placeholder="Enter new password..."
            onChangeText={setPassword}
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
            value={confirmPassword}
            secureTextEntry
            autoCapitalize="none"
            textContentType="password"
            placeholder="Verify new password..."
            onChangeText={setConfirmPassword}
            placeholderTextColor={Color.PLACEHOLDER_TEXT_COLOR}
          />
          <TextButton
            onPress={onPressResendCode}
            title="Resend code"
          />
          <BoxButton
            isDisabled={isButtonDisabled}
            onPress={onPressVerifyCode}
            title="Reset"
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

export default VerifyForgotPasswordScreen;
