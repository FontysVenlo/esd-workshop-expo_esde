import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Magnetometer } from 'expo-sensors';

export default function CompassScreen() {
  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  const [heading, setHeading] = useState(0);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometerData(data);
        
        let angle = 0;
        if (data.y !== 0 || data.x !== 0) {
          angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
          
          if (angle < 0) {
            angle = 360 + angle;
          }
          
          angle = (270 - angle) % 360;
        }
        
        setHeading(Math.round(angle));
      })
    );
    
    Magnetometer.setUpdateInterval(100);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const getDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(((degrees % 360) / 45)) % 8;
    return directions[index];
  };

  const getDirectionName = (degrees: number) => {
    const directions = [
      'North', 'Northeast', 'East', 'Southeast',
      'South', 'Southwest', 'West', 'Northwest'
    ];
    const index = Math.round(((degrees % 360) / 45)) % 8;
    return directions[index];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compass</Text>
      
      <View style={styles.compassContainer}>
        <View 
          style={[
            styles.compass,
            { transform: [{ rotate: `-${heading}deg` }] }
          ]}
        >
          <Text style={[styles.direction, styles.north]}>N</Text>
          <Text style={[styles.direction, styles.east]}>E</Text>
          <Text style={[styles.direction, styles.south]}>S</Text>
          <Text style={[styles.direction, styles.west]}>W</Text>
          
          <View style={styles.needle}>
            <View style={styles.needleNorth} />
            <View style={styles.needleSouth} />
          </View>
          
          {[...Array(36)].map((_, i) => {
            const angle = i * 10;
            const isMainDirection = angle % 90 === 0;
            return (
              <View
                key={i}
                style={[
                  styles.marker,
                  {
                    transform: [
                      { rotate: `${angle}deg` },
                      { translateY: -140 }
                    ]
                  }
                ]}
              >
                <View 
                  style={[
                    styles.tick,
                    isMainDirection && styles.tickMain
                  ]} 
                />
              </View>
            );
          })}
        </View>
        
        <View style={styles.centerDot} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.headingDegrees}>{heading}°</Text>
        <Text style={styles.headingDirection}>{getDirectionName(heading)}</Text>
        <Text style={styles.headingShort}>{getDirection(heading)}</Text>
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.dataTitle}>Magnetometer Data:</Text>
        <Text style={styles.dataText}>
          X: {magnetometerData.x.toFixed(2)}
        </Text>
        <Text style={styles.dataText}>
          Y: {magnetometerData.y.toFixed(2)}
        </Text>
        <Text style={styles.dataText}>
          Z: {magnetometerData.z.toFixed(2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  compassContainer: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  compass: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#16213e',
    borderWidth: 4,
    borderColor: '#0f3460',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  direction: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  north: {
    top: 20,
    color: '#e94560',
  },
  east: {
    right: 20,
  },
  south: {
    bottom: 20,
  },
  west: {
    left: 20,
  },
  needle: {
    position: 'absolute',
    width: 4,
    height: 120,
    alignItems: 'center',
  },
  needleNorth: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 60,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#e94560',
  },
  needleSouth: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 60,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
  },
  marker: {
    position: 'absolute',
    width: 2,
    height: 300,
    alignItems: 'center',
  },
  tick: {
    width: 2,
    height: 8,
    backgroundColor: '#0f3460',
  },
  tickMain: {
    height: 15,
    width: 3,
    backgroundColor: '#e94560',
  },
  centerDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e94560',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headingDegrees: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#e94560',
  },
  headingDirection: {
    fontSize: 24,
    color: '#fff',
    marginTop: 8,
  },
  headingShort: {
    fontSize: 18,
    color: '#aaa',
    marginTop: 4,
  },
  dataContainer: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  dataTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 8,
  },
  dataText: {
    fontSize: 12,
    color: '#fff',
    marginVertical: 2,
  },
});
