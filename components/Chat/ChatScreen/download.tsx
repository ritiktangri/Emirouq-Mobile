import { Button, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

export default function App() {
  const downloadFromUrl = async () => {
    const filename = 'small.mp4';
    const result = await FileSystem.downloadAsync(
      'http://techslides.com/demos/sample-videos/small.mp4',
      FileSystem.documentDirectory + filename
    );

    save(result.uri, filename, result.headers['Content-Type']);
  };

  const save = async (uri: any, filename: any, mimetype: any) => {
    if (Platform.OS === 'android') {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => {});
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  return <Button title="Download " onPress={downloadFromUrl} />;
}
