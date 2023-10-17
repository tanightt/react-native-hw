import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";

export const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const route = useRoute();
  console.log(location);
  useEffect(() => {
    if (route.params) {
      setLocation(route.params.location);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }
            : null
        }
      >
        {location && <Marker title="Post location" coordinate={location} />}
      </MapView>
    </View>
  );
};

const screenSize = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: screenSize.height,
    width: screenSize.width,
  },
});
