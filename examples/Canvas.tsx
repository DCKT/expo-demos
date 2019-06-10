import React from 'react'
import Expo2DContext from 'expo-2d-context'
import { GLView } from 'expo-gl'
import { Text, PanResponder, TouchableHighlight, Button, View, Image } from 'react-native'
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot'

const draw = context => {
  context.strokeStyle = '#df4b26'
  context.lineJoin = 'round'
  context.lineWidth = 5

  context.beginPath()

  context.closePath()
  context.stroke()
}

export default function Canvas() {
  const [ctx, setCtx] = React.useState(null)
  const [history, setHistory] = React.useState([])
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderMove: (event, gestureState) => {
          const [x, y] = [event.nativeEvent.pageX, event.nativeEvent.pageY]

          ctx.beginPath()
          ctx.fillStyle = 'black'
          ctx.arc(x, y, 8, 0, 2 * Math.PI)
          ctx.fill()
          ctx.flush()
        }
      }),
    [ctx]
  )

  const viewRef = React.useRef(null)

  return (
    <>
      <View style={{ flex: 0, marginTop: 30 }}>
        <Button
          onPress={() => {
            ctx.clearRect(0, 0, 2000, 2000)
            ctx.flush()
          }}
          title="CLEAR"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

        <Button
          onPress={() => {
            takeSnapshotAsync(viewRef.current, { result: 'base64' }).then(data => {
              setHistory([`data:image/png;base64,${data}`, ...history])
            })
          }}
          title="SAVE"
          color="#1CBED2"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      <GLView
        style={{ flex: 1 }}
        ref={viewRef}
        onContextCreate={gl => {
          const context = new Expo2DContext(gl)
          context.scale(2.2, 2.2)
          setCtx(context)
        }}
        {...panResponder.panHandlers}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          left: 0,
          width: '100%',
          paddingHorizontal: 30,
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        {history.map((uri, index) => (
          <Image
            key={index}
            style={{
              width: 70,
              height: 70,
              borderWidth: 1,
              borderColor: '#666',
              marginRight: 10,
              resizeMode: 'contain',
              borderRadius: 4
            }}
            source={{ uri }}
          />
        ))}
      </View>
    </>
  )
}
