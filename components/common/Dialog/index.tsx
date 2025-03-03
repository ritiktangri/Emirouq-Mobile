import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TooltipPopover from './animated-popover'; // Adjust path

const App = () => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const buttonRef = useRef(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsPopoverVisible(true)}
        ref={buttonRef} // Assign the ref to the button
      >
        <Text style={styles.buttonText}>Show Tooltip</Text>
      </TouchableOpacity>

      <TooltipPopover
        isVisible={isPopoverVisible}
        onClose={() => setIsPopoverVisible(false)}
        anchorRef={buttonRef} // Pass the ref to the TooltipPopover
        placement="bottom" // Adjust placement as needed
        backgroundColor="lightyellow"
        arrowColor="lightyellow">
        <Text>Tooltip Content</Text>
      </TooltipPopover>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default App;
