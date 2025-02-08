import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import useAuth from "@/contexts/auth";
import { api } from "@/services/api";
import { getSocketInstance } from "@/services/socket";
import { styles as s } from "./styles";

interface DevType {
  _id: string;
  avatar: string;
  bio: string;
  name: string;
}

const MainScreen = () => {
  const { userId, signOut } = useAuth();
  const [devs, setDevs] = useState<DevType[]>([]);
  const [matchDev, setMatchDev] = useState<DevType | null>(null);

  useEffect(() => {
    api.get("/devs", { headers: { user: userId } }).then(({ data }) => {
      setDevs(data);
    });
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const socket = getSocketInstance(userId);
      socket.on("match", (dev) => {
        setMatchDev(dev);
      });
    }
  }, [userId]);

  const handleLike = useCallback(async () => {
    const [username, ...rest] = devs;
    if (username) {
      await api.post(`/devs/${username._id}/likes`, null, {
        headers: { user: userId },
      });
      setDevs(rest);
    }
  }, [userId]);

  const handleDislike = useCallback(async () => {
    const [username, ...rest] = devs;
    if (username) {
      await api.post(`/devs/${username._id}/dislikes`, null, {
        headers: { user: userId },
      });
      setDevs(rest);
    }
  }, [userId]);

  return (
    <SafeAreaView style={s.container}>
      <TouchableOpacity onPress={signOut}>
        <Image style={s.logo} source={require("@/assets/images/logo.png")} />
      </TouchableOpacity>

      <View style={s.cardsContainer}>
        {devs.map((dev, index) => (
          <View key={dev._id} style={[s.card, { zIndex: devs.length - index }]}>
            <Image style={s.avatar} source={{ uri: dev.avatar }} />

            <View style={s.footer}>
              <Text style={s.name}>{dev.name}</Text>
              <Text numberOfLines={3} style={s.bio}>
                {dev.bio}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={s.buttonsContainer}>
        <TouchableOpacity style={s.button} onPress={handleDislike}>
          <Image source={require("@/assets/images/dislike.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={s.button} onPress={handleLike}>
          <Image source={require("@/assets/images/like.png")} />
        </TouchableOpacity>
      </View>

      {matchDev && (
        <View style={[s.matchContainer, { zIndex: devs.length + 1 }]}>
          <Image
            style={s.matchImage}
            source={require("@/assets/images/its-a-match.png")}
          />
          <Image style={s.matchAvatar} source={{ uri: matchDev.avatar }} />

          <Text style={s.matchName}>{matchDev.name}</Text>
          <Text style={s.matchBio}>{matchDev.bio}</Text>

          <TouchableOpacity onPress={() => setMatchDev(null)}>
            <Text style={s.closeMatch}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
