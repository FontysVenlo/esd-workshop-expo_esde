import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        setLoading(false);
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLoading(false);
    }

    getCurrentLocation();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Waiting for location...</Text>
      </View>
    );
  }

  const { latitude, longitude } = location.coords;

  // Generate HTML for an interactive map using Leaflet (open source)
  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { margin: 0; padding: 0; }
        #map { height: 100vh; width: 100vw; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map').setView([${latitude}, ${longitude}], 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);
        
        var marker = L.marker([${latitude}, ${longitude}]).addTo(map);
        marker.bindPopup("<b>You are here!</b><br>Lat: ${latitude.toFixed(6)}<br>Lon: ${longitude.toFixed(6)}").openPopup();
        
        // Blue circle showing accuracy
        L.circle([${latitude}, ${longitude}], {
          color: '#007AFF',
          fillColor: '#007AFF',
          fillOpacity: 0.2,
          radius: ${location.coords.accuracy || 50}
        }).addTo(map);
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        style={styles.map}
        originWhitelist={['*']}
        source={{ html: mapHtml }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Your Location</Text>
        <Text style={styles.infoText}>
          Latitude: {latitude.toFixed(6)}
        </Text>
        <Text style={styles.infoText}>
          Longitude: {longitude.toFixed(6)}
        </Text>
        <Text style={styles.infoText}>
          Accuracy: ±{location.coords.accuracy?.toFixed(0)}m
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});
