import React, { useContext } from 'react';
import { useState } from "react";
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SetAppLocaleContext } from '../../locales/index'; 
import { AppDispatch, RootState } from "../../store";
import { decrement, incrementAsync } from "../../store/slice/counterSlice";

export default function Counter() {

  const count = useSelector((state: RootState) => state.counter.count);
  const [step, setStep] = useState('1');
  const dispatch = useDispatch<AppDispatch>();
  const intl = useIntl();
  const setAppLocale= useContext(SetAppLocaleContext);

  function dec() {
    dispatch(decrement());
  }

  function inc(s = 1) {
    dispatch({
      type: 'counter/increment',
      payload: {
        step: s,
      },
    });
  }

  function incAsync(s = 1) {
    dispatch(incrementAsync(s));
  }

  return (
    <View className="h-full justify-center items-center">
      <View className="flex-row items-center">
        <Button
          title='-'
          onPress={dec}
        />
        <Text
          className=' text-2xl'
        >
          {count}
        </Text>
        <Button
          title='+'
          onPress={() => {
            inc();
          }}
        />
      </View>
      <View className='flex-row items-center border-b-5'>
        <Text className=' text-2xl'>
          <FormattedMessage
            id='Step:'
          />
        </Text>
        <TextInput
          className='w-10 text-center text-2xl'
          value={step}
          onChangeText={(text) => {
            setStep(text);
          }}
        />
      </View>
      <Button
        title={intl.formatMessage({id: 'increment by step'})}
        onPress={() => {
          inc(Number(step) || 1);
        }}
      />
      <Button
        title={intl.formatMessage({id: 'increment async'})}
        onPress={() => {
          incAsync(Number(step) || 1);
        }}
      />
      <Button
        title={intl.formatMessage({id: 'change locale to id-ID'})}
        onPress={() => {
          if (setAppLocale) {
            setAppLocale('id-ID');
          }
        }}
      />
    </View>
  );
}
