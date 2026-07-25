import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Alert, Share } from 'react-native';

const isPreviewableMedia = (type?: string) =>
  Boolean(type) && ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4'].includes(type || '');

const sanitizeFileName = (name: string) =>
  name
    .replace(/[^\w.-]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '') || `attachment-${Date.now()}`;

export const downloadAttachment = async ({ uri, name, type }: any) => {
  if (!uri) return;

  const fileName = sanitizeFileName(name || uri.split('/').pop() || `attachment-${Date.now()}`);
  const localUri = `${FileSystem.cacheDirectory}${fileName}`;

  try {
    const downloaded = await FileSystem.downloadAsync(uri, localUri);

    if (isPreviewableMedia(type)) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await MediaLibrary.saveToLibraryAsync(downloaded.uri);
        Alert.alert('Saved', 'Attachment has been saved to your gallery.');
        return;
      }
    }

    await Share.share({
      url: downloaded.uri,
      title: fileName,
      message: 'Save this attachment',
    });
  } catch {
    Alert.alert('Download failed', 'Unable to download this attachment right now.');
  }
};
