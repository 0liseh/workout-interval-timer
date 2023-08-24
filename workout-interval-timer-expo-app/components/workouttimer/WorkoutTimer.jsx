import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, FlatList } from 'react-native';

const WorkoutTimer = () => {
  //Manages an array of timers that are displayed and updated.
  const [timers, setTimers] = useState([]);
  //Stores the name of a timer being added.
  const [timerName, setTimerName] = useState('');
  //Stores the name of a preset being saved.
  const [presetName, setPresetName] = useState('');
  //Manages whether the timers are currently running or paused.
  const [isRunning, setIsRunning] = useState(false);
  //Manages an array of preset configurations.
  const [presets, setPresets] = useState([]);

  //This effect is responsible for decrementing the seconds of each timer when the isRunning state is true. 
  //It uses a setInterval to update the timers every second. 
  //If isRunning is set to false, it clears the interval.
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

  //Toggles the isRunning state between true and false.
  const toggleTimer = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  //Resets the timers array to an empty array and sets isRunning to false.
  const resetTimer = () => {
    setTimers([]);
    setIsRunning(false);
  };

  //Adds a new timer object to the timers array. 
  const addTimer = (seconds) => {
    //It takes the seconds parameter, which specifies the duration of the timer, and associates it with the provided timerName.
    setTimers(prevTimers => [...prevTimers, { name: timerName, seconds }]);
    //After adding the timer, it clears the timerName state.
    setTimerName('');
  };

  //Saves the current configuration of timers as a preset. 
  //It creates a new preset object containing the presetName and a copy of the current timers array.
  //The new preset is then added to the presets array, and the presetName state is cleared.
  const savePreset = () => {
    const newPreset = { name: presetName, timers: [...timers] };
    setPresets(prevPresets => [...prevPresets, newPreset]);
    setPresetName('');
  };

  return (
    <View>
      {/* Maps through the timers array and displays the timer name and remaining seconds for each timer. */}
      {timers.map((timer, index) => (
        <Text key={index}>
          {timer.name} : {timer.seconds} seconds
        </Text>
      ))}

      {/* Provides a TextInput to input the timer name and buttons for toggling the timer's running state, resetting the timers, and adding a timer of 30 seconds. */}
      <TextInput
        placeholder="Timer Name"
        value={timerName}
        onChangeText={text => setTimerName(text)}
      />
      <Button title={isRunning ? 'Pause' : 'Start'} onPress={toggleTimer} />
      <Button title="Reset" onPress={resetTimer} />
      <Button title="Add Timer (30 seconds)" onPress={() => addTimer(30)} />

      {/* Offers another TextInput for inputting a preset name and a button to save the current configuration as a preset. */}
      <TextInput
        placeholder="Workout Name"
        value={presetName}
        onChangeText={text => setPresetName(text)}
      />
      <Button title="Save Workout Time Intervals" onPress={savePreset} />

      {/* Utilizes a FlatList to display saved presets as buttons. Pressing a preset button sets the timers to the configuration saved in that preset. */}
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