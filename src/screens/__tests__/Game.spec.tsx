import renderer from "react-test-renderer";
import Game from "screens/Game";

jest.mock("scripts/util", () => ({
  shuffleArray: (input: any) => input,
  shuffleString: (input: any) => input,
}));

const samplePokemon = {
  name: "bulbasaur",
  url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  pokedexId: 1,
};

describe("Game", () => {
  // TODO: test case with empty pokemon list - should probably show error

  it("should render game page with sample pokemon", () => {
    const component = renderer.create(
      <Game pokemonList={[samplePokemon]} reset={() => null} />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
