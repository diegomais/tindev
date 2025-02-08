import React from "react";
import renderer from "react-test-renderer";

import SignInScreen from ".";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

describe("<SignInScreen />", () => {
  it("should has 3 children", () => {
    const tree = renderer.create(<SignInScreen />).toJSON();
    expect(tree.children.length).toBe(3);
  });
});
