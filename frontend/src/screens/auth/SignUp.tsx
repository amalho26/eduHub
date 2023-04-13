import { Amplify, API, Auth, graphqlOperation } from "aws-amplify";
import { useMemo, useState } from "react";
import { Button, Dimensions, TextInput, View, ScrollView, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { Color, TEXT_INPUT_BACKGROUND_COLOR } from "../../theme";
import { DEFAULT_PADDING } from "../../values";
import BoxButton from "../../components/atom/BoxButton";
import Header from "../../components/atom/Header";
import TitleText from "../../components/atom/TitleText";

interface SignUpScreenProps {
  navigation: any;
}

const SignUpScreen = (props: SignUpScreenProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const windowWidth = Dimensions.get('window').width;

  const isButtonDisabled = useMemo(() => {
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      password !== confirmPassword
    ) {
      return true;
    }

    return false;
  }, [email, password, confirmPassword]);

  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          "custom:firstName": firstName,
          "custom:lastName": lastName,
        },
        autoSignIn: {
          enabled: true,
        },
      });

      props.navigation.navigate("Confirm Sign Up", {
        email,
        firstName,
        lastName
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView style ={{backgroundColor:Color.BACKGROUND_COLOR}}>
     <SafeAreaView style={{ flex: 1, alignItems: 'center', paddingHorizontal: DEFAULT_PADDING, paddingTop: 20 }}>
      <View style={{ alignSelf: "stretch", paddingHorizontal: DEFAULT_PADDING }}>
        <Header
            onPressBackButton={() => props.navigation.goBack()}
            hideBackButton={false}
          />
        <TitleText style={{ fontWeight: "bold", marginBottom: 20 }}>
            Sign Up
          </TitleText>
      <Text style = {{fontSize: 14,marginBottom:5, marginTop: 5, color: 'white'}}>
        {"Email"}
      </Text>
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
        value={email}
        textContentType="emailAddress"
        placeholder="Enter Email..."
        onChangeText={setEmail}
        placeholderTextColor={Color.PLACEHOLDER_TEXT_COLOR}
      />
      
      <Text style = {{fontSize: 14,marginBottom:5, marginTop: 5, color: 'white'}}>
        {"First Name"}
      </Text>
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
        value={firstName}
        textContentType="givenName"
        placeholder="Enter First Name..."
        onChangeText={setFirstName}
        placeholderTextColor={Color.PLACEHOLDER_TEXT_COLOR}
      />
      
      <Text style = {{fontSize: 14,marginBottom:5, marginTop: 5, color: 'white'}}>
        {"Last Name"}
      </Text>
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
        value={lastName}
        textContentType="familyName"
        placeholder="Enter Last Name..."
        onChangeText={setLastName}
        placeholderTextColor={Color.PLACEHOLDER_TEXT_COLOR}
      />
      
      <Text style = {{fontSize: 14,marginBottom:5, marginTop: 5, color: 'white'}}>
        {"Create Password"}
      </Text>
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
        value={password}
        secureTextEntry
        textContentType="password"
        placeholder="Enter Password..."
        onChangeText={setPassword}
        placeholderTextColor={Color.PLACEHOLDER_TEXT_COLOR}
      />
      
      <Text style = {{fontSize: 14,marginBottom:5, marginTop: 5, color: 'white'}}>
        {"Confirm Password"}
      </Text>
      <TextInput
        style={{
          alignSelf: "stretch",
          height: 50,
          borderColor: Color.BUTTON_BACKGROUND_COLOR,
          borderWidth: 1,
          color: Color.TEXT_COLOR,
          paddingHorizontal: 12,
          borderRadius: 8,
          marginBottom: 20,
        }}
        value={confirmPassword}
        secureTextEntry
        textContentType="password"
        placeholder="Confirm Password..."
        onChangeText={setConfirmPassword}
        placeholderTextColor={Color.PLACEHOLDER_TEXT_COLOR}
      />
      
      <BoxButton
            isDisabled={isButtonDisabled}
            onPress={() => signUp()}
            title="Sign Up"
            style={{marginBottom: 20, marginTop: 20}}
      />
      </View>
        </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpScreen;
