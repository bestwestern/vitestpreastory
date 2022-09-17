import { h } from "preact";
interface HomeProps {
  programmelist: Array<Programme>;
}
const Home = ({ programmelist }: HomeProps) => {
  return (
    <div>
      <h1>Home {programmelist.length}</h1>
      {programmelist.map(({ id, pictureId }) => {
        return (
          <p>
            {id}
            <img src={"/imgs/" + pictureId + ".jpeg"}> </img>
          </p>
        );
      })}
    </div>
  );
};

export default Home;
