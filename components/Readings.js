import React, { useState } from 'react';
import { Text, Button } from 'galio-framework';
import SelectDropdown from 'react-native-select-dropdown';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Readings = props => {
  const chlorineValues = [
    '0',
    '0.5',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '15',
    '20',
    '30'
  ];

  const phLevel = ['6.2', '6.8', '7.0', '7.4', '7.6', '7.8', '8.0', '8.4+'];

  const alkalinityReadings = [
    '0',
    '10',
    '20',
    '30',
    '40',
    '50',
    '60',
    '70',
    '80',
    '90',
    '100',
    '110',
    '120',
    '130',
    '140',
    '150',
    '160',
    '170',
    '180',
    '190',
    '200',
    '210',
    '220',
    '230',
    '240',
    '250',
    '300',
    '350',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '1000'
  ];

  const conditionerReadings = [
    'N/A',
    '0',
    '30',
    '40',
    '50',
    '60',
    '70',
    '80',
    '90',
    '100',
    '110',
    '120',
    '130',
    '140',
    '150',
    '175',
    '200',
    '225+'
  ];

  const hardnessReadings = [
    'N/A',
    '0',
    '10',
    '15',
    '20',
    '25',
    '30',
    '40',
    '50',
    '60',
    '70',
    '180',
    '90',
    '100',
    '110',
    '125',
    '150',
    '175',
    '200',
    '250',
    '300',
    '350',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '1000'
  ];

  const phosphateReadings = ['N/A', '0', '125', '250', '500', '700', '1000+'];

  const saltReadings = [
    'N/A',
    '0',
    '100',
    '150',
    '200',
    '250',
    '300',
    '350',
    '400',
    '450',
    '500',
    '550',
    '600',
    '650',
    '700',
    '750',
    '800',
    '850',
    '900',
    '1000',
    '1100',
    '1150',
    '1200',
    '1250',
    '1300',
    '1350',
    '1400',
    '1450',
    '1500',
    '1550',
    '1600',
    '1650',
    '1700',
    '1750',
    '1800',
    '1850',
    '1900',
    '1950',
    '2000',
    '2050',
    '2100',
    '2150',
    '2200',
    '2250',
    '2300',
    '2350',
    '2400',
    '2450',
    '2500',
    '2550',
    '2600',
    '2650',
    '2700',
    '2750',
    '2800',
    '2850',
    '2900',
    '2950',
    '3000',
    '3050',
    '3100',
    '3150',
    '3200',
    '3250',
    '3300',
    '3350',
    '3400',
    '3450',
    '3500',
    '3550',
    '3600',
    '3650',
    '3700',
    '3750',
    '3800',
    '3850',
    '3900',
    '3950',
    '4000',
    '4050',
    '4100',
    '4200',
    '4300',
    '4350',
    '4400',
    '4450',
    '4500',
    '4550',
    '4600',
    '4600',
    '4700',
    '4750',
    '4800',
    '4850',
    '4900',
    '4950',
    '5000',
    '5050',
    '5100',
    '5150',
    '5200',
    '5250',
    '5300',
    '5350',
    '5400',
    '5450',
    '5500',
    '5550',
    '5600',
    '5650',
    '5700',
    '5750',
    '5800',
    '5850',
    '5900',
    '5950',
    '6000'
  ];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.dropdownRow}>
        <Text style={styles.dropdownLabel}>Total Chlorine:</Text>
        <SelectDropdown
          data={chlorineValues}
          defaultButtonText='Select Value'
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            props.setData({ ...props.data, totalChlorine: selectedItem });
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>

      <View style={styles.dropdownRow}>
        <Text style={styles.dropdownLabel}>Free Chlorine:</Text>
        <SelectDropdown
          data={chlorineValues}
          defaultButtonText='Select Value'
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            props.setData({ ...props.data, freeChlorine: selectedItem });
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>

      <View style={styles.dropdownRow}>
        <Text style={styles.dropdownLabel}>PH Level:</Text>
        <SelectDropdown
          data={phLevel}
          defaultButtonText='Select Value'
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            props.setData({ ...props.data, pHlevel: selectedItem });
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>

      <View style={styles.dropdownRow}>
        <Text style={styles.dropdownLabel}>Alkalinity Level:</Text>
        <SelectDropdown
          data={alkalinityReadings}
          defaultButtonText='Select Value'
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            props.setData({ ...props.data, alkalinity: selectedItem });
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>

      <View style={styles.dropdownRow}>
        <Text style={styles.dropdownLabel}>Conditioner Level:</Text>
        <SelectDropdown
          data={conditionerReadings}
          defaultButtonText='Select Value'
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            props.setData({ ...props.data, conditionerLevel: selectedItem });
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>

      <View style={styles.dropdownRow}>
        <Text style={styles.dropdownLabel}>Hardness Level:</Text>
        <SelectDropdown
          data={hardnessReadings}
          defaultButtonText='Select Value'
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            props.setData({ ...props.data, hardness: selectedItem });
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>

      <View style={styles.dropdownRow}>
        <Text style={styles.dropdownLabel}>Phosphate Level:</Text>
        <SelectDropdown
          data={phosphateReadings}
          defaultButtonText='Select Value'
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            props.setData({ ...props.data, phosphateLevel: selectedItem });
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>

      <View style={styles.dropdownRow}>
        <Text style={styles.dropdownLabel}>Salt Level:</Text>
        <SelectDropdown
          data={saltReadings}
          defaultButtonText='Select Value'
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem, index);
            props.setData({ ...props.data, saltLevel: selectedItem });
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>
      <Button
        shadowless
        style={{
          width: '100%',
          marginHorizontal: 0,
          marginBottom: 80,
          backgroundColor: '#32aae4'
        }}
        onPress={() => {
          props.setReadingsModal(false);
          props.setChemicalModal(true);
        }}
      >
        Next
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdownRow: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15
  },
  dropdownLabel: {
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'roboto-bold'
  }
});

export default Readings;
