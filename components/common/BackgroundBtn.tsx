import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface BackgroundBtnProps extends TouchableOpacityProps {
  children: string;
}

export default function BackgroundBtn({ children, style, ...props }: BackgroundBtnProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          backgroundColor: '#f5f5f5',
          padding: 10,
          borderRadius: 10,
        },
        style,
      ]}
    >
      <Text style={{
        fontFamily: "Jost_400Regular",
        fontSize: 20,
      }}>{children}</Text>
    </TouchableOpacity>
  )
}
