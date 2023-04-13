import React from "react";
import { Image, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";

interface AvatarProps {
  src: any;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const Avatar = ({ src, size, style }: AvatarProps) => {
  return (
    <View style={[{
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
    }, style]}>
      <Image
        style={{ width: '100%', height: '100%'}}
        source={src} 
      />
    </View>
  );
};

export default Avatar;
