import { Expo, ExpoPushToken } from 'expo-server-sdk';

const getValidTokens = (tokens: ExpoPushToken[]): ExpoPushToken[] => {
  const nonRepeatedTokens = [...new Set(tokens)];
  const validTokens = nonRepeatedTokens.filter(token => {
    return Expo.isExpoPushToken(token);
  });
  return validTokens;
};

export default getValidTokens;
