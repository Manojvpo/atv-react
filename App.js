// Importa os componentes e hooks do React e do React Native
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

// Componente principal do aplicativo
export default function App() {
  // Estados do aplicativo
  const [filmes, setFilmes] = useState([]); // Armazena a lista de filmes recebida da API
  const [carregando, setCarregando] = useState(true); // Indica se os dados ainda estão sendo carregados
  const [erro, setErro] = useState(false); // Indica se houve erro ao carregar
  const [atualizando, setAtualizando] = useState(false); // Indica se o usuário está atualizando via "pull to refresh"
}