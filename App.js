import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.fabiooliveira.cloud/api_aula/filmes/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "a8ea3f9c1e47b2d89f0d41b7f3c2d0c6",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#b30000" />
        <Text style={{ color: "#fff" }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filmes da Marvel</Text>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {games.map((item, index) => {
          // Formata o valor da bilheteria com separador de milhar
          const valorFormatado = Number(item.valorArrecadacao).toLocaleString(
            "pt-BR"
          );

          return (
            <View style={styles.card} key={index}>
              <Image source={{ uri: item.linkPoster }} style={styles.image} />

              <Text style={styles.title}>{item.titulo}</Text>
              <Text style={styles.text}>Franquia: {item.franquia}</Text>
              <Text style={styles.text}>Ano: {item.anoLancamento}</Text>
              <Text style={styles.boxOffice}>
                Bilheteria:{" "}
                <Text style={styles.boxOfficeValue}>R$ {valorFormatado}</Text>
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8B0000", // fundo vermelho escuro
    padding: 10,
  },
  header: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#8B0000",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    width: "47%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#8B0000",
  },
  image: {
    width: 120,
    height: 170,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  text: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
  boxOffice: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "bold",
  },
  boxOfficeValue: {
    color: "red",
  },
});
