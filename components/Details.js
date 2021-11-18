import React, { useState, useEffect } from 'react';
import { Text, Button, Input } from 'galio-framework';
import SelectDropdown from 'react-native-select-dropdown';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AssetsSelector } from 'expo-images-picker';
import { Ionicons } from '@expo/vector-icons';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

// import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';

const Details = ({
  setDetailsModal,
  setImagePicker,
  imagePicker,
  pictureData,
  setPictureData,
  addServiceLog,
}) => {
  const [imageState, setImageState] = useState(null);

  const onDone = (data) => {
    setImageState(data);
    setPictureData(data);
    setImagePicker(false);
    // console.log(data);
  };

  const goBack = () => {
    setImagePicker(false);
  };

  // const takePic = () => {
  //   ImagePicker.showImagePicker({}, (response) => {
  //     console.log(response);
  //   });
  // };

  return (
    <ScrollView style={{ flex: 1 }}>
      {imagePicker ? (
        <View>
          {/* {imageState !== null && (
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: imageState[0].uri }}
            />
          )} */}
          {/* <AssetsSelector
            options={{
              assetsType: ['photo', 'video'],
              maxSelections: 3,
              margin: 2,
              portraitCols: 4,
              landscapeCols: 5,
              widgetWidth: 100,
              widgetBgColor: 'white',
              videoIcon: {
                Component: Ionicons,
                iconName: 'ios-videocam',
                color: 'tomato',
                size: 20
              },
              selectedIcon: {
                Component: Ionicons,
                iconName: 'ios-checkmark-circle-outline',
                color: 'white',
                bg: '#0eb14970',
                size: 26
              },
              spinnerColor: 'black',
              onError: () => {},
              noAssets: () => <View></View>,
              defaultTopNavigator: {
                continueText: 'Finish',
                goBackText: 'Back',
                selectedText: 'Selected',
                midTextColor: 'tomato',
                buttonStyle: _buttonStyle,
                buttonTextStyle: _textStyle,
                backFunction: goBack,
                doneFunction: data => onDone(data)
              }
            }}
          /> */}
        </View>
      ) : (
        <View>
          <View style={styles.dropdownRow}>
            <Text>Log Images (Emailed To Customer)</Text>
            <Button style={{ backgroundColor: '#3f4257' }}>
              Choose Images
            </Button>
          </View>

          <View style={styles.dropdownRow}>
            <Text>Private Notes (Only Visible to Company)</Text>
            <Input placeholder='regular' />
          </View>

          <View style={styles.dropdownRow}>
            <Button
              style={{ backgroundColor: '#3f4257' }}
              onPress={() => {
                addServiceLog();
              }}
            >
              Complete Service
            </Button>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const _textStyle = {
  color: 'white',
};
const _buttonStyle = {
  backgroundColor: 'black',
  borderRadius: 18,
};

const styles = StyleSheet.create({
  dropdownRow: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  dropdownLabel: {
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'roboto-bold',
  },
  customBtn: {
    backgroundColor: '#11cdef',
    minWidth: '50%',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5,
  },
  customBtnText: {
    color: 'white',
    fontFamily: 'roboto-bold',
    textAlign: 'center',
  },
});

export default Details;
