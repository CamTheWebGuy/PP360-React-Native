import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  FlatList,
  Alert,
  Image,
  Modal,
  TouchableOpacity
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Text, Input, Button } from 'galio-framework';

import SelectDropdown from 'react-native-select-dropdown';
import moment from 'moment';

import OpenMap from 'react-native-open-map';

import { GET_ROUTE_LIST, LOGOUT } from '../actions/types';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Readings from '../components/Readings';
import Chemicals from '../components/Chemicals';
import Details from '../components/Details';

const Dashboard = ({
  auth: { user, isAuthenticated, loading, token },
  customers: { routeList },
  navigation
}) => {
  const [isOnline, setIsOnline] = useState(false);
  const [serviceNotes, setServiceNotes] = useState(null);
  const [equipModal, setEquipModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [detailsModal, setDetailsModal] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   NetInfo.addEventListener(networkState => {
  //     console.log('Connection type - ', networkState.type);
  //     console.log('Is connected? - ', networkState.isConnected);
  //     setIsOnline(networkState.isConnected);
  //   });
  // }, []);

  const logoutHandler = () => {
    dispatch({ type: LOGOUT });
    navigation.navigate({
      routeName: 'Login'
    });
  };

  const [activeCustomer, setActiveCustomer] = useState(null);

  const renderEquip = item => (
    <View style={styles.equipRow}>
      <View style={styles.equipCustomItem}>
        <Text style={styles.equipItemHeading}>Category:</Text>
        <Text>{item.item.category}</Text>
      </View>
      <View style={styles.equipCustomItem}>
        <Text style={styles.equipItemHeading}>Make:</Text>
        <Text>{item.item.make}</Text>
      </View>
      <View style={styles.equipCustomItem}>
        <Text style={styles.equipItemHeading}>Model:</Text>
        <Text>{item.item.model}</Text>
      </View>
    </View>
  );

  const renderRouteItem = item => {
    return (
      <View style={styles.routeItem}>
        <View style={styles.badge}>
          <Text style={{ color: '#1AAE6F' }}>SERVICE CALL</Text>
        </View>
        <Text style={styles.routeItemText}>
          {item.item.customer.firstName} {item.item.customer.lastName}
        </Text>
        <Text style={styles.routeItemAddress}>
          {item.item.customer.serviceAddress}
        </Text>
        <View style={styles.btnRow}>
          <Button
            shadowless
            style={{ backgroundColor: '#46D27E' }}
            onPress={() => {
              NetInfo.fetch().then(async networkState => {
                if (networkState.isConnected) {
                  OpenMap.show({
                    latitude: item.item.customer.serviceLat,
                    longitude: item.item.customer.serviceLng,
                    title: `${item.item.customer.firstName} ${item.item.customer.lastName}`,
                    actionSheetTitle: 'Choose What GPS App To Use:'
                  });
                } else {
                  Alert.alert(
                    'Not Connected To Internet',
                    'PoolPro360 Cannot Pinpoint Your Location Without a Internet Connection.'
                  );
                }
              });
            }}
          >
            <Text style={styles.btnText}>GPS To Stop</Text>
          </Button>

          <Button shadowless style={{ backgroundColor: '#00B4EF' }}>
            <Text
              style={styles.btnText}
              onPress={async () => {
                setActiveCustomer(item.item.customer);

                const notes = await axios.get(
                  `https://poolpro360.com/api/customers/${item.item.customer._id}/serviceNotes`,
                  {
                    headers: {
                      'x-auth-token': token.token
                    }
                  }
                );

                setServiceNotes(
                  notes.data.filter(note => note.showDuringVisit === true)
                );
                setModalVisible(true);
              }}
            >
              Start Service
            </Text>
          </Button>
        </View>
      </View>
    );
  };

  const renderServiceChecklist = item => (
    <TouchableOpacity
      style={{ borderRadius: 5, overflow: 'hidden' }}
      onPress={() => {
        if (checkedItems.findIndex(list => list._id === item.item._id) >= 0) {
          // Remove item from list
          const newState = checkedItems.filter(
            list => list._id !== item.item._id
          );
          setCheckedItems(newState);
          return;
        }

        const newItem = {
          _id: item.item._id,
          item: item.item.item
        };

        setCheckedItems(prevState => [...prevState, newItem]);
      }}
    >
      <Text
        style={{
          color: 'white',
          backgroundColor:
            checkedItems.findIndex(list => list._id === item.item._id) >= 0
              ? 'green'
              : '#f5365c',
          padding: 15,
          marginVertical: 1,
          fontFamily: 'roboto-bold'
        }}
      >
        {item.item.item}
      </Text>
    </TouchableOpacity>
  );

  const renderServiceNotes = item => (
    <View style={styles.serviceListItem}>
      <Text>{item.item.content ? item.item.content : 'N/A'}</Text>
    </View>
  );

  const config = {
    headers: {
      'x-auth-token': token.token
    }
  };

  useEffect(() => {
    NetInfo.fetch().then(async networkState => {
      if (networkState.isConnected) {
        const routeList = await axios.get(
          `https://poolpro360.com/api/customers/route/${user._id}/Tuesday`,
          config
        );
        dispatch({
          type: GET_ROUTE_LIST,
          payload: routeList.data
        });
      }
    });
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [readingsModal, setReadingsModal] = useState(false);
  const [chemicalModal, setChemicalModal] = useState(false);

  return (
    <View styles={styles.routeContainer}>
      <Modal visible={modalVisible} animationType='slide'>
        {activeCustomer ? (
          <View style={{ paddingHorizontal: 30 }}>
            <ScrollView>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text h6 style={styles.modalHeadline}>
                  Service Info For: {activeCustomer.firstName}{' '}
                  {activeCustomer.lastName}
                </Text>
                <Button
                  style={{ marginTop: 25 }}
                  onlyIcon
                  icon='close'
                  iconFamily='antdesign'
                  iconSize={14}
                  color='#00B4EF'
                  iconColor='#fff'
                  onPress={() => setModalVisible(false)}
                ></Button>
              </View>
              <Text>Gate/Lock Code:</Text>
              <Text style={{ fontFamily: 'roboto-light' }}>
                {activeCustomer.gateCode ? activeCustomer.gateCode : 'N/A'}
              </Text>
              <Text style={{ paddingVertical: 10, fontSize: 16 }}>
                Service Notes:
              </Text>
              {!serviceNotes || serviceNotes === null ? (
                <Text>Loading Service Notes...</Text>
              ) : (
                <FlatList
                  nestedScrollEnabled
                  data={serviceNotes}
                  keyExtractor={item => item._id}
                  renderItem={renderServiceNotes}
                />
              )}
              <Text style={{ paddingVertical: 10, fontSize: 16 }}>
                Service Checklist:
              </Text>

              <FlatList
                nestedScrollEnabled
                data={activeCustomer.serviceChecklist}
                keyExtractor={item => item._id}
                renderItem={renderServiceChecklist}
              />
              <Button
                style={styles.equipmentBtn}
                shadowless
                onPress={() => {
                  setModalVisible(false);
                  setEquipModal(true);
                }}
              >
                View Equipment
              </Button>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1
                }}
              />
              <Button
                shadowless
                style={{
                  backgroundColor: '#fb6340',
                  width: '100%',
                  margin: 0,
                  marginTop: 20
                }}
              >
                Unable To Service
              </Button>
              <Button
                shadowless
                style={{
                  backgroundColor: '#32aae4',
                  width: '100%',
                  margin: 0,
                  marginTop: 10
                }}
                disabled={checkedItems.length === 0 ? true : false}
                onPress={() => {
                  setModalVisible(false);
                  setReadingsModal(true);
                }}
              >
                Log Service
              </Button>
              <Text style={{ textAlign: 'center', marginTop: 10 }} muted>
                Must have completed at least one item from service checklist.
              </Text>
            </ScrollView>
          </View>
        ) : (
          <Text>Loading Data...</Text>
        )}
      </Modal>

      <Modal visible={readingsModal} animationType='slide'>
        <Text
          h6
          style={{
            textAlign: 'center',
            marginVertical: 20,
            marginTop: Platform.OS === 'ios' ? 50 : 20
          }}
        >
          Readings:
        </Text>
        <Readings
          setReadingsModal={setReadingsModal}
          setChemicalModal={setChemicalModal}
        />
      </Modal>

      <Modal visible={chemicalModal}>
        <Text
          h6
          style={{
            textAlign: 'center',
            marginVertical: 20,
            marginTop: Platform.OS === 'ios' ? 50 : 20
          }}
        >
          Chemical Usage:
        </Text>
        <Chemicals
          setChemicalModal={setChemicalModal}
          setReadingsModal={setReadingsModal}
          setDetailsModal={setDetailsModal}
        />
      </Modal>

      <Modal visible={detailsModal}>
        <Text
          h6
          style={{
            textAlign: 'center',
            marginVertical: 20,
            marginTop: Platform.OS === 'ios' ? 50 : 20
          }}
        >
          Log Details:
        </Text>
        <Details
          setDetailsModal={setDetailsModal}
          setImagePicker={setImagePicker}
          imagePicker={imagePicker}
        />
      </Modal>

      <Modal visible={equipModal} animationType='slide'>
        {activeCustomer && (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.equipRow}>
              <Text h6 style={{ paddingLeft: 20 }}>
                Equipment Information:
              </Text>
            </View>
            <View style={styles.equipRow}>
              <View style={styles.equipItem}>
                <Text style={styles.equipItemHeading}>Pool Cleaner:</Text>
                <Text>
                  {activeCustomer.poolEquipment.cleanerMake}{' '}
                  {activeCustomer.poolEquipment.cleanerModel}
                </Text>
              </View>
              <View style={styles.equipItem}>
                <Text style={styles.equipItemHeading}>Filter:</Text>
                <Text>
                  {activeCustomer.poolEquipment.filterMake}{' '}
                  {activeCustomer.poolEquipment.filterModel}
                </Text>
              </View>
            </View>
            <View style={styles.equipRow}>
              <View style={styles.equipItem}>
                <Text style={styles.equipItemHeading}>Pool Heater:</Text>
                <Text>
                  {activeCustomer.poolEquipment.heaterMake}{' '}
                  {activeCustomer.poolEquipment.heaterModel}
                </Text>
              </View>
              <View style={styles.equipItem}>
                <Text style={styles.equipItemHeading}>Pump:</Text>
                <Text>
                  {activeCustomer.poolEquipment.pumpMake}{' '}
                  {activeCustomer.poolEquipment.pumpModel}
                </Text>
              </View>
            </View>

            <View style={styles.equipRow}>
              <View style={styles.equipItem}>
                <Text style={styles.equipItemHeading}>Pool Gallons:</Text>
                <Text>{activeCustomer.poolEquipment.poolGallons}</Text>
              </View>
              <View style={styles.equipItem}>
                <Text>Pool Type:</Text>
                <Text>{activeCustomer.poolEquipment.poolType}</Text>
              </View>
            </View>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1
              }}
            />

            <View style={{ padding: 20 }}>
              <Text h6>Other Equipment:</Text>
              <FlatList
                data={activeCustomer.poolEquipment.other}
                keyExtractor={(item, index) => item._id}
                renderItem={renderEquip}
              />
            </View>
            <Button
              style={{ width: '100%', margin: 0, backgroundColor: '#172b4d' }}
              shadowless
              onPress={() => {
                setEquipModal(false);
                setModalVisible(true);
              }}
            >
              Go Back
            </Button>
          </View>
        )}
      </Modal>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../images/logo.png')} />
        <Button
          onlyIcon
          shadowless
          icon='logout'
          iconFamily='MaterialIcons'
          iconSize={15}
          color='#00B4EF'
          iconColor='#fff'
          onPress={logoutHandler}
          style={{ marginTop: 20 }}
        >
          Logout
        </Button>
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 10
        }}
      >
        <View style={styles.dayOfWeekContainer}>
          <Text style={styles.dayOfWeekText}>
            {moment(Date.now()).format('dddd')}'s Route
          </Text>
        </View>
      </View>

      {/* <Text h2>Dashboard</Text>
      <Button onPress={logoutHandler}>Logout</Button> */}
      {/* <Text h6>{isOnline ? 'Online' : 'Offline'}</Text> */}
      <FlatList
        data={routeList}
        keyExtractor={(item, index) => item.customer._id}
        renderItem={renderRouteItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  routeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FE'
  },
  routeItem: {
    marginVertical: 10,
    backgroundColor: 'white',
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 5
  },
  routeItemText: {
    height: 30,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'roboto-bold',
    fontSize: 20
  },
  routeItemAddress: {
    height: 30,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'roboto-light'
  },
  btnRow: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    paddingTop: 40
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
    marginHorizontal: 50,
    marginTop: 10
  },
  btnText: {
    fontFamily: 'roboto-bold',
    color: 'white'
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    backgroundColor: '#B0EED3',
    paddingVertical: 5,
    marginBottom: 5
  },
  dayOfWeekContainer: {
    backgroundColor: '#00B4EF',
    width: '30%',
    borderRadius: 10
  },
  dayOfWeekText: {
    width: '100%',
    padding: 5,
    color: 'white',
    fontFamily: 'roboto-bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalHeadline: {
    textAlign: 'center',
    paddingVertical: 20,
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    fontFamily: 'roboto-bold'
  },
  serviceChecklistText: {
    color: 'white',
    backgroundColor: '#f5365c',
    padding: 15,
    marginVertical: 1,
    fontFamily: 'roboto-bold'
  },
  equipmentBtn: {
    backgroundColor: '#11cdef',
    width: '100%',
    marginHorizontal: 0,
    marginVertical: 20
  },
  serviceListItem: {
    borderColor: '#e9ecef',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 5
  },
  equipRow: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  equipItem: {
    paddingHorizontal: 20,
    width: '50%'
  },
  equipCustomItem: {
    width: '33.3%'
  },
  equipItemHeading: {
    fontFamily: 'roboto-bold'
  }
});

const mapStateToProps = state => ({
  auth: state.auth,
  customers: state.customers
});

export default connect(mapStateToProps, null)(Dashboard);
