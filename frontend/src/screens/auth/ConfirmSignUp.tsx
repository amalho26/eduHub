import { API, Auth, graphqlOperation } from "aws-amplify";
import { useState } from "react";
import { Button, Dimensions, TextInput, View, ScrollView, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/modules/auth";
import { thunkSignIn } from "../../redux/modules/auth/thunks";
import { Color, TEXT_INPUT_BACKGROUND_COLOR } from "../../theme";
import BoxButton from "../../components/atom/BoxButton";
import TitleText from "../../components/atom/TitleText";
import { DEFAULT_PADDING } from "../../values";
import Header from "../../components/atom/Header";

interface ConfirmSignUpScreenProps {
  navigation: any;
  route: {
    params: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    };
  };
}

const ConfirmSignUpScreen = (props: ConfirmSignUpScreenProps) => {
  const dispatch = useDispatch();

  const [code, setCode] = useState("");

  async function onPressConfirmSignUp() {
    const email = props.route.params.email;
    const password = props.route.params.password;
    const firstName = props.route.params.firstName;
    const lastName = props.route.params.lastName;

    try {
      await Auth.confirmSignUp(props.route.params.email, code);
      props.navigation.popToTop()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView style = {{backgroundColor:Color.BACKGROUND_COLOR}}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', paddingHorizontal: DEFAULT_PADDING, paddingTop: 20 }}>
      <View style={{ alignSelf: "stretch", paddingHorizontal: DEFAULT_PADDING }}>
        <Header
            onPressBackButton={() => props.navigation.goBack()}
            hideBackButton={true}
          />
        <TitleText style={{ fontWeight: "bold", marginBottom: 20}}>
            Enter Verification Code
          </TitleText>
          <TextInput
            style={{
              alignSelf: "stretch",
              height: 50,
              borderColor: Color.BUTTON_BACKGROUND_COLOR,
              borderWidth: 1,
              color: Color.TEXT_COLOR,
              paddingHorizontal: 12,
              borderRadius: 8,
              marginBottom: 12,
            }}
            value={code}
            keyboardType="number-pad"
            onChangeText={setCode}
            placeholderTextColor={Color.PLACEHOLDER_TEXT_COLOR}
          />
        <BoxButton
            isDisabled = {false}
            onPress={onPressConfirmSignUp}
            title="Confirm"
            style={{marginBottom: 20, marginTop: 20}}
        />
        </View>
      </SafeAreaView>
    </ScrollView>
      
  );
};

export default ConfirmSignUpScreen;
