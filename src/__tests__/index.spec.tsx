import renderer from "react-test-renderer";
import App from "../";
import Setup from "screens/Setup";
import Game from "screens/Game";

// Mocked so that ReactDOM.render isn't called, which causes issues in jest env
jest.mock("react-dom");

describe("App", () => {
  it("App should render Setup initially", () => {
    const component = renderer.create(<App />);

    const testInstance = component.root;

    expect(testInstance.findByType(Setup)).toBeDefined();

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("App should render Game after start is clicked", () => {
    const component = renderer.create(<App />);

    const testInstance = component.root;

    renderer.act(() => {
      testInstance.findByProps({ id: "startBtn" }).props.onClick();
    });

    expect(testInstance.findByType(Game)).toBeDefined();
  });

  it("App should render Setup after reset is clicked", () => {
    const component = renderer.create(<App />);

    const testInstance = component.root;

    renderer.act(() => {
      testInstance.findByProps({ id: "startBtn" }).props.onClick();
    });

    renderer.act(() => {
      testInstance.findByProps({ id: "resetBtn" }).props.onClick();
    });

    expect(testInstance.findByType(Setup)).toBeDefined();
  });
});
