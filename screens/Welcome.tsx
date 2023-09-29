import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Select from "../components/Select";
import categories from "../categories";
import { Difficulty, Type } from "../App";
import { Button } from "native-base";

interface Props {
  category: string;
  setCategory: (value: string) => void;
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
  numberOfQuestions: string;
  setNumberOfQuestions: (value: string) => void;
  type: Type;
  setType: (value: Type) => void;
  startQuiz: () => void;
  isLoading: boolean;
}

const Welcome: FC<Props> = ({
  category,
  setCategory,
  difficulty,
  setDifficulty,
  numberOfQuestions,
  setNumberOfQuestions,
  type,
  setType,
  isLoading,
  startQuiz,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Quiz App!!!</Text>

      <Text style={styles.label}>Number of questions:</Text>
      <Select
        value={numberOfQuestions}
        onChange={setNumberOfQuestions}
        placeholder="Number of questions"
        items={new Array(50).fill("").map((_, index) => ({
          label: `${index + 1}`,
          value: `${index + 1}`,
        }))}
      />

      <Text style={styles.label}>Category:</Text>
      <Select
        value={category}
        onChange={setCategory}
        placeholder="Category"
        items={categories.map((category, i) => ({
          label: category,
          value: `${i + 9}`,
        }))}
      />

      <Text style={styles.label}>Type:</Text>
      <Select
        value={type}
        onChange={setType}
        placeholder="Type"
        items={[
          { label: "Multiple Choice", value: "multiple" },
          { label: "True / False", value: "boolean" },
        ]}
      />

      <Text style={styles.label}>Difficulty:</Text>
      <Select
        value={difficulty}
        onChange={setDifficulty}
        placeholder="Difficulty"
        items={[
          { label: "Easy", value: "easy" },
          { label: "Medium", value: "medium" },
          { label: "Hard", value: "hard" },
        ]}
      />

      <Button
        isLoading={isLoading}
        spinnerPlacement="end"
        style={styles.startButton}
        onPress={startQuiz}
        isLoadingText="Start the Quiz"
      >
        Start the Quiz
      </Button>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 35,
    textAlign: "center",
    marginVertical: 50,
  },
  startButton: {
    marginTop: 30,
  },
  label: {
    fontSize: 14,
  },
});
