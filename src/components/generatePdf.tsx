import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function GeneratePDF() {
  const createPDF = async () => {
    try {
      let PDFOptions = {
        html: '<h1>Generate PDF!</h1>',
        fileName: 'file',
        directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
    } catch (error) {
      console.log('Failed to generate pdf');
    }
  };

  return (
    <SafeAreaView>
      <StatusBar
      //  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      // backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[{}, styles.container]}>
          <TouchableOpacity style={styles.button} onPress={createPDF}>
            <Text>Create PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: '#E9EBED',
    borderColor: '#f4f5f6',
    borderWidth: 1,
  },
});
