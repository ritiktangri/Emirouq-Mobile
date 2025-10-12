import React, { useEffect, forwardRef } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Controller } from 'react-hook-form';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const YOUR_GOOGLE_PLACES_API_KEY = 'AIzaSyBjSzyTvFszRwMz8sV-xBzKPnLDchDOVHY';

const LocationInput = forwardRef(({ control }: any, ref: any) => {
  return (
    <View className="gap-1">
      <Text className="text-base font-semibold text-gray-800 dark:text-gray-200">Location</Text>
      <Controller
        control={control}
        name="location"
        rules={{
          validate: (value) => {
            if (!value || !value.placeId) {
              return 'Please select a valid location.';
            }
            return true;
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <>
              <GooglePlacesAutocomplete
                ref={ref}
                debounce={200}
                timeout={5000}
                minLength={2}
                predefinedPlaces={[]}
                nearbyPlacesAPI="GooglePlacesSearch"
                placeholder="Select location"
                listViewDisplayed="auto"
                keyboardShouldPersistTaps="handled"
                enablePoweredByContainer={false}
                isRowScrollable={false}
                fetchDetails={true}
                onPress={(data, details = null) => {
                  if (details) {
                    onChange({
                      name: data.description,
                      placeId: details.place_id,
                    });
                  } else {
                    onChange({
                      name: data.description,
                      placeId: data.place_id,
                    });
                  }
                }}
                query={{
                  key: YOUR_GOOGLE_PLACES_API_KEY,
                  language: 'en',
                }}
                textInputProps={{
                  onFocus: () => {},
                  onBlur: () => {},
                  onChangeText: (text) => {
                    if (value?.placeId && text !== value?.name) {
                      onChange({ name: text, placeId: null });
                    } else if (!text && value) {
                      onChange(null);
                    }
                  },
                  style: styles.textInput,
                  placeholderTextColor: '#A0A0A0',
                }}
                styles={{
                  container: styles.autocompleteContainer,
                  textInput: styles.textInput,
                  description: styles.description,
                  listView: styles.listView,
                  predefinedPlacesDescription: styles.predefinedPlacesDescription,
                  poweredContainer: styles.poweredContainer,
                }}
              />
              {error && (
                <Text className="mt-1 text-sm text-red-500 dark:text-red-400">{error.message}</Text>
              )}
            </>
          );
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  autocompleteContainer: {
    ...(Platform.OS === 'android' && { zIndex: 10, elevation: 10 }),
    ...(Platform.OS === 'ios' && { zIndex: 999 }),
  },
  textInput: {
    height: 44,
    color: '#333',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    width: '100%',
  },
  description: {
    fontWeight: 'bold',
    color: '#333',
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },

  listView: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginTop: 2,
    borderRadius: 6,
    position: 'absolute',
    top: 46,
    left: 0,
    right: 0,
    maxHeight: 200,
    zIndex: Platform.OS === 'ios' ? 1000 : undefined,
    ...(Platform.OS === 'android' && { elevation: 10, zIndex: 10 }),
  },
  poweredContainer: {},
});

export default LocationInput;
