/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren} from 'react';
// All of your regular imports
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const Scanner = () => {
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([
    BarcodeFormat.ALL_FORMATS, // You can only specify a particular format
  ]);

  const [barcode, setBarcode] = React.useState('');
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isScanned, setIsScanned] = React.useState(false);

  React.useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    setHasPermission(status === 'authorized');
  };

  React.useEffect(() => {
    toggleActiveState();
    return () => {
      barcodes;
    };
  }, [barcodes]);

  const toggleActiveState = async () => {
    if (barcodes && barcodes.length > 0 && isScanned === false) {
      setIsScanned(true);
      // setBarcode('');
      barcodes.forEach(async (scannedBarcode: any) => {
        if (scannedBarcode.rawValue !== '') {
          setBarcode(scannedBarcode.rawValue);
          setIsScanned(true);
          Alert.alert(scannedBarcode.rawValue);
        }
      });
    }
  };
  if (device == null)
    return (
      <View>
        <Text>No Device Found</Text>
      </View>
    );
  if (!hasPermission)
    return (
      <View>
        <Text>No Permision Found</Text>
      </View>
    );
  if (isScanned) {
    return (
      <View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            setIsScanned(false);
          }}>
          <Text style={styles.text}>Scan</Text>
        </TouchableHighlight>
      </View>
    );
  }
  return (
    device != null &&
    hasPermission && (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
        audio={false}
      />
    )
  );
};
export default Scanner;
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});