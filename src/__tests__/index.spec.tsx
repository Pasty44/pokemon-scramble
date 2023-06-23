import App from "../";

// Mocked so that ReactDOM.render isn't called, which causes issues in jest env
jest.mock("react-dom");

describe("App", () => {
  it("App is defined", () => {
    expect(App).toBeDefined();
  });
});
