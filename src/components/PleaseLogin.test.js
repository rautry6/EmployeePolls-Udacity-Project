import { render, fireEvent } from "@testing-library/react";
import PleaseLogin from "./PleaseLogin";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers";
import middleware from "../middleware";

const store = createStore(rootReducer, middleware);

describe("PleaseLogin", () => {
  it("will display failed login text if username or password is incorrect", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <PleaseLogin />
      </Provider>
    );
    const usernameInput = getByTestId("login-input");
    const passwordInput = getByTestId("password-input");
    const submitButton = getByTestId("submit-button");
    fireEvent.change(usernameInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });
    fireEvent.click(submitButton);
    expect(getByTestId("failed-login-text")).toBeInTheDocument();
  });
  it("will match snapshot", () => {
    const { container } = render(
      <Provider store={store}>
        <PleaseLogin />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
