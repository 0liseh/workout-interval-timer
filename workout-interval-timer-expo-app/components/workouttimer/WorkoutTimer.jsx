import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList } from 'react-native';

const WorkoutTimer = () => {
  const [timers, setTimers] = useState([]);
  const [timerName, setTimerName] = useState('');
  const [presetName, setPresetName] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [presets, setPresets] = useState([]);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimers(prevTimers =>
          prevTimers.map(timer =>
            timer.seconds > 0 ? { ...timer, seconds: timer.seconds - 1 } : timer
          )
        );
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const resetTimer = () => {
    setTimers([]);
    setIsRunning(false);
  };

  const addTimer = (seconds) => {
    setTimers(prevTimers => [...prevTimers, { name: timerName, seconds }]);
    setTimerName('');
  };

  const savePreset = () => {
    const newPreset = { name: presetName, timers: [...timers] };
    setPresets(prevPresets => [...prevPresets, newPreset]);
    setPresetName('');
  };

  return (
    <View>
      {timers.map((timer, index) => (
        <Text key={index}>
          {timer.name} - {timer.seconds} seconds
        </Text>
      ))}
      <TextInput
        placeholder="Timer Name"
        value={timerName}
        onChangeText={text => setTimerName(text)}
      />
      <Button title={isRunning ? 'Pause' : 'Start'} onPress={toggleTimer} />
      <Button title="Reset" onPress={resetTimer} />
      <Button title="Add Timer (30 seconds)" onPress={() => addTimer(30)} />

      <TextInput
        placeholder="Preset Name"
        value={presetName}
        onChangeText={text => setPresetName(text)}
      />
      <Button title="Save Preset" onPress={savePreset} />

      <FlatList
        data={presets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => setTimers(item.timers)}
          />
        )}
      />
    </View>
  );
};

export default WorkoutTimer;