import { TabRouter } from "@react-navigation/native";
import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import {
  Animated,
  Button,
  Dimensions,
  EmitterSubscription,
  FlatList,
  InputAccessoryView,
  Keyboard,
  KeyboardEventName,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Image
} from "react-native";
import { useSelector } from "react-redux";
import Avatar from "../../components/atom/Avatar";
import { createMessage } from "../../graphql/mutations";
import { listMessages } from "../../graphql/queries";
import { onNewMessage } from "../../graphql/subscriptions";
import { RootState } from "../../redux";
import { Color } from "../../theme";

interface ChatRoomScreenProps {
  route: {
    params: {
      groupId: string;
    };
  };
}

const ChatRoomScreen = (props: ChatRoomScreenProps) => {
  const selectedGroupId = useSelector(
    (state: RootState) => state.group.selectedGroupId
  );
  const groups = useSelector((state: RootState) => state.group.groups);
  const user = useSelector((state: RootState) => state.auth.user);

  const flatListRef = useRef<FlatList>();

  const [scrollBottomHeight, setScrollBottomHeight] = useState(0);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");


  async function fetchMessages() {
    try {
      const { data } = await API.graphql(
        graphqlOperation(listMessages, {
          groupId: selectedGroupId,
        })
      );
      //console.log(data);
      setMessages(data.listMessages);
    } catch (error) {
      console.log(error);
    }
  }

  const keyboardShowListener = useRef<EmitterSubscription>();
  const keyboardHideListener = useRef<EmitterSubscription>();

  useEffect(() => {
    let keyboardShowEvent = "keyboardWillShow" as KeyboardEventName;
    let keyboardHideEvent = "keyboardWillHide" as KeyboardEventName;

    if (Platform.OS === "android") {
      keyboardShowEvent = "keyboardDidShow" as KeyboardEventName;
      keyboardHideEvent = "keyboardDidHide" as KeyboardEventName;
    }

    keyboardShowListener.current = Keyboard.addListener(
      keyboardShowEvent,
      (event: any) => {
        keyboardShow(event);
      }
    );
    keyboardHideListener.current = Keyboard.addListener(
      keyboardHideEvent,
      (event: any) => keyboardHide(event)
    );
    return () => {
      keyboardShowListener.current?.remove();
      keyboardHideListener.current?.remove();
    };
  }, []);

  function keyboardShow(event: any) {
    const duration = event.duration;

    LayoutAnimation.configureNext({
      duration,
      update: {
        type: LayoutAnimation.Types.keyboard,
      },
    });

    setScrollBottomHeight(event.endCoordinates.height);
  }

  function keyboardHide(event: any) {
    const duration = event.duration;

    LayoutAnimation.configureNext({
      duration,
      update: {
        type: LayoutAnimation.Types.keyboard,
      },
    });

    setScrollBottomHeight(0);
  }

  useEffect(() => {
    fetchMessages();

    const onNewMessageSuscription = API.graphql(
      graphqlOperation(onNewMessage, {
        groupId: selectedGroupId,
      })
    ).subscribe({
      next: ({ value }: any) => {
        setMessages((prev) => prev.concat(value.data.onNewMessage));
      },
      error: (error) => {
        console.log(error);
      },
    });

    return () => {
      onNewMessageSuscription.unsubscribe();
    };
  }, [selectedGroupId]);

  async function onPressSendMessage() {
    try {
      const { data } = await API.graphql(
        graphqlOperation(createMessage, {
          groupId: selectedGroupId,
          message: messageText,
        })
      );
      setMessageText("");
    } catch (error) {
      console.log(error);
    }
  }
  
  useLayoutEffect(() => {
    if (selectedGroupId != -1) {
      const selectedGroup = groups.find((group) => parseInt(group.id) === selectedGroupId);
        props.navigation.setOptions({
        headerTitle: () => (
          <TouchableOpacity onPress={() => props.navigation.navigate('GroupInfo', { group: selectedGroup })}>
          <View style={styles.groupTitle}>
          <Avatar src={require("../../../assets/groupAvaDef.png")} size={35} />
            <Text style={styles.groupName}>{selectedGroup?.name}</Text>
          </View>
        </TouchableOpacity>
        ),
      });
    }
  }, [selectedGroupId]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.BACKGROUND_COLOR,
      }}>

      <FlatList
        ref={flatListRef}
        style={{ flex: 1, height: 200 }}
        data={messages}

        renderItem={({ item, index }) => (

          <View style={{
            // flex: 1,
            flexDirection: item.user.id === user.id ? "row-reverse" : "row",
            height: 100,
            top: 3,
            // borderWidth: 0.2,
            // borderRadius: 15,
            // borderColor: "#39FF14",
          }}>
            {/** Avatar + textmsg container*/}
            <View style={{
              // flexDirection: item.user.id === user.id ? "row-reverse" : "row",
              height: 100,
              // borderWidth: 0.2,
              // borderRadius: 15,
              // borderColor: "#FF0000",
            }}>

              {/*LEFT PROFILE AVATAR VIEW --- OTHER PERSON*/}
              <View style={{
                justifyContent: "space-around",
                // borderWidth: 0.2,
                // borderRadius: 15,
                // borderColor: "#04d9ff",
                alignSelf: item.user.id === user.id ? "flex-end" : "flex-start"
              }}>
                <Avatar src={item.user.id === user.id ? require("../../../assets/profIconF.png") : require("../../../assets/profIconM.png")} size={120} />
                </View>
                {/* </View> */}


                {/*RIGHT PROFILE AVATAR VIEW --- YOU*/}
                {/* <View>
                    <Avatar src={require("../../../assets/profIconF.png")}  size={120} style={{ alignSelf: item.user.id === user.id ? "flex-end" : "flex-start"}}/>
                    </View>  */}


                {/*CHAT TEXT BOX VIEW*/}
                <View style={{
                  // flex: 0,
                  justifyContent: "space-evenly",
                  alignSelf: item.user.id === user.id ? "flex-end" : "flex-start", //felx-end: right, flex-start: left
                  backgroundColor: item.user.id === user.id ? "#9E6DF7" : "#B0B0B0", //"ur message: #007AFF" other msg: #B0B0B0
                  padding: 8,
                  marginBottom: 16,
                  marginVertical: -20,
                  marginHorizontal: 25,
                  borderRadius: 16,
                }}>
                  
                  <Text style={{ fontWeight: "bold", fontStyle: "italic", marginBottom: 10, marginTop: 20, fontFamily: "bold" }}>
                        {user.firstName} {user.lastName}
                  </Text>
                  <Text
                    style={{ color: item.user.id === user.id ? "white" : "black" }}
                  >
                    {item.message}
                  </Text>
                </View>
                {/*END OF CHAT TEXT MESSAGE BOX VIEW*/}
            </View>
          </View>
        )}
        onContentSizeChange={() => {
          flatListRef.current.scrollToEnd();
        }}
        ListFooterComponent={() => (
          <View style={{ height: scrollBottomHeight }} />
        )}
      />
      <InputAccessoryView>
        <View
          style={{
            height: 88,
            backgroundColor: Color.BACKGROUND_COLOR,
            top: 35,
            paddingVertical: 1,
            paddingHorizontal: 0,
            borderWidth: 0.3,
            borderRadius: 5,
            borderColor: "white"
          }}
        >
          <View
            style={{
              height: 50,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              multiline
              value={messageText}
              onChangeText={setMessageText}
              style={{
                borderRadius: 3,
                fontSize: 16,
                fontStyle: "italic",
                flex: 1,
                paddingTop: 12,
                padding: 20,
                alignSelf: "stretch",
                height: 50,
                backgroundColor: "#E2DFDF",
              }}
              placeholder="Enter message..."
            />
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={onPressSendMessage}>
              <Text style={{ fontSize: 12, color: 'white' }}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </InputAccessoryView>
    </View>
  )
}
const styles = StyleSheet.create({
  sendBtn: {
    backgroundColor: "#7F37DB", //#683D9D or 8948DB or 7F37DB
    borderRadius: 3,
    width: 70,
    height: 50,
    justifyContent: "center",
    padding: 1,
    alignItems: "center",
  },
  groupTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupName: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatRoomScreen;
