import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const WorkoutTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <View>
      <Text>{seconds} seconds</Text>
      <Button title={isRunning ? 'Pause' : 'Start'} onPress={toggleTimer} />
      <Button title="Reset" onPress={resetTimer} />
    </View>
  );
};

export default WorkoutTimer;
