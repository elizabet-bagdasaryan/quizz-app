import { NativeBaseProvider } from "native-base";
import { Alert, Platform, SafeAreaView, StyleSheet } from "react-native";
import { LogBox } from "react-native";
import Welcome from "./screens/Welcome";
import { useState } from "react";
import axios from "axios";
import Quiz from "./screens/Quiz";
import Results from "./screens/Results";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

export type Type = "multiple" | "boolean";
export type Difficulty = "easy" | "medium" | "hard";
export type Page = "welcome" | "quiz" | "results";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState("10");
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [type, setType] = useState<Type>("multiple");
  const [questions, setQuestions] = useState([]);

  const [page, setPage] = useState<Page>("welcome");

  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

  const startQuiz = () => {
    setLoading(true);
    axios
      .get(
        `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`
      )
      .then(function (response) {
        const questions = response.data.results;
        if (questions.length === 0) {
          return Alert.alert("No questions were found with these selection");
        }
        setQuestions(questions);
        setLoading(false);
        setPage("quiz");
      })
      .catch(function (error) {
        setLoading(false);
        Alert.alert("Error when getting questions", error.message);
      });
  };

  const finish = (score: number) => {
    setCorrectAnswerCount(score);
    setPage("results");
  };

  const getPage = () => {
    switch (page) {
      case "welcome":
        return (
          <Welcome
            category={category}
            setCategory={(value) => setCategory(value)}
            difficulty={difficulty}
            setDifficulty={(value) => setDifficulty(value)}
            numberOfQuestions={numberOfQuestions}
            setNumberOfQuestions={(value) => setNumberOfQuestions(value)}
            type={type}
            setType={(value) => setType(value)}
            startQuiz={startQuiz}
            isLoading={loading}
          />
        );
      case "quiz":
        return (
          <Quiz
            questions={questions}
            openWelcome={() => setPage("welcome")}
            finish={finish}
          />
        );
      case "results":
        return (
          <Results
            correctAnswerCount={correctAnswerCount}
            questionsCount={questions.length}
            openWelcome={() => setPage("welcome")}
          />
        );
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>{getPage()}</SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: Platform.OS === "android" ? 50 : 20,
  },
});
