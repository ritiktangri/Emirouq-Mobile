import React, { useRef, useEffect, forwardRef } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Controller } from 'react-hook-form';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import i18n from 'your-i18n-config'; // Your i18n instance
// import { YOUR_GOOGLE_PLACES_API_KEY } from 'your-env-variables'; // Make sure to import your API key securely

// For demonstration, let's mock i18n and API key

// !!! IMPORTANT: Replace this with your actual API key loaded from env variables !!!
const YOUR_GOOGLE_PLACES_API_KEY = 'AIzaSyBjSzyTvFszRwMz8sV-xBzKPnLDchDOVHY';

// Example of how you might pass control and errors (adjust to your actual component structure)
// const { control, formState: { errors } } = useForm({
//   defaultValues: {
//     location: null // or { name: '', placeId: '' }
//   }
// });
// const locale = 'left'; // example

const LocationInput = forwardRef(({ control, errors }: any, ref: any) => {
  // Expose the ref methods to parent
  // useImperativeHandle(ref, () => ({
  //   focus: () => {
  //     ref.current?.focus();
  //   },
  //   blur: () => {
  //     ref.current?.blur();
  //   },
  //   clear: () => {
  //     ref.current?.setAddressText('');
  //   },
  // }));

  return (
    <View className="mb-6">
      <Text className="mb-2 text-base font-semibold text-gray-800 dark:text-gray-200">
        Location
      </Text>
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
        render={({ field: { onChange, value } }) => {
          useEffect(() => {
            if (!value && ref.current) {
              ref.current.setAddressText('');
            } else if (value?.name && ref.current) {
              const currentText = ref.current.getAddressText();
              if (currentText !== value.name) {
                ref.current.setAddressText(value.name);
              }
            }
          }, [value]);

          return (
            <GooglePlacesAutocomplete
              ref={ref}
              nearbyPlacesAPI="GooglePlacesSearch"
              placeholder="Select location"
              listViewDisplayed="auto"
              keyboardShouldPersistTaps="handled"
              enablePoweredByContainer={false}
              isRowScrollable={false}
              minLength={2}
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
              debounce={200}
            />
          );
        }}
      />
      {errors.location && (
        <Text className="mt-1 text-sm text-red-500 dark:text-red-400">
          {errors.location.message}
        </Text>
      )}
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
