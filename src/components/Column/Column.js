import React, { useEffect, useRef, useState } from "react";
import "./Column.scss";
import Card from "../Card/Card";
import { mapOrder } from "../../utillities/sorts";
import Dropdown from "react-bootstrap/Dropdown";
import ConfirmModal from "../Common/ComfirmModal";
import { MODAL_ACTION_CONFIRM } from "../../utillities/constant";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { cloneDeep } from "lodash";
import {createNewCard ,deleteCardApi , updateApiNewColumn , deleteColumn} from "../../actions/ApiCall/index"

function Column(props) {
  const newCartText = useRef();
  const {
    column,
    onUpdateColumn,
    onDeleteColumn,
    id,
    deleteCardState,
    onAddCard,
    dragCardStart,
    dragCardEnter,
    dragCardLeave,
    dragCardOver,
    dragCardEnd,
    dropCard,
    columnid,
    apiid
  } = props;
  const [columnTitle, setColumnTitle] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [newCard, setNewCard] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);

  // sắp xếp vị trí của các card trong 1 column trong array cardOrder
  const cards = mapOrder(column.cards, column.cardOrder, "_id");

  const toggleOpenNewColumnForm = () => setShowConfirmModal(!showConfirmModal);

  // click title column
  const selectAllInlineText = (e) => {
    e.target.focus();
    e.target.select();
  };

  // nhập input titkle column
  const handleTitleColumnChange = (e) => {
    setColumnTitle(e.target.value);
  };

  // enter input
  const saveContentAfterEnter = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  useEffect(() => {
    if (newCartText && newCartText.current) {
      newCartText.current.focus();
    }
  }, [showAddCard]);

  const onConfirmModalAction = (type) => {
    // remove column
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumns = {
        ...column,
        _destroy: true,
      };
      deleteColumn(newColumns._id).then(deleteColumn => {
        onDeleteColumn(deleteColumn);
      })
    }
    toggleOpenNewColumnForm();
  };

  const handleTitleColumnBlur = () => {
    // edit title column
    const newColumns = { 
      ...column,
      title: columnTitle,
    };

    if(columnTitle !== column.title){

       updateApiNewColumn(newColumns._id, newColumns).then(updatedColumn =>{
      updatedColumn.cards = newColumns.cards
      onUpdateColumn(updatedColumn);
      })
    }
   
  };

  // delete card
  const deleteCard = (e) => {
    const columnIdDelete = e.target.closest('.card-item')
    const idCard = columnIdDelete.id
    const idCardApi =column.cards[idCard]._id
    const idCardColumnApi =column.cards[idCard].columnId
    deleteCardApi(idCardApi).then(deleteCard => {
      deleteCardState(deleteCard , idCardApi , idCard , idCardColumnApi)
    })
  }

  // handle card
  const toggleOpenAddCard = () => {
    setShowAddCard(!showAddCard);
    setNewCard("");
  };

  const onNewCardChange = (e) => {
    setNewCard(e.target.value);
  };

  const handleAddCard = (e) => {
    if (!newCard) {
      newCartText.current.focus();
      return;
    }

    const newCardToAdd = {
      boardId: column.boardId,
      columnId: column._id,
      title: newCard.trim(),
    };

    createNewCard(newCardToAdd).then(card => {
        let newColumn = cloneDeep(column);
      
        newColumn.cards.push(card);
        newColumn.cardOrder.push(card._id);

        onAddCard(card);

        setNewCard("");
        toggleOpenAddCard();
    })
  };

  const handleAddCardEnter = (e) => {
    if (e.key === "Enter") {
      handleAddCard();
    }
  };

  return (
    <div className="column" id={id}>
      <header className="column-drag-handle">
        {/** INPUT TITLE */}
        <div className="column-title">
          <Form.Control
            type="text"
            placeholder="Enter column title ..."
            className="trello-content-editable"
            value={columnTitle}
            spellCheck="false"
            onClick={selectAllInlineText} // click
            onChange={handleTitleColumnChange} // change title column value
            onBlur={handleTitleColumnBlur} // blur
            onKeyDown={saveContentAfterEnter} // enter
            onMouseDown={(e) => e.preventDefault()} // drag drop
          />
        </div>

        {/** ALERT COMFIRM */}

        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            />

            <Dropdown.Menu>
              <Dropdown.Item onClick={toggleOpenAddCard}>
                Add Card ...
              </Dropdown.Item>
              <Dropdown.Item onClick={toggleOpenNewColumnForm}>
                Remove column....
              </Dropdown.Item>
              <Dropdown.Item>Remove all card ...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        {cards.map((card, index) => (
          <div
            key={index}
            apiid = {apiid}
            columnid= {columnid}
            id={index}
            draggable
            className='card-item'
            onDragStart={(e) => dragCardStart(e)}
            onDragEnter={(e) => dragCardEnter(e)}
            onDragLeave={(e) => dragCardLeave(e)}
            onDragOver={(e) => dragCardOver(e)}
            onDragEnd={(e) => dragCardEnd(e)}
            onDrop={(e) => dropCard(e)}
          >
            <Card id={index} card={card} deleteCard = {deleteCard}  />
          </div>
        ))}

        {showAddCard ? (
          <div className="add-new-card">
            <Form.Control
              type="text"
              size="sm"
              as="textarea"
              row="3"
              placeholder="Enter column title ..."
              className="input-enter-new-column"
              value={newCard}
              ref={newCartText}
              onChange={onNewCardChange}
              onKeyDown={(e) => handleAddCardEnter(e)}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <footer>
        {showAddCard ? (
          <div className="add-new-card-actions">
            <Button onClick={handleAddCard} variant="primary">
              Add Card
            </Button>
            <span on className="cancel-new-column">
              <i onClick={toggleOpenAddCard} className="fa fa-trash icon" />
            </span>
          </div>
        ) : undefined}
        {showAddCard ? undefined : (
          <div onClick={toggleOpenAddCard} className="footer-actions">
            <i className="fa fa-plus icon " />
            Add another card
          </div>
        )}
      </footer>

      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove column"
        content={`Are you sure want to remove <strong>${column.title}</strong> ! `}
      />
    </div>
  );
}

export default Column;
