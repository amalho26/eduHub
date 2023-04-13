import React, { useEffect, useMemo, useState } from "react";
import { Platform, View } from "react-native";
import { ScrollView, Text, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import moment from "moment";

import { Color } from "../../theme";
import { DEFAULT_PADDING } from "../../values";
import BoxButton from "../../components/atom/BoxButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

interface AddReminderProps {
  navigation: any;
}

const AddReminder = (props: AddReminderProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [title, setTitle] = useState("");
  const [remindDateTime, setRemindDateTime] = useState<Date>(new Date());

  const isButtonDisabled = useMemo(() => {
    return title === "" || moment(remindDateTime).isSameOrBefore(moment());
  }, [title, remindDateTime]);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => console.log(token));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  async function onPressCreateReminder() {
    try {
      const existingReminders = await AsyncStorage.getItem(
        `${user.id}_REMINDERS`
      );

      let newReminders;

      if (existingReminders === null) {
        newReminders = [
          {
            id: 1,
            title,
            remindDateTime,
            isCompleted: false
          },
        ];
      } else {
        const existingRemindersArr = JSON.parse(existingReminders);
        existingRemindersArr.sort((a: any, b: any) => a.id - b.id);

        newReminders = [
          ...existingRemindersArr, 
          {
            id: existingRemindersArr[existingRemindersArr.length - 1].id + 1,
            title,
            remindDateTime,
            isCompleted: false
          }
        ];
      }

      await AsyncStorage.setItem(
        `${user.id}_REMINDERS`,
        JSON.stringify(newReminders)
      );

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Reminder',
          body: title,
        },
        trigger: { seconds: moment(remindDateTime).diff(moment(), "seconds") },
      });

      props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Color.BACKGROUND_COLOR }}>
      <View style={{ alignSelf: "stretch", padding: DEFAULT_PADDING }}>
        <TextInput
          style={{
            alignSelf: "stretch",
            height: 50,
            borderColor: Color.BUTTON_BACKGROUND_COLOR,
            borderWidth: 1,
            color: Color.TEXT_COLOR,
            paddingHorizontal: 16,
            borderRadius: 8,
            marginBottom: 32,
          }}
          value={title}
          autoCapitalize="none"
          textContentType="emailAddress"
          placeholder="Reminder Title"
          onChangeText={setTitle}
          placeholderTextColor={Color.PLACEHOLDER_TEXT_COLOR}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 40,
          }}
        >
          <Text style={{ color: Color.TEXT_COLOR }}>Remind me at</Text>
          <DateTimePicker
            mode="datetime"
            value={remindDateTime}
            themeVariant="dark"
            minimumDate={new Date()}
            onChange={(event, date) => setRemindDateTime(date)}
          />
        </View>
        <BoxButton
          title="Create Reminder"
          onPress={() => onPressCreateReminder()}
          isDisabled={isButtonDisabled}
        />
      </View>
    </ScrollView>
  );
};

export default AddReminder;
