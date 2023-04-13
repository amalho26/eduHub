import { StyleProp, Text, TextStyle, TouchableOpacity } from "react-native";
import { Color } from "../../theme";

interface TextButtonProps {
  onPress: () => void;
  title: string;
  style?: StyleProp<TextStyle>
}

const TextButton = (props: TextButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text
        style={[{
          fontWeight: "bold",
          color: Color.BUTTON_BACKGROUND_COLOR,
          marginBottom: 20,
          alignSelf: "flex-end",
        }, props.style]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
