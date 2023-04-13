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

interface DMScreenProps {
  navigation: any;
}

const DMScreen = (props: DMScreenProps) => {
  const dispatch = useDispatch<any>();

  const user = useSelector((state: RootState) => state.auth.user);
  const groups = useSelector((state: RootState) => state.group.groups);
  const dms = groups.filter((group) => group.users.length ==2)
  const uniqueDms = [...new Map(dms.map(d => [d.users[1].id, d]))]

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate("NewDMStack")}
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
      data={dms}
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
                <View style={[{
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                    overflow: 'hidden',
                    },]}>
                    <Text style={{ color: "#c7c7c2", fontWeight: "300",fontSize: 40, textAlign: "center"}}>
                         {item.users[1].firstName.charAt(0)}
                    </Text>
                </View>
              <View style={{ flexDirection: 'column', paddingHorizontal: 10, paddingVertical: 10}}>
                <Text style={{ color: "#c7c7c2", fontWeight: "bold", fontSize: 18}}>{item.users[1].firstName+" "+item.users[1].lastName}</Text>
                {/* <Text style={{ color: "#c7c7c2", fontWeight: "300",fontSize: 14, fontStyle: "italic"}}>
                  {item.users.map((nun) => (
                    nun.firstName
                  ))}
                </Text> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default DMScreen;
