import renderer from "react-test-renderer";
import Setup from "screens/Setup";

describe("Setup", () => {
  it("should render gen 1 selected only initially", () => {
    const component = renderer.create(<Setup startGame={jest.fn()} />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should alert if no gens are selected", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const component = renderer.create(<Setup startGame={jest.fn()} />);

    const testInstance = component.root;

    renderer.act(() => {
      testInstance.findByProps({ id: "gen1" }).props.onClick();
    });

    renderer.act(() => {
      testInstance.findByProps({ id: "startBtn" }).props.onClick();
    });

    expect(alert).toBeCalledWith("You need to select at least 1 generation");
  });

  it("should toggle gen div when clicked", () => {
    const component = renderer.create(<Setup startGame={jest.fn()} />);

    const testInstance = component.root;

    expect(
      testInstance
        .findAllByProps({ ["data-id"]: "gen-div" })
        .filter((el) => !el.props.className.includes("disabled")).length
    ).toBe(1);

    renderer.act(() => {
      testInstance.findByProps({ id: "gen2" }).props.onClick();
    });

    expect(
      testInstance
        .findAllByProps({ ["data-id"]: "gen-div" })
        .filter((el) => !el.props.className.includes("disabled")).length
    ).toBe(2);
  });
});
