import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/atom/Avatar";
import { listGroups } from "../../graphql/queries";
import { RootState } from "../../redux";
import { setSelectedGroupId } from "../../redux/modules/group";
import { thunkListGroups } from "../../redux/modules/group/thunks";
import { Color } from "../../theme";

interface ChatScreenProps {
  navigation: any;
}

const ChatScreen = (props: ChatScreenProps) => {
  const dispatch = useDispatch<any>();

  const user = useSelector((state: RootState) => state.auth.user);
  const groups = useSelector((state: RootState) => state.group.groups);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate("NewGroupStack")}
        >
          <Text style={{ color: Color.TEXT_COLOR, fontSize: 16 }}>Add</Text>
        </TouchableOpacity>
      ), 
      headerRight: () => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate("DMStackNavigator")}
        >
          <Image source={require("../../../assets/dm.png")} style={{ width: 26,height: 26,}}></Image>
        </TouchableOpacity>
      )
    });
  }, []);

  async function fetchGroups() {
    try {
      dispatch(thunkListGroups(parseInt(user.id)));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  function onPressGroup(id: string) {
    dispatch(setSelectedGroupId(parseInt(id)));
    props.navigation.navigate("ChatRoomStack");
  }

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: Color.BACKGROUND_COLOR}}
      data={groups}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => onPressGroup(item.id)}>
          <View
            style={{
              backgroundColor: Color.BACKGROUND_COLOR, /* bckgrd: "white"/ #292f3f*/
              width: Dimensions.get("screen").width,
              padding: 20,
              paddingLeft: 10,
              borderBottomColor: "#AAAAAA", /* borderBottomColor: "#d4d4d4" */
              borderBottomWidth: 0.3
            }}
          >
            <View style={{ flexDirection: 'row', paddingLeft: 0}}>
              <Avatar src={require("../../../assets/groupAvaDef.png")} size={50} />
              <View style={{ flexDirection: 'column', paddingHorizontal: 10, paddingVertical: 10}}>
                <Text style={{ color: "#c7c7c2", fontWeight: "bold", fontSize: 18}}>{item.name}</Text>
                <Text style={{ color: "#c7c7c2", fontWeight: "300",fontSize: 14, fontStyle: "italic"}}>
                  {item.users.length} group{item.users.length === 1 ? "" : "s"} member(s)
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default ChatScreen;
