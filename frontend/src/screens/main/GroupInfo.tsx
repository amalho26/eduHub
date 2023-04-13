import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
  } from "react-native";
import Avatar from "../../components/atom/Avatar";

interface GroupInfoScreenProps {
    route: {
    params: {
      group: any;
    };
  };
}

const GroupInfoScreen = (props: GroupInfoScreenProps) => {

    const group = props.route.params.group

    return (
        <View style={styles.container}>
          <View style={styles.groupHeader}>
            <Avatar src={require("../../../assets/groupAvaDef.png")} size={80} />
            <Text style={styles.groupName}>{group.name}</Text>
            <Text style={styles.membersTitle}>Members</Text>
          </View>
          <ScrollView>
            {group.users.map((user) => (
              <View key={user.id} style={styles.memberItem}>
                <Avatar size={30} src={require("../../../assets/groupAvaDef.png")} />
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{user.firstName + " " + user.lastName}</Text>
                  <Text style={styles.memberEmail}>{user.email}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#292f3f',
    },
    groupHeader: {
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 10,
    },
    groupName: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
    },
    membersTitle: {
      color: '#808080',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      textAlign: 'left',
    },
    memberItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    memberInfo: {
      marginLeft: 10,
    },
    memberName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: "#fff"
    },
    memberEmail: {
      fontSize: 14,
      color: '#fff',
    },
  });

export default GroupInfoScreen;
