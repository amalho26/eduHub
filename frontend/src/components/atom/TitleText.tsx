import { StyleProp, Text, TextStyle } from "react-native";
import { Color } from "../../theme";

interface TitleTextProps {
  children: any;
  style?: StyleProp<TextStyle>;
}

const TitleText = (props: TitleTextProps) => {
  return (
    <Text
      style={[
        { alignSelf: "stretch", fontSize: 32, color: Color.TEXT_COLOR },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};

export default TitleText;
