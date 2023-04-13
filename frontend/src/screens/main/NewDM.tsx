import { API, graphqlOperation } from "aws-amplify";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector} from "react-redux";
import { listUsers } from "../../graphql/queries";
import { getUserInfo } from "../../graphql/queries";
import { User } from "../../API";
import { createGroup } from "../../graphql/mutations";
import { thunkCreateGroup } from "../../redux/modules/group/thunks";
import { RootState } from '../../redux';

interface NewDMScreenProps {
  navigation: any;
}

const NewDMScreen = (props: NewDMScreenProps) => {
  const dispatch = useDispatch();

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  

  useEffect(() => {
    getUser()
  }, []);
  
  useEffect(() => {
    fetchUsers();
  }, [searchText, currentUser]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <Button title="Cancel" onPress={() => props.navigation.goBack()} />
      ),
      headerRight: () => (
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: "#007AFF" }]}
          onPress={onPressCreateGroup}
        >
          <Text style={[styles.cancelButtonText, { color: "#fff" }]}>Send</Text>
        </TouchableOpacity>
      ),
    });
  }, [groupName, description, users]);

  async function fetchUsers() {
    console.log(currentUser.id)
    try {
      const { data } = await API.graphql(
        graphqlOperation(listUsers, {
          search: searchText,
        })
      );
      setUsers(data.listUsers.filter(user => user.id !== currentUser.id));
    } catch (error) {
      console.log(error);
    }
  }

  async function getUser(){
    try {
      const { data } = await API.graphql(graphqlOperation(getUserInfo));
      setCurrentUser(data.getUserInfo);
    } catch (error) {
      console.log(error);
    }
  }

  function getUserIds() {
    let userIds = "";
    for (let i = 0; i < selectedUsers.length; i++) {
      if (i !== 0) {
        userIds += `,${selectedUsers[i].id}`;
      } else {
        userIds += selectedUsers[i].id;
      }
    }
    console.log(userIds)

    return userIds;
  }

  async function onPressCreateGroup() {

    try {
      await dispatch(
        thunkCreateGroup({
          name: "",
          description: "",
          userIds: getUserIds(),
        })
      );
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  function isUserSelected(userId: string) {
    return selectedUsers.findIndex((user) => user.id === userId) !== -1;
  }

  function onSelect(item: User){
    if (isUserSelected(item.id)) {
      setSelectedUsers((prev) => prev.filter((user) => user.id !== item.id));
    } else {
      setSelectedUsers((prev) => prev.concat(item));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Cancel"
          onPress={() => props.navigation.goBack()}
          color="#007AFF"
        />
        <Text style={styles.headerTitle}>New DM</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={onPressCreateGroup}
        >
          <Text style={styles.createButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.suggestedText}>Suggested</Text>

      <FlatList
        style={{ flex: 1, marginTop: 20 }}
        data={users}
        renderItem={({ item, index }) => (
          
          <View style={styles.userContainer} key={item.id}>
          <View style={styles.avatarContainer} />
          <View style={styles.userInfoContainer}>
            <Text style={styles.userText}>
              {item.firstName + " " + item.lastName}
            </Text>
            <Text style={styles.userText}>{item.email}</Text>
          </View>
          <TouchableOpacity style={{width: 20, height: 20, borderRadius: 5, backgroundColor: isUserSelected(item.id) ? '#007AFF' : '#fff'}} onPress={() => onSelect(item)}/>
        </View>

        )}
      />
      

      </View>
  );
  };

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "#292F3F",
padding: 20,
},
inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#808080",
  borderRadius: 8,
  padding: 2,
  height: 40
},
searchInput: {
  flex: 1,
  color: "#292F3F",
  fontSize: 16
},
header: {
flexDirection: "row",
alignItems: "center",
justifyContent: "space-between",
marginBottom: 20,
},
headerTitle: {
fontSize: 20,
fontWeight: "bold",
color: "#fff",
},
cancelButton: {
  marginHorizontal: 10,
  backgroundColor: "white",
  borderRadius: 5,
  paddingVertical: 5,
  paddingHorizontal: 10,
},
cancelButtonText: {
  color: "#007AFF",
  fontSize: 16,
  fontWeight: "bold",
},
createButton: {
backgroundColor: "transparent",
padding: 10,
borderRadius: 5,
},
createButtonText: {
color: "#007AFF",
fontSize: 18
},
nameInput: {
  backgroundColor: "#292F3F",
  padding: 10,
  borderRadius: 5,
  marginBottom: 10,
  },
input: {
backgroundColor: "#808080",
padding: 10,
borderRadius: 5,
marginBottom: 10,
},
textArea: {
backgroundColor: "#808080",
padding: 10,
borderRadius: 8,
textAlignVertical: "center",
marginBottom: 10,
},
userContainer: {
flexDirection: "row",
alignItems: "center",
marginBottom: 10,
},
suggestedText: {
  color: "#b4b4b4",
  marginLeft: 8,
},
avatarContainer: {
width: 50,
height: 50,
backgroundColor: "#b4b4b4",
borderRadius: 25,
marginRight: 10,
},
userInfoContainer: {
flex: 1,
},
userText: {
fontWeight: "bold",
color:  "#fff",
fontSize: 16,
marginBottom: 5,
},
checkbox: {
width: 20,
height: 20,
borderRadius: 5,
backgroundColor: "#fff"
},
});

export default NewDMScreen;
