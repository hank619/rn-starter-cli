import React, { useContext } from 'react';
import { useState } from "react";
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SetAppLocaleContext } from '../../locales/index'; 
import { AppDispatch, RootState } from "../../store";
import { decrement, incrementAsync } from "../../store/slice/counterSlice";
import styles from './styles';

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
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button
          title='-'
          onPress={dec}
        />
        <Text
          style={{fontSize: 24,}}
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
      <View style={{flexDirection: 'row',}}>
        <Text style={{fontSize: 24}}>
          <FormattedMessage
            id='Step:'
          />
        </Text>
        <TextInput
          style={{width: 50, textAlign: 'center', fontSize: 24}}
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
