/**
 * @format
 */

import 'react-native';
import * as React from "react";
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import App from '../App';

test('App renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});