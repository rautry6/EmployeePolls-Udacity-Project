import { render, fireEvent } from "@testing-library/react";
import Nav from "./Nav";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers";
import middleware from "../middleware";
import { BrowserRouter } from "react-router-dom";

const store = createStore(rootReducer, middleware);

describe("Nav", () => {
  it("will match snapshot", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
