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

// Função para carregar os filmes da API
const carregarFilmes = async () => {
  try {
    setErro(false); // Reseta o estado de erro antes de tentar novamente
    // Faz a requisição HTTP para buscar os dados
    const resposta = await fetch("https://www.fabiooliveira.cloud/api_aula/filmes/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "a8ea3f9c1e47b2d89f0d41b7f3c2d0c6", // Chave de autorização exigida pela API
      },
    });

    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status} - ${resposta.statusText}`);
    }

    const dados = await resposta.json();
    console.log(dados); // Verifique os dados retornados
    setFilmes(dados); // Atualiza o estado com os filmes
  } catch (erro) {
    console.error("Erro ao carregar os filmes:", erro);
    setErro(true); // Define o estado de erro
  }
};

// Se a resposta não for bem-sucedida (status != 200), lança um erro
try {
  if (!resposta.ok) {
    console.error(`Erro HTTP: ${resposta.status} - ${resposta.statusText}`);
    throw new Error("Erro ao carregar dados da API");
  }

  // Tenta converter a resposta JSON
  const dados = await resposta.json();
  console.log("Dados recebidos da API:", dados); // Log para verificar os dados
  setFilmes(dados); // Atualiza o estado com os dados recebidos
} catch (err) {
  // Caso ocorra erro, exibe no console e marca o estado de erro
  console.error("Erro capturado:", err.message || err);
  setErro(true);
} finally {
  // Ao final, independentemente do resultado, desativa o loading e o refresh
  setCarregando(false);
  setAtualizando(false);
}