import { View, Text, ScrollView, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Href, router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import Swiper from 'react-native-swiper';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { routes } from '~/utils/routes';
const PreviewPost = () => {
  const { params } = useLocalSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const { width } = Dimensions.get('screen');
  let body = {
    condition: 'new',
    description:
      'Hi there ay description Hi there ay description Hi there ay description Hi there ay description Hi there ay description Hi there ay description Hi there ay description Hi there ay description Hi there ay description Hi there ay description Hi there ay description Hi there ay description Hi there ay description Hi there ay description',
    location: 'New York, NY',
    price: '5095',
    properties: [
      { name: 'Brand', value: 'SD' },
      { name: 'Model', value: 'SD' },
      { name: 'Condition', value: 'SD' },
      { name: 'Operating System', value: 'SD' },
      { name: 'Screen Size', value: 'S' },
      { name: 'Storage', value: 'SD' },
      { name: 'Network Type', value: 'SD' },
      { name: 'Seller Contact Info', value: 'SD' },
    ],
    subCategory: 'd01fdc77-174f-449a-b28d-ad9ed4e99638',
    timePeriod: '7 days',
    title: 'Nothing',
  };
  const ProductDetails = ({ productData }: any) => {
    const [images, setImages] = useState([
      'https://media.istockphoto.com/id/1436061606/photo/flying-colorful-womens-sneaker-isolated-on-white-background-fashionable-stylish-sports-shoe.jpg?s=612x612&w=0&k=20&c=2KKjX9tXo0ibmBaPlflnJNdtZ-J77wrprVStaPL2Gj4=',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8kCtzxFOS1QKoATEkQ91V6hBieEa4ZTKbITFh9cBCGTGO0xc2f68muywyosC9SkfcWrI&usqp=CAU',
      'https://worldbalance.com.ph/cdn/shop/files/WBBEATRIXLGRAY-BLUE_14.jpg?v=1737085372&width=1080',
    ]);

    return (
      <ScrollView className="flex-1 bg-white">
        <View className="bg-blue-50 p-3">
          <Text className="flex-row items-center text-sm text-blue-500">
            <AntDesign name="infocirlceo" size={12} color="gray" />
            This is how your ad will appear to buyers
          </Text>
        </View>
        <View className="p-4">
          {/* Image Swiper */}
          <View className="mb-4 h-64 overflow-hidden rounded-lg">
            <Swiper
              showsButtons={true}
              dotStyle={{
                backgroundColor: 'rgba(0,0,0,.2)',
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 3,
              }}
              activeDotStyle={{
                backgroundColor: '#007bff',
                width: 10,
                height: 10,
                borderRadius: 5,
                margin: 3,
              }}>
              {images.map((image: any, index: any) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={{ width: width - 32, height: 256 }}
                  resizeMode="cover"
                />
              ))}
            </Swiper>
          </View>

          {/* Title and Price */}
          <Text className="mb-2 text-2xl font-bold">${Number(productData.price)?.toFixed(2)}</Text>
          <Text className="mb-4 text-xl font-semibold">{productData.title}</Text>

          {/* Location and Condition */}
          <View className="mb-4 flex-row items-center gap-x-2">
            <Text className="text-gray-600">{`${productData.condition?.charAt(0)?.toUpperCase()}${productData.condition.slice(1)}`}</Text>
            <View className="h-1 w-1 rounded-full bg-gray-400" />
            <Text className="text-gray-600">{productData.category || 'N/A'}</Text>
            <View className="h-1 w-1 rounded-full bg-gray-400" />
            <Text className="text-gray-600">{productData.location}</Text>
            <View className="h-1 w-1 rounded-full bg-gray-400" />
            <Text className="text-gray-600">{productData.timePeriod}</Text>
          </View>

          {/* Description */}
          <View className="rounded-md bg-gray-50 p-2">
            <Text className="mb-2 text-lg">Description</Text>
            <Text className="mb-3 text-gray-700">
              {productData.description?.length > 80 && !isExpanded
                ? `${productData.description.slice(0, 80)}...`
                : productData.description}
            </Text>
            <Text
              className="text-primary"
              onPress={() => {
                setIsExpanded(!isExpanded);
              }}>
              {productData.description?.length > 80 && !isExpanded
                ? 'Read More'
                : productData.description?.length > 80
                  ? 'Read Less'
                  : ''}
            </Text>
          </View>

          {/* Properties */}
          {/* <Text className="mb-2 text-lg font-semibold">Properties:</Text>
          {productData.properties.map((property: any, index: any) => (
            <View key={index} className="mb-2 flex-row justify-between">
              <Text className="text-gray-600">{property.name}:</Text>
              <Text className="text-gray-800">{property.value}</Text>
            </View>
          ))} */}

          {/* Sub Category and Time Period
          <View className="mt-4">
            <Text className="text-gray-600">Sub Category: {productData.subCategory}</Text>
            <Text className="text-gray-600">Time Period: {productData.timePeriod}</Text>
          </View> */}

          {/* Add any other details if needed */}
          <View className="mt-4 w-full flex-row items-center rounded-md bg-gray-50 p-3">
            {/* Profile Image */}
            <View className="mr-3 h-16 w-16 overflow-hidden rounded-full">
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJv0Qn3rCm5JYUXMpQlekZ1n0NjVcCF5hrkA&s',
                }}
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>

            {/* User Details */}
            <View className="flex-1">
              <Text className="text-lg font-semibold">John Doe</Text>
              <View className="flex-row items-center">
                <FontAwesome name="star" size={14} color="#6B7280" />
                <Text className="ml-1 text-sm text-gray-500">4.9 • 127 reviews</Text>
              </View>
            </View>

            {/* Icons */}
            <View className="flex-row items-center gap-x-4">
              <TouchableOpacity onPress={() => {}} className="ml-2">
                <FontAwesome name="phone" size={24} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} className="ml-2">
                <FontAwesome name="comment-o" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/*Action buttons */}
          <View className="mt-4 flex flex-col gap-y-3">
            <Pressable
              className="flex-1 flex-row items-center justify-center gap-1 rounded-lg bg-primary py-4"
              // onPress={handleSubmit(onSubmit)}>
              onPress={() => {
                // router.push(routes.drawer.tabs.preview_post);
              }}>
              {/* {btnLoading ? <ActivityIndicator size="small" color={'white'} /> : <></>} */}
              <Text className="text-base font-semibold text-white">Confirm & Submit</Text>
            </Pressable>
            <Pressable
              className="flex-1 items-center rounded-lg bg-gray-100 py-4"
              onPress={() => router.push(routes.drawer.tabs.success_view as Href)}>
              <Text className="text-base font-semibold text-gray-700">Save as Draft</Text>
            </Pressable>
            <Pressable
              className="flex-1 items-center rounded-lg border-[1px] border-primary py-4"
              onPress={() => router.back()}>
              <Text className="text-base font-semibold text-primary">Edit</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    );
  };
  return (
    <View className="flex-1">
      <ProductDetails productData={body} />
    </View>
  );
};

export default PreviewPost;
