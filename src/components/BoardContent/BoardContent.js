import Column from "../../components/Column/Column";
import React, { useState, useEffect, useRef } from "react";
import "./BoardContent.scss";
import { mapOrder } from "../../utillities/sorts";
import { cloneDeep, isEmpty } from "lodash";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  fetchBoardDetails,
  createNewColumn,
  updatedBoard,
  updateApiNewColumn,
  updateCard
} from "../../actions/ApiCall/index";

const BoardContent = () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const inputElement = useRef();
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  useEffect(() => {
    if (openNewColumnForm === true) {
      inputElement.current.focus();
    }
  }, [openNewColumnForm]);

  useEffect(() => {
    const boardId = "62e393450d4560b9aee4c8ec";
    fetchBoardDetails(boardId).then((board) => {
      setBoard(board);
      //sort columns
      // hàm sort đế sắp xếp thử tự của phần tử
      setColumns(mapOrder(board.columns, board.columnOrder, "_id"));
    });
  }, []);

  if (isEmpty(board)) {
    return <div className="not-found">Board not found</div>;
  }

  // check open new column
  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm);
  };

  // nhập input
  const onNewColumnTitleChange = (e) => {
    setNewColumnTitle(e.target.value);
  };

  // add new column
  const addNewColumn = () => {
    if (!newColumnTitle) {
      inputElement.current.focus();
      return;
    }

    const newColumnToAdd = {
      boardId: board._id,
      title: newColumnTitle.trim(),
    };

    createNewColumn(newColumnToAdd).then((column) => {
      let newColumns = [...columns];
      newColumns.push(column);

      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map((c) => c._id);
      newBoard.columns = newColumns;

      setColumns(newColumns);
      setBoard(newBoard);
      setNewColumnTitle("");
      toggleOpenNewColumnForm(!openNewColumnForm);
    });
  };

  // enter input add
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      addNewColumn();
    }
  };

  // edit title end remove column
  const onUpdateColumn = (newColumnToUpdate) => {
    console.log("============= newColumnToUpdate", newColumnToUpdate);
    const columnIdToUpdate = newColumnToUpdate.value._id;

    let newColumns = [...columns];
    console.log("============= newColumns", newColumns);

    const columnIndexToUpdate = newColumns.findIndex(
      (i) => i._id === columnIdToUpdate
    );

    if (newColumnToUpdate._destroy) {
      // xoá
      newColumns.splice(columnIndexToUpdate, 1);
    } else {
      // edit title
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate.value);
    }

    let newBoard = { ...board };
    // tìm và cập nhật lại columnOrder
    newBoard.columnOrder = newColumns.map((c) => c._id);
    // gán lại columns
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  //onDeleteColumn
  const onDeleteColumn = (deleteColumn) => {
    const columnIdToDdelete = deleteColumn._id;

    let newColumns = [...columns];

    const columnIndexToUpdate = newColumns.findIndex(
      (i) => i._id === columnIdToDdelete
    );


    newColumns.splice(columnIndexToUpdate, 1);

    let newBoard = { ...board };
    // tìm và cập nhật lại columnOrder
    newBoard.columnOrder = newColumns.map((c) => c._id);
    // gán lại columns
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  // add card
  const onAddCard = (card) => {
    const columnIdToUpdate = card.columnId;

    let newColumns = [...columns];

    const cardColumn = newColumns.filter((c) => c._id === columnIdToUpdate);
    console.log("============= cardColumn[0]", cardColumn[0]);
    
    cardColumn[0].cards.push(card);

    let newBoard = { ...board };
    // tìm và cập nhật lại columnOrder
    newBoard.columnOrder = newColumns.map((c) => c._id);
    // gán lại columns
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);
  };

  //delete cards
  const deleteCardState = (deleteCard, idCardApi, idCard, idCardColumnApi) => {
    let newColumns = [...columns];

    const columnCard = newColumns.find((c) => c._id === idCardColumnApi);
    const newCards = columnCard.cards;

    newCards.splice(idCard, 1);
    columnCard.cardOrder = newCards.map((c) => c._id);
    columnCard.cards = newCards;

    setColumns(newColumns);
  };

  //  COLUMN HANDLE DRAG DROP TABLE
  const dragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.target.style.opacity = 0.4;
    e.dataTransfer.setData("text/html", e.target.id);
    const columnCurrent = columns[e.target.id];
    e.dataTransfer.setData("text/data", JSON.stringify(columnCurrent));
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {};

  const dragOver = (e) => {
    e.preventDefault();
  };

  // DOM đang kéo
  const dragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  // DOM thằng thả
  const drop = (e) => {
    e.preventDefault();
    const col = e.target.closest(".column");
    if (col) {
      col.style.border = "none";
      let removedIndex = e.dataTransfer.getData("text/html");
      let dataChildLoad = JSON.parse(e.dataTransfer.getData("text/data"));
      let addedIndex = col.id;

      let newColumns = cloneDeep(columns)

      if (removedIndex === null && addedIndex === null) return newColumns;

      if (removedIndex !== null) {
        dataChildLoad = newColumns.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        newColumns.splice(addedIndex, 0, dataChildLoad);
      }

      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map((c) => c._id);
      newBoard.columns = newColumns;

      setColumns(newColumns);
      setBoard(newBoard);

      console.log('============= removedIndex',removedIndex)
      console.log('============= addesIndex',addedIndex)

      // call api date column order
      updatedBoard(newBoard._id, newBoard).then((updatedBoard) => {
        setColumns(newColumns);
        setBoard(updatedBoard);
      });
    }
  };

  // CARD HANDLE DRAG DROP TABLE

  const dragCardStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("id", e.target.id);
    const columnId = e.target.attributes.apiid.value;
    const columnFill = columns.filter(c => 
     c._id === columnId
    )
    const dataCardFill = columnFill[0].cards[e.target.id]
    e.dataTransfer.setData("dataCard", JSON.stringify(dataCardFill));
    e.dataTransfer.setData("columnId", columnId);
  };

  const dragCardEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dragCardLeave = (e) => {
    e.stopPropagation();
  };

  const dragCardOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  // DOM được kéo
  const dragCardEnd = (e) => {
    e.stopPropagation();
};

  // DOM được thả
  const dropCard = (e) => {

    e.stopPropagation();
    e.preventDefault();

    const card = e.target.closest(".card-item")
    const addCard = card.id;
    const removeCard = e.dataTransfer.getData("id");
    const columnIdRemove = e.dataTransfer.getData("columnId");
    let dataCard = JSON.parse(e.dataTransfer.getData("dataCard"));
    const columnIdAdd = e.target.attributes.apiid.value;

   

    if (removeCard !== null || addCard !== null) {
      if (columnIdRemove === columnIdAdd) {
        let newColumns = [...columns];

        let currentColumn = newColumns.find((c) => c._id === columnIdRemove);

        if (removeCard === null && addCard === null) return currentColumn.cards;

        if (removeCard !== null) {
          dataCard = currentColumn.cards.splice(removeCard, 1)[0];
          console.log("============= dataCard", dataCard);
        }

        if (addCard !== null) {
          currentColumn.cards.splice(addCard, 0, dataCard);
        }

        currentColumn.cardOrder = currentColumn.cards.map((i) => i._id);

        setColumns(newColumns);

        updateApiNewColumn(currentColumn._id , currentColumn).catch(() => {
          setColumns(columns);
        })
      
      } else {
        let newColumns = cloneDeep(columns)

        let currentColumnRemove = newColumns.find(
          (c) => c._id === columnIdRemove
        );
        let currentColumnAdd = newColumns.find((c) => c._id === columnIdAdd);

        if (removeCard === null && addCard === null)
          return currentColumnRemove.cards && currentColumnAdd.cards;

        if (removeCard !== null) {
          dataCard = currentColumnRemove.cards.splice(removeCard, 1)[0]
        }

        if (addCard !== null) {
          currentColumnAdd.cards.splice(addCard , 0, dataCard);
        }

        currentColumnRemove.cardOrder = currentColumnRemove.cards.map(
          (i) => i._id
        );
        currentColumnAdd.cardOrder = currentColumnAdd.cards.map((i) => i._id);

        setColumns(newColumns);

        updateApiNewColumn(currentColumnRemove._id , currentColumnRemove).catch(() => {
          setColumns(columns);
        })

        updateApiNewColumn(currentColumnAdd._id , currentColumnAdd).catch( () => {
          setColumns(columns);
        })

        if(addCard !== null){
          let currentCard = currentColumnAdd.cards[addCard]
          currentCard.columnId = currentColumnAdd._id
          updateCard(currentCard._id , currentCard)
        }
      }
    }
  };

  return (
    <div className="board-content">
      {columns.map((column, index) => (
        <div
          key={index}
          draggable
          id={index}
          onDragStart={(e) => dragStart(e)}
          onDragEnter={(e) => dragEnter(e)}
          onDragLeave={(e) => dragLeave(e)}
          onDragOver={(e) => dragOver(e)}
          onDragEnd={(e) => dragEnd(e)}
          onDrop={(e) => drop(e)}
        >
          <Column
            board={board}
            onAddCard={onAddCard}
            onUpdateColumn={onUpdateColumn}
            onDeleteColumn={onDeleteColumn}
            column={column}
            deleteCardState={deleteCardState}
            columnid={`column-${index + 1}`}
            id={index}
            apiid = {column._id}
            dragCardStart={dragCardStart}
            dragCardEnter={dragCardEnter}
            dragCardLeave={dragCardLeave}
            dragCardOver={dragCardOver}
            dragCardEnd={dragCardEnd}
            dropCard={dropCard}
          />
        </div>
      ))}

      {/* ADD COLUMN*/}
      <Container className="trello-add-container">
        {!openNewColumnForm && (
          <Row className="row">
            <Col onClick={toggleOpenNewColumnForm} className="add-new-column">
              <i className="fa fa-plus icon " />
              Add another board
            </Col>
          </Row>
        )}

        {openNewColumnForm && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                type="text"
                placeholder="Enter column title ..."
                className="input-enter-new-column"
                ref={inputElement}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={(e) => handleEnter(e)}
              />
              <Button onClick={addNewColumn} variant="primary">
                Add Column
              </Button>
              <span
                onClick={toggleOpenNewColumnForm}
                className="cancel-new-column"
              >
                <i className="fa fa-trash icon" />
              </span>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default BoardContent;
