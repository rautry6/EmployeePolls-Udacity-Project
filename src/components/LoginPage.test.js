import LoginPage from "./LoginPage.js";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import rootReducer from "../reducers";
import middleware from "../middleware";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = createStore(rootReducer, middleware);
describe("LoginPage", () => {
  it("matches snapshot", () => {
    const { container } = render(<Provider store={store}>
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
      </Provider>);
    expect(container).toMatchSnapshot();
  });
});
