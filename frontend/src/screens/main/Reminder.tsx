import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { Color } from "../../theme";
import moment from "moment";

interface ReminderScreenProps {
  navigation: any;
}

const ReminderScreen = (props: ReminderScreenProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AddReminderStack")}
        >
          <Text style={{ color: Color.TEXT_COLOR, fontSize: 16 }}>Add</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const [reminders, setReminders] = useState([]);
  const [selectedReminderStatus, setSelectedReminderStatus] =
    useState("PENDING");

  async function resetReminders() {
    try {
      await AsyncStorage.removeItem(`${user.id}_REMINDERS`);
      fetchReminders();
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchReminders() {
    try {
      setIsLoading(true);
      const data = await AsyncStorage.getItem(`${user.id}_REMINDERS`);

      if (data !== null) {
        setReminders(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function completeReminder(id: string) {
    try {
      const data = await AsyncStorage.getItem(`${user.id}_REMINDERS`);
      const reminders = JSON.parse(data);
      const reminder = reminders.find((r: any) => r.id === id);
      reminder.isCompleted = true;
      await AsyncStorage.setItem(
        `${user.id}_REMINDERS`,
        JSON.stringify(reminders)
      );
      fetchReminders();
      alert("Completed!");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchReminders();
    // resetReminders();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: Color.BACKGROUND_COLOR,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setSelectedReminderStatus("PENDING")}
        >
          <View
            style={{
              borderRadius: 8,
              borderWidth: 1,
              borderColor:
                selectedReminderStatus === "PENDING"
                  ? Color.BUTTON_BACKGROUND_COLOR
                  : "gray",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 12,
              marginRight: 16,
            }}
          >
            <Text
              style={{
                color:
                  selectedReminderStatus === "PENDING"
                    ? Color.BUTTON_BACKGROUND_COLOR
                    : "gray",
              }}
            >
              Pending
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => setSelectedReminderStatus("COMPLETED")}
        >
          <View
            style={{
              borderRadius: 8,
              borderWidth: 1,
              borderColor:
                selectedReminderStatus === "COMPLETED"
                  ? Color.BUTTON_BACKGROUND_COLOR
                  : "gray",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 12,
            }}
          >
            <Text
              style={{
                color:
                  selectedReminderStatus === "COMPLETED"
                    ? Color.TEXT_COLOR
                    : "gray",
              }}
            >
              Complete
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <FlatList
        onRefresh={() => fetchReminders()}
        refreshing={false}
        style={{ flex: 1, backgroundColor: Color.BACKGROUND_COLOR }}
        data={reminders.filter(
          (reminder) =>
            reminder.isCompleted === (selectedReminderStatus === "COMPLETED")
        )}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              alignSelf: "stretch",
              padding: 16,
              borderBottomWidth: 0.5,
              borderBottomColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <View>
              <Text style={{ color: Color.TEXT_COLOR, marginBottom: 4 }}>
                {item.title}
              </Text>
              <Text style={{ color: "gray" }}>{moment(item.remindDateTime).format("YYYY-MM-DD h:mm A")}</Text>
            </View>
            <TouchableOpacity onPress={() => completeReminder(item.id)}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.4)",
                }}
              ></View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ReminderScreen;
