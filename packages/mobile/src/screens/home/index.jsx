import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useAuth from '../../contexts/auth';
import api from '../../services/api';
import logo from '../../../assets/logo.png';
import like from '../../../assets/like.png';
import dislike from '../../../assets/dislike.png';
import itsAMatch from '../../../assets/its-a-match.png';
import styles from './styles';

export default function Main() {
  const [devs, setDevs] = useState([]);
  const [matchDev, setMatchDev] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    api.get('/devs', { headers: { user } }).then((response) => {
      setDevs(response.data);
    });
  }, [user]);

  const handleLike = useCallback(async () => {
    const [username, ...rest] = devs;
    if (username) {
      await api.post(`/devs/${username._id}/likes`, null, {
        headers: { user },
      });
      setDevs(rest);
    }
  }, []);

  const handleDislike = useCallback(async () => {
    const [username, ...rest] = devs;
    if (username) {
      await api.post(`/devs/${username._id}/dislikes`, null, {
        headers: { user },
      });
      setDevs(rest);
    }
  }, []);

  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <View style={styles.cardsContainer}>
        {devs.map((dev, index) => (
          <View
            key={dev._id}
            style={[styles.card, { zIndex: devs.length - index }]}>
            <Image style={styles.avatar} source={{ uri: dev.avatar }} />

            <View style={styles.footer}>
              <Text style={styles.name}>{dev.name}</Text>
              <Text numberOfLines={3} style={styles.bio}>
                {dev.bio}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDislike}>
          <Image source={dislike} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLike}>
          <Image source={like} />
        </TouchableOpacity>
      </View>

      {matchDev && (
        <View style={styles.matchContainer}>
          <Image style={styles.matchImage} source={itsAMatch} />
          <Image style={styles.matchAvatar} source={{ uri: matchDev.avatar }} />

          <Text style={styles.matchName}>{matchDev.name}</Text>
          <Text style={styles.matchBio}>{matchDev.bio}</Text>

          <TouchableOpacity onPress={() => setMatchDev(false)}>
            <Text style={styles.closeMatch}>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
