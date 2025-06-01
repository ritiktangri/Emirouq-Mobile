import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
// import {SvgXml} from 'react-native-svg';
import NetInfo from '@react-native-community/netinfo';
import { Button } from '../common/Button';

// import NoConnectionSVG from '../../../assets/noConnection.svg';
// import ServerError from '../../../assets/serverError.svg';

/*
  *   This is a simple Text Label with the Logo that will be used in many screens
  *   Component Props:
  **    
        - errorStatus (based on which error is to be displayed)
       
*/

function NoConnectionServerError(props: any) {
  return (
    <Modal
      testID="modal-no-connection-server-error"
      animationType="fade"
      transparent={false}
      visible={props.visible}>
      <View style={styles.mainView}>
        <Text style={styles.textHeading}>
          {props.errorStatus === 101 ? 'No Connection' : 'Error'}
        </Text>

        <Text style={styles.text}>
          {props.errorStatus === 101
            ? 'Please check the internet connection and try again'
            : 'Something went wrong. Please try again'}
        </Text>
        <View style={styles.centeredView}>
          {/* <SvgXml
            xml={
              props.errorStatus === errorCodes.NO_CONNECTION
                ? NoConnectionSVG
                : ServerError
            }
            width="60%"
          /> */}
        </View>
        <Button
          onPress={() => {
            if (props.errorStatus === 101) {
              NetInfo.fetch().then((state) => {
                if (state.isConnected) {
                  props.onButtonPress();
                }
              });
            } else {
              props.onButtonPress();
            }
          }}
          style={styles.bottomButton}>
          {props.errorStatus === 101 ? 'Try Again' : 'Go Back'}
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  centeredView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeading: {
    width: '80%',
    marginTop: 40,
    fontSize: 36,
  },
  text: {
    width: '80%',
    marginTop: 16,
    fontSize: 16,
  },
  bottomButton: {
    marginBottom: 40,
    width: '80%',
  },
});

export default NoConnectionServerError;
