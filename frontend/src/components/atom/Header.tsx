import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Color } from "../../theme";
import { DEFAULT_PADDING } from "../../values";

interface HeaderProps {
  hideBackButton: boolean;
  onPressBackButton: () => void;
}

const Header = (props: HeaderProps) => {
  return (
    <View
      style={{
        backgroundColor: Color.BACKGROUND_COLOR,
        height: 60,
        alignSelf: "stretch",
      }}
    >
      {props.hideBackButton ? null : (
        <TouchableOpacity
          onPress={props.onPressBackButton}
          style={{ width: 24, height: 24 }}
        >
          <Image source={require("../../../assets/back-button.png")} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
