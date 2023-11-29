import { MouseEventHandler } from "react";

type Props = {
  className: String;
  value: string;
  onClick: MouseEventHandler;
  playerTurn: string;
};

const Tile = ({ className, value, onClick, playerTurn }: Props) => {
  let hoverClass = null;

  if (value == null && playerTurn != null)
    hoverClass = `${playerTurn.toLowerCase()}-hover`;

  return (
    <div onClick={onClick} className={`tile ${className} ${hoverClass}`}>
      {value}
    </div>
  );
};

export default Tile;
