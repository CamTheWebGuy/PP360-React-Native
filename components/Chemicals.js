import React, { useState } from 'react';
import { Text, Button } from 'galio-framework';
import SelectDropdown from 'react-native-select-dropdown';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from 'accordion-collapse-react-native';

const chlorineValues = [
  'No Tabs Used',
  '1 Tab (3 Inch)',
  '2 Tabs (3 Inch)',
  '3 Tabs (3 Inch)',
  '4 Tabs (3 Inch)',
  '5 Tabs (3 Inch)',
  '6 Tabs (3 Inch)',
  '7 Tabs (3 Inch)',
  '8 Tabs (3 Inch)',
  '9 Tabs (3 Inch)',
  '10 Tabs (3 Inch)',
  '15 Tabs (3 Inch)',
  '1 Tab (1 Inch)',
  '2 Tabs (1 Inch)',
  '3 Tabs (1 Inch)',
  '4 Tabs (1 Inch)',
  '5 Tabs (1 Inch)',
  '6 Tabs (1 Inch)',
  '7 Tabs (1 Inch)',
  '8 Tabs (1 Inch)',
  '9 Tabs (1 Inch)',
  '10 Tabs (1 Inch)',
  '15 Tabs (1 Inch)'
];

const liquidChlorine = [
  'No Liquid Chlorine Used',
  '1/8 Gallon',
  '1/4 Gallon',
  '1/3 Gallon',
  '1/2 Gallon',
  '2/3 Gallon',
  '3/4 Gallon',
  '1 Gallon',
  '1.5 Gallons',
  '2 Gallons',
  '2.5 Gallons',
  '3 Gallons',
  '3.5 Gallons',
  '4 Gallon',
  '5 Gallons',
  '6 Gallons',
  '7 Gallons',
  '8 Gallons',
  '9 Gallons',
  '10 Gallon',
  '11 Gallons',
  '12 Gallons',
  '13 Gallons',
  '14 Gallons',
  '15 Gallons',
  '16 Gallon',
  '17 Gallons',
  '18 Gallons',
  '19 Gallons',
  '20 Gallons',
  'Smaller Doses',
  '1/8 Cup',
  '1/4 Cup',
  '1/3 Cup',
  '1/2 Cup',
  '2/3 Cup',
  '3/4 Cup',
  '1 Cup',
  '1.5 Cups',
  '2 Cups',
  '2.5 Cups',
  '3 Cups',
  '3.5 Cups',
  '4 Cups',
  '4.5 Cups',
  '5 Cups',
  '6 Cups',
  '7 Cups',
  '8 Cups',
  '9 Cups',
  '10 Cups'
];

const liquidAcid = [
  'No Liquid Acid Used',
  '1/8 Gallon',
  '1/4 Gallon',
  '1/3 Gallon',
  '1/2 Gallon',
  '2/3 Gallon',
  '3/4 Gallon',
  '1 Gallon',
  '1.5 Gallons',
  '2 Gallons',
  '2.5 Gallons',
  '3 Gallons',
  '3.5 Gallons',
  '4 Gallon',
  '5 Gallons',
  '6 Gallons',
  '7 Gallons',
  '8 Gallons',
  '9 Gallons',
  '10 Gallon',
  '11 Gallons',
  '12 Gallons',
  '13 Gallons',
  '14 Gallons',
  '15 Gallons',
  '16 Gallon',
  '17 Gallons',
  '18 Gallons',
  '19 Gallons',
  '20 Gallons',
  'Smaller Doses',
  '1/8 Cup',
  '1/4 Cup',
  '1/3 Cup',
  '1/2 Cup',
  '2/3 Cup',
  '3/4 Cup',
  '1 Cup',
  '1.5 Cups',
  '2 Cups',
  '2.5 Cups',
  '3 Cups',
  '3.5 Cups',
  '4 Cups',
  '4.5 Cups',
  '5 Cups',
  '6 Cups',
  '7 Cups',
  '8 Cups',
  '9 Cups',
  '10 Cups',
  'In Ounces',
  '2 Ounces',
  '4 Ounces',
  '6 Ounces',
  '8 Ounces',
  '10 Ounces',
  '12 Ounces',
  '14 Ounces',
  '16 Ounces'
];

const triChlor = [
  'No TriChlor Added',
  'D.E. Scoop Measurement',
  '1/8 Scoop',
  '1/4 Scoop',
  '1/3 Scoop',
  '1/2 Scoop',
  '2/3 Scoop',
  '3/4 Scoop',
  '1 Full D.E. Scoop',
  '1.5 D.E. Scoops',
  '2 D.E. Scoops',
  '3 D.E. Scoops',
  '4 D.E. Scoops',
  '5 D.E. Scoops',
  'Ounces Measurement',
  '2 Ounces',
  '4 Ounces',
  '8 Ounces',
  '12 Ounces',
  '18 Ounces',
  '22 Ounces',
  '26 Ounces',
  '30 Ounces',
  '36 Ounces',
  'Pounds Measurement',
  '1/2 Pound',
  '1 Pound',
  '1.5 Pounds',
  '2 Pounds',
  '2.5 Pounds',
  '3 Pounds',
  '3.5 Pounds',
  '4 Pounds',
  '4.5 Pounds',
  '5 Pounds',
  '6 Pounds',
  '7 Pounds',
  '8 Pounds',
  '9 Pounds',
  '10 Pounds'
];

const diChlor = [
  'No DiChlor Added',
  'D.E. Scoop Measurement',
  '1/8 Scoop',
  '1/4 Scoop',
  '1/3 Scoop',
  '1/2 Scoop',
  '2/3 Scoop',
  '3/4 Scoop',
  '1 Full D.E. Scoop',
  '1.5 D.E. Scoops',
  '2 D.E. Scoops',
  '3 D.E. Scoops',
  '4 D.E. Scoops',
  '5 D.E. Scoops',
  'Ounces Measurement',
  '2 Ounces',
  '4 Ounces',
  '8 Ounces',
  '12 Ounces',
  '18 Ounces',
  '22 Ounces',
  '26 Ounces',
  '30 Ounces',
  '36 Ounces',
  'Pounds Measurement',
  '1/2 Pound',
  '1 Pound',
  '1.5 Pounds',
  '2 Pounds',
  '2.5 Pounds',
  '3 Pounds',
  '3.5 Pounds',
  '4 Pounds',
  '4.5 Pounds',
  '5 Pounds',
  '6 Pounds',
  '7 Pounds',
  '8 Pounds',
  '9 Pounds',
  '10 Pounds'
];

const calHypo = [
  'No CalHypo Added',
  'D.E. Scoop Measurement',
  '1/8 Scoop',
  '1/4 Scoop',
  '1/3 Scoop',
  '1/2 Scoop',
  '2/3 Scoop',
  '3/4 Scoop',
  '1 Full D.E. Scoop',
  '1.5 D.E. Scoops',
  '2 D.E. Scoops',
  '3 D.E. Scoops',
  '4 D.E. Scoops',
  '5 D.E. Scoops',
  'Ounces Measurement',
  '2 Ounces',
  '4 Ounces',
  '8 Ounces',
  '12 Ounces',
  '18 Ounces',
  '22 Ounces',
  '26 Ounces',
  '30 Ounces',
  '36 Ounces',
  'Pounds Measurement',
  '1/2 Pound',
  '1 Pound',
  '1.5 Pounds',
  '2 Pounds',
  '2.5 Pounds',
  '3 Pounds',
  '3.5 Pounds',
  '4 Pounds',
  '4.5 Pounds',
  '5 Pounds',
  '6 Pounds',
  '7 Pounds',
  '8 Pounds',
  '9 Pounds',
  '10 Pounds',
  '11 Pounds',
  '12 Pounds',
  '13 Pounds',
  '14 Pounds',
  '15 Pounds',
  '16 Pounds',
  '17 Pounds',
  '18 Pounds',
  '19 Pounds',
  '20 Pounds',
  '21 Pounds',
  '22 Pounds',
  '23 Pounds',
  '24 Pounds',
  '25 Pounds',
  '26 Pounds',
  '27 Pounds',
  '28 Pounds',
  '29 Pounds',
  '30 Pounds',
  '31 Pounds',
  '32 Pounds',
  '33 Pounds',
  '34 Pounds',
  '35 Pounds',
  '36 Pounds',
  '37 Pounds',
  '38 Pounds',
  '39 Pounds',
  '40 Pounds',
  '41 Pounds',
  '42 Pounds',
  '43 Pounds',
  '44 Pounds',
  '45 Pounds',
  '46 Pounds',
  '47 Pounds',
  '48 Pounds',
  '49 Pounds',
  '50 Pounds'
];

const nonChlorine = [
  'No Potassium Monopersulfate Added',
  'D.E. Scoop Measurement',
  '1/8 Scoop',
  '1/4 Scoop',
  '1/3 Scoop',
  '1/2 Scoop',
  '2/3 Scoop',
  '3/4 Scoop',
  '1 Full D.E. Scoop',
  '1.5 D.E. Scoops',
  '2 D.E. Scoops',
  '3 D.E. Scoops',
  '4 D.E. Scoops',
  '5 D.E. Scoops',
  'Ounces Measurement',
  '2 Ounces',
  '4 Ounces',
  '8 Ounces',
  '12 Ounces',
  '18 Ounces',
  '22 Ounces',
  '26 Ounces',
  '30 Ounces',
  '36 Ounces',
  'Pounds Measurement',
  '1/2 Pound',
  '1 Pound',
  '1.5 Pounds',
  '2 Pounds',
  '2.5 Pounds',
  '3 Pounds',
  '3.5 Pounds',
  '4 Pounds',
  '4.5 Pounds',
  '5 Pounds',
  '6 Pounds',
  '7 Pounds',
  '8 Pounds',
  '9 Pounds',
  '10 Pounds',
  '11 Pounds',
  '12 Pounds',
  '13 Pounds',
  '14 Pounds',
  '15 Pounds',
  '16 Pounds',
  '17 Pounds',
  '18 Pounds',
  '19 Pounds',
  '20 Pounds',
  '21 Pounds',
  '22 Pounds',
  '23 Pounds',
  '24 Pounds',
  '25 Pounds',
  '26 Pounds',
  '27 Pounds',
  '28 Pounds',
  '29 Pounds',
  '30 Pounds',
  '31 Pounds',
  '32 Pounds',
  '33 Pounds',
  '34 Pounds',
  '35 Pounds',
  '36 Pounds',
  '37 Pounds',
  '38 Pounds',
  '39 Pounds',
  '40 Pounds',
  '41 Pounds',
  '42 Pounds',
  '43 Pounds',
  '44 Pounds',
  '45 Pounds',
  '46 Pounds',
  '47 Pounds',
  '48 Pounds',
  '49 Pounds',
  '50 Pounds',
  'Cups Measurement',
  '1/8 Cup',
  '1/4 Cup',
  '1/3 Cup',
  '1/2 Cup',
  '2/3 Cup',
  '3/4 Cup',
  '1 Cup',
  '1.5 Cups',
  '2 Cups',
  '2.5 Cups',
  '3 Cups',
  '3.5 Cups',
  '4 Cups',
  '4.5 Cups',
  '5 Cups',
  '6 Cups',
  '7 Cups',
  '8 Cups',
  '9 Cups',
  '10 Cups',
  '11 Cups',
  '12 Cups'
];

const ammoniaBased = [
  'No Ammonia Algacide Added',
  '2 Ounces',
  '4 Ounces',
  '6 Ounces',
  '8 Ounces',
  '10 Ounces',
  '12 Ounces',
  '14 Ounces',
  '16 Ounces',
  '18 Ounces',
  '20 Ounces',
  '22 Ounces',
  '24 Ounces',
  '26 Ounces',
  '28 Ounces',
  '30 Ounces',
  '32 Ounces'
];

const copperBased = [
  'No Copper Algacide Added',
  '2 Ounces',
  '4 Ounces',
  '6 Ounces',
  '8 Ounces',
  '10 Ounces',
  '12 Ounces',
  '14 Ounces',
  '16 Ounces',
  '18 Ounces',
  '20 Ounces',
  '22 Ounces',
  '24 Ounces',
  '26 Ounces',
  '28 Ounces',
  '30 Ounces',
  '32 Ounces'
];

const polyQuatBased = [
  'No PolyQuat Algacide Added',
  '2 Ounces',
  '4 Ounces',
  '6 Ounces',
  '8 Ounces',
  '10 Ounces',
  '12 Ounces',
  '14 Ounces',
  '16 Ounces',
  '18 Ounces',
  '20 Ounces',
  '22 Ounces',
  '24 Ounces',
  '26 Ounces',
  '28 Ounces',
  '30 Ounces',
  '32 Ounces',
  '48 Ounces',
  '64 Ounces',
  '96 Ounces'
];

const copperBlend = [
  'No Copper/PolyQuat Blend Algacide Added',
  '2 Ounces',
  '4 Ounces',
  '6 Ounces',
  '8 Ounces',
  '10 Ounces',
  '12 Ounces',
  '14 Ounces',
  '16 Ounces',
  '18 Ounces',
  '20 Ounces',
  '22 Ounces',
  '24 Ounces',
  '26 Ounces',
  '28 Ounces',
  '30 Ounces',
  '32 Ounces',
  '48 Ounces',
  '64 Ounces',
  '96 Ounces'
];

const sodaAsh = [
  'No Soda Ash Added',
  'D.E. Scoop Measurement',
  '1/8 D.E. Scoop',
  '1/4 D.E. Scoop',
  '1/2 D.E. Scoop',
  '3/4 D.E. Scoop',
  '1 Full D.E. Scoop',
  '1.5 D.E. Scoops',
  '2 D.E. Scoops',
  '3 D.E. Scoops',
  '4 D.E. Scoops',
  '5 D.E. Scoops',
  'Ounces Measurement',
  '2 Ounces',
  '4 Ounces',
  '8 Ounces',
  '12 Ounces',
  '18 Ounces',
  '22 Ounces',
  '26 Ounces',
  '30 Ounces',
  '36 Ounces',
  'Pounds Measurement',
  '1/2 Pound',
  '1 Pound',
  '1.5 Pounds',
  '2 Pounds',
  '2.5 Pounds',
  '3 Pounds',
  '3.5 Pounds',
  '4 Pounds',
  '4.5 Pounds',
  '5 Pounds',
  '6 Pounds',
  '7 Pounds',
  '8 Pounds',
  '9 Pounds',
  '10 Pounds',
  'Cups Measurement',
  '1/8 Cup',
  '1/4 Cup',
  '1/3 Cup',
  '1/2 Cup',
  '2/3 Cup',
  '3/4 Cup',
  '1 Cup',
  '1.5 Cups',
  '2 Cups',
  '2.5 Cups',
  '3 Cups',
  '3.5 Cups',
  '4 Cups',
  '4.5 Cups',
  '5 Cups',
  '6 Cups',
  '7 Cups',
  '8 Cups',
  '9 Cups',
  '10 Cups',
  '11 Cups',
  '12 Cups'
];

const calciumChloride = [
  'No Calcium Chloride Added',
  'D.E. Scoop Measurement',
  '1/8 D.E. Scoop',
  '1/4 D.E. Scoop',
  '1/2 D.E. Scoop',
  '3/4 D.E. Scoop',
  '1 Full D.E. Scoop',
  '1.5 D.E. Scoops',
  '2 D.E. Scoops',
  '3 D.E. Scoops',
  '4 D.E. Scoops',
  '5 D.E. Scoops',
  'Ounces Measurement',
  '2 Ounces',
  '4 Ounces',
  '8 Ounces',
  '12 Ounces',
  '18 Ounces',
  '22 Ounces',
  '26 Ounces',
  '30 Ounces',
  '36 Ounces',
  'Pounds Measurement',
  '1/2 Pound',
  '1 Pound',
  '1.5 Pounds',
  '2 Pounds',
  '2.5 Pounds',
  '3 Pounds',
  '3.5 Pounds',
  '4 Pounds',
  '4.5 Pounds',
  '5 Pounds',
  '6 Pounds',
  '7 Pounds',
  '8 Pounds',
  '9 Pounds',
  '10 Pounds',
  'Cups Measurement',
  '1/8 Cup',
  '1/4 Cup',
  '1/3 Cup',
  '1/2 Cup',
  '2/3 Cup',
  '3/4 Cup',
  '1 Cup',
  '1.5 Cups',
  '2 Cups',
  '2.5 Cups',
  '3 Cups',
  '3.5 Cups',
  '4 Cups',
  '4.5 Cups',
  '5 Cups',
  '6 Cups',
  '7 Cups',
  '8 Cups',
  '9 Cups',
  '10 Cups',
  '11 Cups',
  '12 Cups'
];

const conditioner = [
  'No Conditioner Added',
  'D.E. Scoop Measurement',
  '1/8 D.E. Scoop',
  '1/4 D.E. Scoop',
  '1/2 D.E. Scoop',
  '3/4 D.E. Scoop',
  '1 Full D.E. Scoop',
  '1.5 D.E. Scoops',
  '2 D.E. Scoops',
  '3 D.E. Scoops',
  '4 D.E. Scoops',
  '5 D.E. Scoops',
  'Ounces Measurement',
  '2 Ounces',
  '4 Ounces',
  '8 Ounces',
  '12 Ounces',
  '18 Ounces',
  '22 Ounces',
  '26 Ounces',
  '30 Ounces',
  '36 Ounces',
  'Pounds Measurement',
  '1/2 Pound',
  '1 Pound',
  '1.5 Pounds',
  '2 Pounds',
  '2.5 Pounds',
  '3 Pounds',
  '3.5 Pounds',
  '4 Pounds',
  '4.5 Pounds',
  '5 Pounds',
  '6 Pounds',
  '7 Pounds',
  '8 Pounds',
  '9 Pounds',
  '10 Pounds',
  'Cups Measurement',
  '1/8 Cup',
  '1/4 Cup',
  '1/3 Cup',
  '1/2 Cup',
  '2/3 Cup',
  '3/4 Cup',
  '1 Cup',
  '1.5 Cups',
  '2 Cups',
  '2.5 Cups',
  '3 Cups',
  '3.5 Cups',
  '4 Cups',
  '4.5 Cups',
  '5 Cups',
  '6 Cups',
  '7 Cups',
  '8 Cups',
  '9 Cups',
  '10 Cups',
  '11 Cups',
  '12 Cups'
];

const sodiumBicar = [
  'No Sodium Bicarbonate Added',
  'D.E. Scoop Measurement',
  '1/8 D.E. Scoop',
  '1/4 D.E. Scoop',
  '1/2 D.E. Scoop',
  '3/4 D.E. Scoop',
  '1 Full D.E. Scoop',
  '1.5 D.E. Scoops',
  '2 D.E. Scoops',
  '3 D.E. Scoops',
  '4 D.E. Scoops',
  '5 D.E. Scoops',
  'Ounces Measurement',
  '2 Ounces',
  '4 Ounces',
  '8 Ounces',
  '12 Ounces',
  '18 Ounces',
  '22 Ounces',
  '26 Ounces',
  '30 Ounces',
  '36 Ounces',
  'Pounds Measurement',
  '1/2 Pound',
  '1 Pound',
  '1.5 Pounds',
  '2 Pounds',
  '2.5 Pounds',
  '3 Pounds',
  '3.5 Pounds',
  '4 Pounds',
  '4.5 Pounds',
  '5 Pounds',
  '6 Pounds',
  '7 Pounds',
  '8 Pounds',
  '9 Pounds',
  '10 Pounds',
  'Cups Measurement',
  '1/8 Cup',
  '1/4 Cup',
  '1/3 Cup',
  '1/2 Cup',
  '2/3 Cup',
  '3/4 Cup',
  '1 Cup',
  '1.5 Cups',
  '2 Cups',
  '2.5 Cups',
  '3 Cups',
  '3.5 Cups',
  '4 Cups',
  '4.5 Cups',
  '5 Cups',
  '6 Cups',
  '7 Cups',
  '8 Cups',
  '9 Cups',
  '10 Cups',
  '11 Cups',
  '12 Cups'
];

const diatomaceous = [
  'No Diatomaceous Earth Added',
  'D.E. Scoop Measurement',
  '1/8 D.E. Scoop',
  '1/4 D.E. Scoop',
  '1/2 D.E. Scoop',
  '3/4 D.E. Scoop',
  '1 Full D.E. Scoop',
  '1.5 D.E. Scoops',
  '2 D.E. Scoops',
  '3 D.E. Scoops',
  '4 D.E. Scoops',
  '5 D.E. Scoops',
  'Ounces Measurement',
  '2 Ounces',
  '4 Ounces',
  '8 Ounces',
  '12 Ounces',
  '18 Ounces',
  '22 Ounces',
  '26 Ounces',
  '30 Ounces',
  '36 Ounces',
  'Pounds Measurement',
  '1/2 Pound',
  '1 Pound',
  '1.5 Pounds',
  '2 Pounds',
  '2.5 Pounds',
  '3 Pounds',
  '3.5 Pounds',
  '4 Pounds',
  '4.5 Pounds',
  '5 Pounds',
  '6 Pounds',
  '7 Pounds',
  '8 Pounds',
  '9 Pounds',
  '10 Pounds'
];

const diatomaceousAlt = [
  'No Diatomaceous Earth Alternative Added',
  'D.E. Scoop Measurement',
  '1/8 D.E. Scoop',
  '1/4 D.E. Scoop',
  '1/2 D.E. Scoop',
  '3/4 D.E. Scoop',
  '1 Full D.E. Scoop',
  '1.5 D.E. Scoops',
  '2 D.E. Scoops',
  '3 D.E. Scoops',
  '4 D.E. Scoops',
  '5 D.E. Scoops',
  'Ounces Measurement',
  '2 Ounces',
  '4 Ounces',
  '8 Ounces',
  '12 Ounces',
  '18 Ounces',
  '22 Ounces',
  '26 Ounces',
  '30 Ounces',
  '36 Ounces',
  'Pounds Measurement',
  '1/2 Pound',
  '1 Pound',
  '1.5 Pounds',
  '2 Pounds',
  '2.5 Pounds',
  '3 Pounds',
  '3.5 Pounds',
  '4 Pounds',
  '4.5 Pounds',
  '5 Pounds',
  '6 Pounds',
  '7 Pounds',
  '8 Pounds',
  '9 Pounds',
  '10 Pounds'
];

const sodiumBro = [
  'No Sodium Bromide Added',
  'D.E. Scoop Measurement',
  '1/8 D.E. Scoop',
  '1/4 D.E. Scoop',
  '1/2 D.E. Scoop',
  '3/4 D.E. Scoop',
  '1 Full D.E. Scoop',
  '1.5 D.E. Scoops',
  '2 D.E. Scoops',
  '3 D.E. Scoops',
  '4 D.E. Scoops',
  '5 D.E. Scoops',
  'Ounces Measurement',
  '2 Ounces',
  '4 Ounces',
  '8 Ounces',
  '12 Ounces',
  '18 Ounces',
  '22 Ounces',
  '26 Ounces',
  '30 Ounces',
  '36 Ounces',
  'Pounds Measurement',
  '1/2 Pound',
  '1 Pound',
  '1.5 Pounds',
  '2 Pounds',
  '2.5 Pounds',
  '3 Pounds',
  '3.5 Pounds',
  '4 Pounds',
  '4.5 Pounds',
  '5 Pounds',
  '6 Pounds',
  '7 Pounds',
  '8 Pounds',
  '9 Pounds',
  '10 Pounds'
];

const dryAcid = [
  'No Dry Acid Added',
  'D.E. Scoop Measurement',
  '1/8 D.E. Scoop',
  '1/4 D.E. Scoop',
  '1/2 D.E. Scoop',
  '3/4 D.E. Scoop',
  '1 Full D.E. Scoop',
  '1.5 D.E. Scoops',
  '2 D.E. Scoops',
  '3 D.E. Scoops',
  '4 D.E. Scoops',
  '5 D.E. Scoops',
  'Ounces Measurement',
  '2 Ounces',
  '4 Ounces',
  '8 Ounces',
  '12 Ounces',
  '18 Ounces',
  '22 Ounces',
  '26 Ounces',
  '30 Ounces',
  '36 Ounces',
  'Pounds Measurement',
  '1/2 Pound',
  '1 Pound',
  '1.5 Pounds',
  '2 Pounds',
  '2.5 Pounds',
  '3 Pounds',
  '3.5 Pounds',
  '4 Pounds',
  '4.5 Pounds',
  '5 Pounds',
  '6 Pounds',
  '7 Pounds',
  '8 Pounds',
  '9 Pounds',
  '10 Pounds'
];

const clarifier = [
  'No Clarifier Added',
  '2 Ounces',
  '4 Ounces',
  '6 Ounces',
  '8 Ounces',
  '10 Ounces',
  '12 Ounces',
  '14 Ounces',
  '16 Ounces',
  '18 Ounces',
  '20 Ounces',
  '22 Ounces',
  '24 Ounces',
  '26 Ounces',
  '28 Ounces',
  '30 Ounces',
  '32 Ounces',
  '48 Ounces',
  '64 Ounces',
  '96 Ounces'
];

const phosphate = [
  'No Phosphate Remover Added',
  '2 Ounces',
  '4 Ounces',
  '6 Ounces',
  '8 Ounces',
  '10 Ounces',
  '12 Ounces',
  '14 Ounces',
  '16 Ounces',
  '18 Ounces',
  '20 Ounces',
  '22 Ounces',
  '24 Ounces',
  '26 Ounces',
  '28 Ounces',
  '30 Ounces',
  '32 Ounces',
  '48 Ounces',
  '64 Ounces',
  '96 Ounces'
];

const salt = [
  'No Salt Added',
  '1 bag of Salt',
  '2 bags of Salt',
  '3 bags of Salt',
  '4 bags of Salt',
  '5 bags of Salt',
  '6 bags of Salt',
  '7 bags of Salt',
  '8 bags of Salt',
  '9 bags of Salt',
  '10 bags of Salt',
  '11 bags of Salt',
  '12 bags of Salt',
  '13 bags of Salt',
  '14 bags of Salt',
  '15 bags of Salt',
  '16 bags of Salt',
  '17 bags of Salt',
  '18 bags of Salt',
  '19 bags of Salt',
  '20 bags of Salt'
];

const poolEnzyme = [
  'No Pool Enzymes Added',
  '2 Ounces',
  '4 Ounces',
  '6 Ounces',
  '8 Ounces',
  '10 Ounces',
  '12 Ounces',
  '14 Ounces',
  '16 Ounces',
  '18 Ounces',
  '20 Ounces',
  '22 Ounces',
  '24 Ounces',
  '26 Ounces',
  '28 Ounces',
  '30 Ounces',
  '32 Ounces',
  '48 Ounces',
  '64 Ounces',
  '96 Ounces'
];

const metalSequester = [
  'No Sequestering Agent Added',
  '2 Ounces',
  '4 Ounces',
  '6 Ounces',
  '8 Ounces',
  '10 Ounces',
  '12 Ounces',
  '14 Ounces',
  '16 Ounces',
  '18 Ounces',
  '20 Ounces',
  '22 Ounces',
  '24 Ounces',
  '26 Ounces',
  '28 Ounces',
  '30 Ounces',
  '32 Ounces',
  '48 Ounces',
  '64 Ounces',
  '96 Ounces',
  '128 Ounces'
];

const broGran = [
  'No Bromine Granular Added',
  '2 Ounces',
  '4 Ounces',
  '6 Ounces',
  '8 Ounces',
  '10 Ounces',
  '12 Ounces',
  '14 Ounces',
  '16 Ounces',
  '18 Ounces',
  '20 Ounces',
  '22 Ounces',
  '24 Ounces',
  '26 Ounces',
  '28 Ounces',
  '30 Ounces',
  '32 Ounces',
  '48 Ounces',
  '64 Ounces',
  '96 Ounces',
  '128 Ounces'
];

const broTab = [
  'No Bromine Tablets Used',
  '1 Tab',
  '2 Tabs',
  '3 Tabs',
  '4 Tabs',
  '5 Tabs',
  '6 Tabs',
  '7 Tabs',
  '8 Tabs',
  '9 Tabs',
  '10 Tabs',
  '11 Tabs',
  '12 Tabs',
  '13 Tabs',
  '14 Tabs',
  '15 Tabs',
  '16 Tabs',
  '17 Tabs',
  '18 Tabs',
  '19 Tabs',
  '20 Tabs',
  '21 Tabs',
  '22 Tabs',
  '23 Tabs',
  '24 Tabs',
  '25 Tabs',
  '26 Tabs',
  '27 Tabs',
  '28 Tabs',
  '29 Tabs',
  '30 Tabs'
];

const poolFLocc = [
  'No Pool Flocculant Added',
  '2 Ounces',
  '4 Ounces',
  '6 Ounces',
  '8 Ounces',
  '10 Ounces',
  '12 Ounces',
  '14 Ounces',
  '16 Ounces',
  '18 Ounces',
  '20 Ounces',
  '22 Ounces',
  '24 Ounces',
  '26 Ounces',
  '28 Ounces',
  '30 Ounces',
  '32 Ounces',
  '48 Ounces',
  '64 Ounces',
  '96 Ounces',
  '128 Ounces'
];

const borate = [
  'No Borate Added',
  'D.E. Scoop Measurement',
  '1/8 D.E. Scoop',
  '1/4 D.E. Scoop',
  '1/2 D.E. Scoop',
  '3/4 D.E. Scoop',
  '1 Full D.E. Scoop',
  '1.5 D.E. Scoops',
  '2 D.E. Scoops',
  '3 D.E. Scoops',
  '4 D.E. Scoops',
  '5 D.E. Scoops',
  'Ounces Measurement',
  '2 Ounces',
  '4 Ounces',
  '8 Ounces',
  '12 Ounces',
  '18 Ounces',
  '22 Ounces',
  '26 Ounces',
  '30 Ounces',
  '36 Ounces',
  'Pounds Measurement',
  '1/2 Pound',
  '1 Pound',
  '1.5 Pounds',
  '2 Pounds',
  '2.5 Pounds',
  '3 Pounds',
  '3.5 Pounds',
  '4 Pounds',
  '4.5 Pounds',
  '5 Pounds',
  '6 Pounds',
  '7 Pounds',
  '8 Pounds',
  '9 Pounds',
  '10 Pounds',
  '11 Pounds',
  '12 Pounds',
  '13 Pounds',
  '14 Pounds',
  '15 Pounds',
  '16 Pounds',
  '17 Pounds',
  '18 Pounds',
  '19 Pounds',
  '20 Pounds',
  '21 Pounds',
  '22 Pounds',
  '23 Pounds',
  '24 Pounds',
  '25 Pounds',
  '26 Pounds',
  '27 Pounds',
  '28 Pounds',
  '29 Pounds',
  '30 Pounds',
  '31 Pounds',
  '32 Pounds',
  '33 Pounds',
  '34 Pounds',
  '35 Pounds',
  '36 Pounds',
  '37 Pounds',
  '38 Pounds',
  '39 Pounds',
  '40 Pounds',
  '41 Pounds',
  '42 Pounds',
  '43 Pounds',
  '44 Pounds',
  '45 Pounds',
  '46 Pounds',
  '47 Pounds',
  '48 Pounds',
  '49 Pounds',
  '50 Pounds',
  'Cups Measurement',
  '1/8 Cup',
  '1/4 Cup',
  '1/3 Cup',
  '1/2 Cup',
  '2/3 Cup',
  '3/4 Cup',
  '1 Cup',
  '1.5 Cups',
  '2 Cups',
  '2.5 Cups',
  '3 Cups',
  '3.5 Cups',
  '4 Cups',
  '4.5 Cups',
  '5 Cups',
  '6 Cups',
  '7 Cups',
  '8 Cups',
  '9 Cups',
  '10 Cups',
  '11 Cups',
  '12 Cups'
];

const Chemicals = ({
  setChemicalModal,
  setReadingsModal,
  setDetailsModal,
  setData,
  data
}) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.dropdownRow}>
        <Text style={styles.dropdownLabel}>Chlorine Tablets:</Text>
        <SelectDropdown
          data={chlorineValues}
          defaultButtonText='Select Value'
          onSelect={(selectedItem, index) => {
            setData({ ...data, chlorineTablets: selectedItem });
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
        <Text style={styles.dropdownLabel}>Liquid Chlorine:</Text>
        <SelectDropdown
          data={liquidChlorine}
          defaultButtonText='Select Value'
          onSelect={(selectedItem, index) => {
            setData({ ...data, liquidChlorine: selectedItem });
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
        <Text style={styles.dropdownLabel}>Liquid Acid:</Text>
        <SelectDropdown
          data={liquidAcid}
          defaultButtonText='Select Value'
          onSelect={(selectedItem, index) => {
            setData({ ...data, liquidAcid: selectedItem });
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
        <Collapse>
          <CollapseHeader>
            <View style={styles.customBtn}>
              <Text style={styles.customBtnText}>+ Add Shock</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={styles.dropdownRow}>
              <Text style={styles.dropdownLabel}>TriChlor Shock:</Text>
              <SelectDropdown
                data={triChlor}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, triChlor: selectedItem });
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
              <Text style={styles.dropdownLabel}>DiChlor Shock:</Text>
              <SelectDropdown
                data={diChlor}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, diChlor: selectedItem });
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
              <Text style={styles.dropdownLabel}>CalHypo Shock:</Text>
              <SelectDropdown
                data={calHypo}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, calHypo: selectedItem });
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
              <Text style={styles.dropdownLabel}>
                Non-Chlorine/Monopersulfate:
              </Text>
              <SelectDropdown
                data={nonChlorine}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, potassiumMono: selectedItem });
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
          </CollapseBody>
        </Collapse>
      </View>

      <View style={styles.dropdownRow}>
        <Collapse>
          <CollapseHeader>
            <View style={styles.customBtn}>
              <Text style={styles.customBtnText}>+ Add Algacide</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={styles.dropdownRow}>
              <Text style={styles.dropdownLabel}>Ammonia Based Algacide:</Text>
              <SelectDropdown
                data={ammoniaBased}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, ammonia: selectedItem });
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
              <Text style={styles.dropdownLabel}>Copper Based Algacide:</Text>
              <SelectDropdown
                data={copperBased}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, copperBased: selectedItem });
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
              <Text style={styles.dropdownLabel}>PolyQuat Based Algacide:</Text>
              <SelectDropdown
                data={polyQuatBased}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, polyQuat: selectedItem });
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
              <Text style={styles.dropdownLabel}>Copper/PolyQuat Blend:</Text>
              <SelectDropdown
                data={copperBlend}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, copperBlend: selectedItem });
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
          </CollapseBody>
        </Collapse>
      </View>

      <View style={styles.dropdownRow}>
        <Collapse>
          <CollapseHeader>
            <View style={styles.customBtn}>
              <Text style={styles.customBtnText}>+ Other Chems</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={styles.dropdownRow}>
              <Text style={styles.dropdownLabel}>
                Soda Ash (Sodium Carbonate):
              </Text>
              <SelectDropdown
                data={copperBlend}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, sodaAsh: selectedItem });
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
              <Text style={styles.dropdownLabel}>
                Calcium Chloride (Hardness+):
              </Text>
              <SelectDropdown
                data={calciumChloride}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, CalciumChloride: selectedItem });
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
              <Text style={styles.dropdownLabel}>
                Conditioner (Cyanuric Acid):
              </Text>
              <SelectDropdown
                data={conditioner}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, conditioner: selectedItem });
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
              <Text style={styles.dropdownLabel}>
                Sodium Bicarbonate (baking soda):
              </Text>
              <SelectDropdown
                data={sodiumBicar}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, sodiumBicar: selectedItem });
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
              <Text style={styles.dropdownLabel}>Diatomaceous Earth:</Text>
              <SelectDropdown
                data={diatomaceous}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, diatomaceous: selectedItem });
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
              <Text style={styles.dropdownLabel}>
                Diatomaceous Earth Alternative:
              </Text>
              <SelectDropdown
                data={diatomaceousAlt}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, diatomaceousAlt: selectedItem });
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
              <Text style={styles.dropdownLabel}>Sodium Bromide:</Text>
              <SelectDropdown
                data={sodiumBro}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, sodiumBro: selectedItem });
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
              <Text style={styles.dropdownLabel}>Dry Acid:</Text>
              <SelectDropdown
                data={dryAcid}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, dryAcid: selectedItem });
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
              <Text style={styles.dropdownLabel}>Clarifier:</Text>
              <SelectDropdown
                data={clarifier}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, clarifier: selectedItem });
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
              <Text style={styles.dropdownLabel}>Phosphate Remover:</Text>
              <SelectDropdown
                data={phosphate}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, phosphateRemover: selectedItem });
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
              <Text style={styles.dropdownLabel}>Salt:</Text>
              <SelectDropdown
                data={salt}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, salt: selectedItem });
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
              <Text style={styles.dropdownLabel}>Pool Enzymes:</Text>
              <SelectDropdown
                data={poolEnzyme}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, enzymes: selectedItem });
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
              <Text style={styles.dropdownLabel}>
                Metal Sequestering Agent:
              </Text>
              <SelectDropdown
                data={metalSequester}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, metalSequester: selectedItem });
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
              <Text style={styles.dropdownLabel}>Bromine Granular:</Text>
              <SelectDropdown
                data={broGran}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, bromineGran: selectedItem });
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
              <Text style={styles.dropdownLabel}>Bromine Tablets:</Text>
              <SelectDropdown
                data={broTab}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, bromineTab: selectedItem });
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
              <Text style={styles.dropdownLabel}>Pool Flocculant:</Text>
              <SelectDropdown
                data={poolFLocc}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, poolFlocc: selectedItem });
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
              <Text style={styles.dropdownLabel}>Borate:</Text>
              <SelectDropdown
                data={borate}
                defaultButtonText='Select Value'
                onSelect={(selectedItem, index) => {
                  setData({ ...data, borate: selectedItem });
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
          </CollapseBody>
        </Collapse>

        <View style={styles.dropdownRow}>
          <Button
            style={{
              width: '100%',
              backgroundColor: '#f7fafc'
            }}
            onPress={() => {
              setChemicalModal(false);
              setReadingsModal(true);
            }}
          >
            <Text style={{ color: 'black', fontFamily: 'roboto-bold' }}>
              Back
            </Text>
          </Button>
          <Button
            style={{ width: '100%', backgroundColor: '#219bea' }}
            onPress={() => {
              setChemicalModal(false);
              setDetailsModal(true);
            }}
          >
            <Text style={{ color: 'white', fontFamily: 'roboto-bold' }}>
              Next
            </Text>
          </Button>
        </View>
      </View>
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
  },
  customBtn: {
    backgroundColor: '#11cdef',
    minWidth: '50%',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 5
  },
  customBtnText: {
    color: 'white',
    fontFamily: 'roboto-bold',
    textAlign: 'center'
  }
});

export default Chemicals;
