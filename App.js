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

 // Executa automaticamente a função carregarFilmes() na montagem do componente
 useEffect(() => {
  carregarFilmes();
}, []);

// Função para atualizar os dados (usada no "puxar para atualizar")
const atualizar = () => {
  setAtualizando(true);
  carregarFilmes();
};

// Caso ainda esteja carregando os dados, exibe o indicador de loading
if (carregando) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#e50914" /> {/* Spinner animado */}
      <Text style={styles.loadingText}>Carregando filmes...</Text>
    </View>
  );
}

// Caso ocorra erro, exibe uma mensagem e um botão para tentar novamente
if (erro) {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.errorText}>Erro ao carregar os dados 😞</Text>
      <TouchableOpacity style={styles.retryButton} onPress={carregarFilmes}>
        <Text style={styles.retryText}>Tentar novamente</Text>
      </TouchableOpacity>
    </View>
  );
}

// Caso os dados já tenham sido carregados com sucesso
return (
  <View style={styles.container}>
    <Text style={styles.header}>🎬 Filmes da Marvel</Text>

    {/* ScrollView para permitir rolagem dos cards */}
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={atualizando} onRefresh={atualizar} />
      } // Adiciona o gesto de "puxar para atualizar"
    >
      {/* Verifica se o array de filmes está vazio */}
      {filmes && filmes.length > 0 ? (
        filmes.map((item, index) => {
          // Verifica se as propriedades necessárias existem
          const valorArrecadacao = item.valorArrecadacao || 0;
          const linkPoster = item.linkPoster || "";
          const titulo = item.titulo || "Título não disponível";
          const franquia = item.franquia || "Franquia não disponível";
          const anoLancamento = item.anoLancamento || "Ano não disponível";

          // Formata o valor da bilheteria para o padrão brasileiro (R$ 1.000.000)
          const valorFormatado = Number(valorArrecadacao).toLocaleString("pt-BR");

          return (
            <View style={styles.card} key={index}>
              {/* Exibe o pôster do filme */}
              {linkPoster ? (
                <Image source={{ uri: linkPoster }} style={styles.image} />
              ) : (
                <Text style={styles.text}>Imagem não disponível</Text>
              )}

              {/* Exibe os textos com as informações do filme */}
              <Text style={styles.title}>{titulo}</Text>
              <Text style={styles.text}>Franquia: {franquia}</Text>
              <Text style={styles.text}>Ano: {anoLancamento}</Text>

              {/* Exibe a bilheteria formatada */}
              <Text style={styles.boxOffice}>
                Bilheteria: <Text style={styles.boxOfficeValue}>R$ {valorFormatado}</Text>
              </Text>
            </View>
          );
        })
      ) : (
        <Text style={styles.text}>Nenhum filme encontrado.</Text>
      )}
    </ScrollView>
  </View>
);