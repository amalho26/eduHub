import moment from "moment";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { Color } from "../../theme";
import { DEFAULT_PADDING } from "../../values";

interface ForumPostScreenProps {
  navigation: any;
  route: {
    params: {
      id: string;
      title: string;
      author: string;
      selftext: string;
      created: number;
    };
  };
}

const ForumPostScreen = (props: ForumPostScreenProps) => {
  console.log(props.route.params.id);

  const [comments, setComments] = useState([]);

  async function fetchRedditComments() {
    try {
      const response = await fetch(
        `https://www.reddit.com/r/uwo/comments/${props.route.params.id}.json?count=20`
      );
      const data = await response.json();
      // console.log(data[0].data.children);
      // setComments(data.data.children);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRedditComments();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Color.BACKGROUND_COLOR }}>
      <View style={{ alignSelf: "stretch", padding: DEFAULT_PADDING }}>
        <View
          style={{
            paddingBottom: 20,
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: Color.TEXT_COLOR,
              marginBottom: 4,
            }}
          >
            {props.route.params.title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#9E6DF7", marginRight: 4 }}>
              {props.route.params.author} •
            </Text>
            <Text style={{ color: "gray" }}>
              {moment(props.route.params.created * 1000).format(
                "YYYY-MM-DD H:mm A"
              )}
            </Text>
          </View>
        </View>
        <View style={{ paddingVertical: DEFAULT_PADDING }}>
          <Text style={{ color: Color.TEXT_COLOR }}>
            {props.route.params.selftext}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForumPostScreen;
