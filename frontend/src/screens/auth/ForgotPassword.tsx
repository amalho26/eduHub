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

interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen = (props: ForgotPasswordScreenProps) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const isButtonDisabled = useMemo(() => {
    if (email === "") {
      return true;
    }
    return false;
  }, [email]);

  async function onPressSendEmail() {
    try {
      await Auth.forgotPassword(email);
      props.navigation.navigate("Verify Code", {
        email: email,
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
            Forgot Password?
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
          <Text style={{ color: Color.TEXT_COLOR, marginBottom: 40 }}>
            We'll send a verification code to the email if the email is
            associated with an account.
          </Text>
          <BoxButton
            isDisabled={isButtonDisabled}
            onPress={onPressSendEmail}
            title="Confirm"
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
