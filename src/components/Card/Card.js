import React from "react";
import "./Card.scss";
import DeleteIcon from "@mui/icons-material/Delete";

function Card(props) {
  const {card , id, deleteCard } = props;

  return (
    <div id={id}>
      {card?.cover && (
        <img
          src={card?.cover}
          className="card-cover"
          alt="trello"
          onMouseDown={(e) => e.preventDefault()}
        />
      )}
      <span>{card?.title}</span>
      <DeleteIcon onClick={(e) => deleteCard(e)} className="delete" />
    </div>
  );
}

export default Card;
