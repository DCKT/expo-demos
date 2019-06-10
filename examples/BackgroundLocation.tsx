import React from 'react'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { View, Text } from 'react-native'
import * as TaskManager from 'expo-task-manager'

TaskManager.defineTask('bg', ({ data: { locations }, error }) => {
  if (error) {
    console.log(error)
    return
  }
  console.log('Received new locations', locations)
})

export default function BackgroundLocation() {
  const [coords, setCoords] = React.useState(null)
  const [bgCoords, setBgCoords] = React.useState(null)

  React.useEffect(() => {
    Permissions.askAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status !== 'granted') {
          console.log('not granted')
        }

        Location.startLocationUpdatesAsync('bg', {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000
        })

        return Location.getCurrentPositionAsync({})
      })
      .then(location => {
        setCoords(location.coords)
      })
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>BackgroundLocation</Text>
      {coords ? (
        <Text>
          {coords.latitude} {coords.longitude}
        </Text>
      ) : null}

      {bgCoords ? (
        <Text>
          {bgCoords.latitude} {bgCoords.longitude}
        </Text>
      ) : null}
    </View>
  )
}
