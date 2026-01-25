import { useNavigate } from "react-router-dom";
import { ListItem } from "./list-item";
export const List = () => {
  const navigate = useNavigate();

  return (
    <ul>
      {architectureList.map((item: InfoType) => {
        return (
          <ListItem
            key={item.id}
            item={item}
            onClick={() => navigate("/view")}
          ></ListItem>
        );
      })}
    </ul>
  );
};

const architectureList: InfoType[] = [
  {
    id: 1,
    title: "something",
    src: "src/assets/something.glb",
  },
  {
    id: 2,
    title: "something",
    src: "src/assets/something.glb",
  },
  {
    id: 3,
    title: "something",
    src: "src/assets/something.glb",
  },
];

export type InfoType = {
  id: number;
  title: string;
  src: string;
  onClick?: () => void;
  option?: string;
};
