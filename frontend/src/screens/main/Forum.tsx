import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import Header from "../../components/atom/Header";
import { Color } from "../../theme";
import { DEFAULT_PADDING } from "../../values";

interface ForumScreenProps {
  navigation: any;
}

const ForumScreen = (props: ForumScreenProps) => {
  const [posts, setPosts] = useState([]);

  async function fetchRedditHotPosts() {
    try {
      const response = await fetch(
        "https://www.reddit.com/r/uwo/hot/.json?count=20"
      );
      const data = await response.json();
      setPosts(data.data.children);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRedditHotPosts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.BACKGROUND_COLOR }}>
      <FlatList
        data={posts}
        renderItem={({ item, index }) => {
          console.log(item.data.author);
          return (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("ForumPost", {
                  id: item.data.id,
                  title: item.data.title,
                  author: item.data.author,
                  selftext: item.data.selftext,
                  created: item.data.created
                })
              }
            >
              <View
                style={{
                  paddingVertical: 20,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <Text
                  style={{
                    color: Color.TEXT_COLOR,
                    fontSize: 16,
                    marginBottom: 4,
                  }}
                >
                  {item.data.title}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "#9E6DF7", marginRight: 4 }}>
                    {item.data.author} •
                  </Text>
                  <Text style={{ color: "gray" }}>
                    {moment(item.data.created * 1000).format(
                      "YYYY-MM-DD H:mm A"
                    )}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        style={{
          flex: 1,
          paddingHorizontal: DEFAULT_PADDING,
        }}
      />
    </SafeAreaView>
  );
};

export default ForumScreen;
