import React from "react";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";
import { findByDisplayValue } from "@testing-library/react";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, value) =>
  wrapper.find(`[data-test='${value}']`);

test("Renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("Renders counter display", () => {
  const wrapper = setup();
  const counterDisplayText = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplayText.length).toBe(1);
});

test("Counter display starts at 0", () => {
  const wrapper = setup();
  const counterDisplayValue = findByTestAttr(wrapper, "count").text();
  expect(counterDisplayValue).toBe("0");
});

test("Click button decrements counter display", () => {
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper, "increment-button");
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  const count = findByTestAttr(wrapper, "count").text();
  incrementButton.simulate("click");
  decrementButton.simulate("click");
  expect(count).toBe("0");
});

describe("Increment", () => {
  //now we have enough tests to organize by functions
  test("renders increment button", () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, "increment-button");
    expect(button.length).toBe(1);
  });

  test("Click button increments counter display", () => {
    const wrapper = setup();
    //find the button
    const button = findByTestAttr(wrapper, "increment-button");
    //click the button
    button.simulate("click");
    //find the display, and test that the number has been incremented
    const count = findByTestAttr(wrapper, "count").text();
    expect(count).toBe("1");
  });
});

describe("Decrement button", () => {
  test("Renders decrement button", () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, "decrement-button");
    expect(button.length).toBe(1);
  });

  test("Click decrement button will decrement display when the counter is greater than 0", () => {
    const wrapper = setup();
    // click the increment button so that the counter is greater than 0
    const incButton = findByTestAttr(wrapper, "increment-button");
    incButton.simulate("click");
    //find decrement button
    const decButton = findByTestAttr(wrapper, "decrement-button");
    decButton.simulate("click");
    const count = findByTestAttr(wrapper, "count").text();
    expect(count).toBe("0");
  });
});

describe("Error when counter goes below 0", () => {
  test("Error does not show when not needed", () => {
    const wrapper = setup();
    const alertMessage = findByTestAttr(wrapper, "alert-message");
    const errorHasHiddenClass = alertMessage.hasClass("hidden");
    expect(errorHasHiddenClass).toBe(true);
  });
});

describe("counter is 0 and decrement is clicked", () => {
  let wrapper;
  beforeEach(() => {
    // no need to set counter value here; default value of 0 is good
    wrapper = setup();
    //find button and click
    const button = findByTestAttr(wrapper, "decrement-button");
    button.simulate("click");
  });
  test("error shows", () => {
    //check the class of the error message
    const alertMessage = findByTestAttr(wrapper, "alert-message");
    const errorHasHiddenClass = alertMessage.hasClass("hidden");
    expect(errorHasHiddenClass).toBe(false);
  });
  test("counter still display 0", () => {
    const count = findByTestAttr(wrapper, "count").text();
    expect(count).toBe("0");
  });
  test("increment click clears the error", () => {
    const incButton = findByTestAttr(wrapper, "increment-button");
    incButton.simulate("click");
    const alertMessage = findByTestAttr(wrapper, "alert-message");
    const errorHasHiddenClass = alertMessage.hasClass("hidden");
    expect(errorHasHiddenClass).toBe(true);
  });
});
// test("If counter is greater than 0, a message is not displayed", () => {
//   const wrapper = setup();
//   const decrementButton = findByTestAttr(wrapper, "decrement-button");
//   const incrementButton = findByTestAttr(wrapper, "increment-button");
//   decrementButton.simulate("click");
//   const message = findByTestAttr(wrapper, "alert-message");
//   incrementButton.simulate("click");
//   expect(message.exists()).to.equal(false);
// });

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
//  const setup = (props={}) => {
//   return shallow(<App { ...props }/>)
// }

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test c1scoL0ve!
 *
 */
// const findByTestAttr = (wrapper, val) => {
//   return wrapper.find(`[data-test="${val}"]`);
// }

// test('renders without error', () => {
//   const wrapper = setup();
//   const appComponent = findByTestAttr(wrapper, 'component-app');
//   expect(appComponent.length).toBe(1);
// });

// test('renders increment button', () => {
//   const wrapper = setup();
//   const button = findByTestAttr(wrapper, 'increment-button');
//   expect(button.length).toBe(1);
// });

// test('renders counter display', () => {
//   const wrapper = setup();
//   const counterDisplay = findByTestAttr(wrapper, 'counter-display');
//   expect(counterDisplay.length).toBe(1);
// });

// test('counter starts at 0', () => {
//   const wrapper = setup();
//   const count = findByTestAttr(wrapper, 'count').text();
//   expect(count).toBe("0");  // do this first with an integer and show failure!
// });

// test('counter increments when button is clicked', () => {
//   const wrapper = setup();

//   // find button and click
//   const button = findByTestAttr(wrapper, 'increment-button');
//   button.simulate('click');

//   // check the counter
//   const count = findByTestAttr(wrapper, 'count').text();
//   expect(count).toBe("1");
// });
