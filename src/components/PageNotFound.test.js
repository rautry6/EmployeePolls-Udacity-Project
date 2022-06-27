import PageNotFound from "./PageNotFound";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import rootReducer from "../reducers";
import middleware from "../middleware";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("PageNotFound", () => {
  it("matches snapshot", () => {
    const { container } = render(
      <Provider store={createStore(rootReducer, middleware)}>
        <BrowserRouter>
          <PageNotFound />
        </BrowserRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
