import React from 'react';
import { Button, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { thunkSignOut } from '../../redux/modules/auth/thunks';
import { Color, TEXT_INPUT_BACKGROUND_COLOR } from "../../theme";
import { DEFAULT_PADDING } from "../../values";
import Header from "../../components/atom/Header";
import TitleText from "../../components/atom/TitleText";
import BoxButton from "../../components/atom/BoxButton";
import Avatar from "../../components/atom/Avatar";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

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
        <View style={{ alignSelf: "center", paddingHorizontal: DEFAULT_PADDING}}>
          <Avatar src={require("../../../assets/groupAvaDef.png")} size={100} />
        </View>
        <View style={{ alignSelf: "stretch", paddingHorizontal: DEFAULT_PADDING}}>

        <TitleText style={{ fontWeight: "bold", marginBottom: 10, marginTop: 20, alignSelf: "center" }}>
          {user.firstName} {user.lastName}
          </TitleText>
          <Text style = {{fontSize: 16, fontWeight: "900", marginBottom:30, marginTop: 10, alignSelf: "center", color: 'white'}}>{user.email}</Text>
          <BoxButton
            isDisabled={false}
            onPress={() => dispatch(thunkSignOut())}
            title="Sign Out"
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default ProfileScreen;