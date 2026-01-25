import type { InfoType } from "./list";

export const ListItem = ({
  item,
  onClick,
}: {
  item: InfoType;
  onClick: () => void;
}) => {
  const { id, title, src } = item;
  return (
    <li
      className="flex gap-2"
      onClick={() => {
        onClick();
        console.log(src);
      }}
    >
      <span>{id}</span>
      <span>{title}</span>
    </li>
  );
};
