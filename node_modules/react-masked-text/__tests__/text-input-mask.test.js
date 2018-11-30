// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import TextInputMask from '../src/text-input-mask'

test('TextInputMask renders uncontrolled component', () => {
  const component = renderer.create(
    <TextInputMask kind='cpf'/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextInputMask renders controlled component', () => {
  const value = '';
  const onChange = (val) => value = val;
  const component = renderer.create(
    <TextInputMask kind='cpf' onChangeText={onChange} value={value}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextInputMask renders controlled component with initial value', () => {
  const value = '223';
  const onChange = (val) => value = val;
  const component = renderer.create(
    <TextInputMask kind='cpf' onChangeText={onChange} value={value}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});