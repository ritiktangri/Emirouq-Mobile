import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function App() {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5, 6]?.map((i) => (
        <Image
          key={i}
          style={styles.image}
          source={
            i === 0
              ? 'https://c4.wallpaperflare.com/wallpaper/142/751/831/landscape-anime-digital-art-fantasy-art-wallpaper-preview.jpg'
              : 'https://picsum.photos/seed/696/3000/2000'
          }
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
});
