import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import tw from "twrnc";

const App = () => {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState("");
  const [secretNum, setSecretNum] = useState(generateRandomNumber());
  const [stepCount, setStepCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // Reset step count when the secret
    // number changes.
    setStepCount(0);
  }, [secretNum]);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
  }

  function handleChange(text) {
    setTerm(text);
  }

  function checkGuess() {
    let newResult = "";

    if (term === "") {
      newResult = "Enter Valid Input";
      setIsGameOver(false); // Hide text if the guess is incorrect
    } else if (isNaN(term) || parseInt(term) < 1 || parseInt(term) > 20) {
      newResult = "Enter a valid number between 1 and 20";
      setIsGameOver(false); // Hide text if the guess is incorrect
    } else {
      setStepCount(stepCount + 1);

      if (parseInt(term) < secretNum) {
        newResult = "Lower";
        setIsGameOver(false); // Hide text if the guess is incorrect
      } else if (parseInt(term) > secretNum) {
        newResult = "Higher";
        setIsGameOver(false); // Hide text if the guess is incorrect
      } else {
        newResult = `Yippee, correct! It took you ${stepCount + 1} ${
          stepCount === 0 ? "step" : "steps"
        }.`;

        // Generate new secret number
        const newSecretNum = generateRandomNumber();
        setSecretNum(newSecretNum);
        setIsGameOver(true); // Show text if the guess is correct
      }

      // Reset input field
      setTerm("");
    }

    setResult(newResult);
  }

  return (
    <KeyboardAvoidingView style={tw`flex bg-black w-full h-full`}>
      <View style={tw`flex items-center justify-center p-16 z-0`}>
        <Text style={tw`font-bold text-3xl mb-10 mt-20 text-white text-center`}>
          Guess Number between 1 to 20
        </Text>
        <TextInput
          style={tw`p-7 border border-[#ccc] w-[100%] mb-5 bg-black text-white font-bold text-xl rounded-2xl`}
          placeholder="Enter your guess"
          onChangeText={handleChange}
          value={term}
          keyboardType="numeric"
        />
        {
          // Show the secret number if the game is over
          isGameOver && (
            <Text style={tw`text-white text-base font-bold mb-5 text-center`}>
              Correct guess! Now guess the next number
            </Text>
          )
        }
        <TouchableOpacity
          style={tw`bg-[#007BFF] rounded-2xl py-5 px-20`}
          onPress={checkGuess}
        >
          <Text style={tw`text-white text-base font-bold`}>Check</Text>
        </TouchableOpacity>
        <Text style={tw`mt-5 text-base text-white font-bold text-center`}>
          You Guessed: {result}
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default App;
