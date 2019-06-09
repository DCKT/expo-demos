import React from "react"
import { StyleSheet, Text, View } from "react-native"
import * as Brightness from "expo-brightness"
import Slider from "react-native-slider"

const useBrightness = () => {
  const [brightness, setBrightness] = React.useState(0.5)

  React.useEffect(() => {
    Brightness.getBrightnessAsync().then(setBrightness)
  }, [])

  React.useEffect(
    () => {
      Brightness.setBrightnessAsync(brightness)
    },
    [brightness]
  )

  return [brightness, setBrightness]
}

export default function Brightness() {
  const [brightness, setBrightness] = useBrightness()

  return (
    <View style={styles.container}>
      <Text>Brightness {brightness}</Text>
      <Slider
        value={brightness}
        onValueChange={setBrightness}
        step={0.1}
        style={{ width: 200 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
