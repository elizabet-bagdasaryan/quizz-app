import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import LottieView from "lottie-react-native";

interface Props {
  correctAnswerCount: number;
  questionsCount: number;
  openWelcome: () => void;
}

const Results: FC<Props> = ({
  correctAnswerCount,
  questionsCount,
  openWelcome,
}) => {
  const moreThanHalf = correctAnswerCount < questionsCount / 2;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {moreThanHalf ? "You can do better💪" : "Congrats🚀"}
      </Text>

      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        source={
          moreThanHalf
            ? require("../assets/support.json")
            : require("../assets/congrats.json")
        }
      />

      <Text style={styles.results}>
        You got {correctAnswerCount} questions right out of {questionsCount}{" "}
        questions
      </Text>

      <TouchableOpacity onPress={openWelcome}>
        <Text style={styles.homeButton}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  header: {
    textAlign: "center",
    fontSize: 30,
  },
  results: {
    paddingTop: 20,
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 20,
    position: "relative",
    bottom: 25,
  },
  homeButton: {
    fontSize: 20,
    color: "rgb(75, 179, 253)",
  },
});
