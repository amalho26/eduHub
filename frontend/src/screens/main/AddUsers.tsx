import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { listUsers } from "../../graphql/queries";
import { User } from "../../types";

interface AddUsersScreenProps {
  navigation: any,
  route: {
    params: {
      setUsers: (users: User[]) => void
    }
  }
}

const AddUsersScreen = (props: AddUsersScreenProps) => {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  async function fetchUsers() {
    try {
      const { data } = await API.graphql(
        graphqlOperation(listUsers, {
          search: searchText,
        })
      );
      setUsers(data.listUsers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [searchText]);

  function onPressUser(item: User) {
    if (isUserSelected(item.id)) {
      setSelectedUsers((prev) => prev.filter((user) => user.id !== item.id));
    } else {
      setSelectedUsers((prev) => prev.concat(item));
    }
  }

  function isUserSelected(userId: string) {
    return selectedUsers.findIndex((user) => user.id === userId) !== -1;
  }

  function onPressConfirm() {
    if (props.route.params && props.route.params.setUsers) {
      props.route.params.setUsers(selectedUsers);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <TextInput
          style={{
            marginHorizontal: 20,
            paddingHorizontal: 16,
            height: 50,
            backgroundColor: "#f4f4f4",
          }}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search user name"
          placeholderTextColor="rgba(0, 0, 0, 0.2)"
        />
        <FlatList
          style={{ flex: 1, marginTop: 20 }}
          data={users}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => onPressUser(item)}
              style={{ paddingHorizontal: 20, marginBottom: 12 }}
            >
              <Text>{item.firstName + " " + item.lastName}</Text>
              <Text>{item.email}</Text>
              <Text>{isUserSelected(item.id) ? "SELECTED" : "SELECT"}</Text>
            </TouchableOpacity>
          )}
        />
        <Button 
          title="Confirm"
          onPress={onPressConfirm}
        />
      </View>
    </ScrollView>
  );
};

export default AddUsersScreen;
