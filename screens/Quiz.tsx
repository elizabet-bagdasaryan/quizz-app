import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "native-base";
import RadioGroup from "../components/RadioGroup";
import RenderHTML from "react-native-render-html";

interface Props {
  questions: Question[];
  openWelcome: () => void;
  finish: (correctAnswerCount: number) => void;
}

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const screenWidth = Dimensions.get("screen").width;

const Quiz: FC<Props> = ({ questions, openWelcome, finish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const currentOptions = [
    currentQuestion?.correct_answer,
    ...currentQuestion?.incorrect_answers,
  ].sort();

  const getResults = () => {
    let correctAnswerCount = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        correctAnswerCount++;
      }
    });

    finish(correctAnswerCount);
    setAnswers({});
  };

  const oneQuestion = screenWidth / questions.length;
  const progressWidth = Math.round(oneQuestion * currentQuestionIndex);

  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {currentQuestionIndex + 1} / {questions.length}
        </Text>
      </View>

      <View
        style={{
          ...styles.progress,
          width: progressWidth,
        }}
      />

      <ScrollView style={styles.container}>
        <RenderHTML
          source={{
            html: currentQuestion.question,
          }}
          defaultTextProps={{ style: styles.question }}
        />

        <RadioGroup
          value={answers[currentQuestionIndex]}
          onChange={(value) => {
            setAnswers((currentAnswers) => ({
              ...currentAnswers,
              [currentQuestionIndex]: value,
            }));
          }}
          items={currentOptions.map((option) => ({
            label: option,
            value: option,
          }))}
        />
      </ScrollView>

      <View style={styles.footer}>
        {currentQuestionIndex === 0 ? (
          <View style={styles.actionButtonPlaceholder} />
        ) : (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setCurrentQuestionIndex((current) => current - 1)}
          >
            <ChevronLeftIcon size="8" color="#000" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={openWelcome}>
          <Text style={styles.homeButton}>Home</Text>
        </TouchableOpacity>

        {currentQuestionIndex === questions.length - 1 ? (
          <TouchableOpacity style={styles.actionButton} onPress={getResults}>
            <CheckIcon size="8" color="#10B981" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setCurrentQuestionIndex((current) => current + 1)}
          >
            <ChevronRightIcon size="8" color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    paddingVertical: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  question: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 30,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  actionButton: {
    height: 60,
    width: 60,
    borderWidth: 1,
    borderColor: "#bec3c9",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonPlaceholder: {
    height: 60,
    width: 60,
  },
  homeButton: {
    fontSize: 20,
    fontWeight: "bold",
  },
  progress: {
    backgroundColor: "red",
    height: 2,
    marginBottom: 20,
  },
});
