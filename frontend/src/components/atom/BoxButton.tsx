import React from "react";
import { StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import { Color } from "../../theme";

interface BoxButtonProps {
  isDisabled: boolean;
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
}

const BoxButton = (props: BoxButtonProps) => {
  return (
    <TouchableOpacity
      disabled={props.isDisabled}
      onPress={props.onPress}
      style={[
        {
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          borderRadius: 8,
          backgroundColor: Color.BUTTON_BACKGROUND_COLOR,
          opacity: props.isDisabled ? 0.2 : 1,
        },
        props.style,
      ]}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: Color.BUTTON_TEXT_COLOR,
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default BoxButton;
