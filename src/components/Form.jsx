import React, {useState} from 'react';
import Form from "rsuite/es/Form";
import ControlLabel from "rsuite/es/ControlLabel";
import Radio from "rsuite/es/Radio";
import FormGroup from "rsuite/es/FormGroup";
import FormControl from "rsuite/es/FormControl";
import HelpBlock from "rsuite/es/HelpBlock";
import SelectPicker from "rsuite/es/SelectPicker";
import TagPicker from "rsuite/es/TagPicker";
import DatePicker from "rsuite/es/DatePicker";
import RadioGroup from "rsuite/es/RadioGroup";
import { Panel } from "rsuite";
import "styled-components/macro";
import ButtonToolbar from "rsuite/es/ButtonToolbar";
import Button from "rsuite/es/Button";
import Modal from "rsuite/es/Modal";


/**
 * @param title {string}
 * @param entityUid
 * @param formElements {Array}
 * @param onSubmit {function}
 * @param onDelete
 * @param type {string}
 * @returns {Form}
 */
export default ({title, entityUid, formElements, onSubmit, onDelete, type = 'update'}) => {
  let formObject = {};
  for (let ele of formElements) {
    formObject[ele.key] = ele.data;
  }
  const [formValue, setFormValue] = useState(formObject);
  const [openModal, setOpenModal] = useState(false);

  function update (key, value) {
    let newFormValue = Object.assign({}, formValue);
    newFormValue[key] = value;
    setFormValue(newFormValue);
  }

  return (
    <Panel
      css={`
        background-color: white;
        color: black;
        padding: 20px;
      `}
      header={title}
      bordered
      bodyFill
    >
      <Form>
        {
          formElements.map(ele => {
            switch (ele.type) {
              case 'text':
                return (
                  <FormGroup key={ele.key}>
                    <ControlLabel>{ele.title}</ControlLabel>
                    <FormControl
                      name="text"
                      value={formValue[ele.key]}
                      disabled={ele.disabled}
                      onChange={(value, event) => update(ele.key, value)}
                    />
                    {ele.description && <HelpBlock tooltip>{ele.description}</HelpBlock>}
                  </FormGroup>
                );
              case 'date':
                return (
                  <FormGroup key={ele.key}>
                    <ControlLabel>{ele.title}</ControlLabel>
                    <FormControl
                      name="datePicker"
                      value={typeof formValue[ele.key] === 'string' ? new Date(formValue[ele.key]) : formValue[ele.key]}
                      accepter={DatePicker}
                      disabled={ele.disabled}
                      onChange={(value, event) => update(ele.key, value)}
                    />
                  </FormGroup>
                );
              case 'radio':
                return (
                  <FormGroup key={ele.key}>
                    <ControlLabel>{ele.title}</ControlLabel>
                    <FormControl
                      name="radio"
                      accepter={RadioGroup}
                      disabled={ele.disabled}
                      onChange={(value, event) => update(ele.key, value)}
                    >
                      {formValue[ele.key].map(ele => (
                        <Radio disabled={ele.disabled} value={ele.value}>
                          {ele.label}
                        </Radio>
                      ))}
                    </FormControl>
                  </FormGroup>
                );
              case 'select':
                return (
                  <FormGroup key={ele.key}>
                    <ControlLabel>{ele.title}</ControlLabel>
                    <FormControl
                      name="selectPicker"
                      accepter={SelectPicker}
                      data={formValue[ele.key]}
                      disabled={ele.disabled}
                      onChange={(value, event) => update(ele.key, value)}
                    />
                  </FormGroup>
                );
              case 'tag':
                return (
                  <FormGroup key={ele.key}>
                    <ControlLabel>{ele.title}</ControlLabel>
                    <FormControl
                      creatable
                      name="tagPicker"
                      accepter={TagPicker}
                      defaultValue={ele.data && ele.data.map(e => e.label)}
                      data={formValue[ele.key]}
                      disabled={ele.disabled}
                      onChange={(value, event) => update(ele.key, value)}

                    />
                  </FormGroup>
                );
              default: throw new Error(`Element type ${ele.type} not supported`)
            }
          })
        }
        <Modal show={openModal} onHide={() => setOpenModal(!openModal)}>
          <Modal.Header>
            <Modal.Title>Delete entity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to do this ???</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => onDelete(entityUid)} appearance="primary">
              Delete
            </Button>
            <Button onClick={() => setOpenModal(!openModal)} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        {type === 'create'
          ? (
            <ButtonToolbar>
              <Button appearance="primary" onClick={() => onSubmit(entityUid, formValue)}>
                Submit
              </Button>
            </ButtonToolbar>
          )
          : (
            <ButtonToolbar>
              <Button appearance="primary" onClick={() => onSubmit(entityUid, formValue)}>
                Update
              </Button>
              <Button appearance="subtle" onClick={() => setOpenModal(!openModal)}>
                Delete
              </Button>
            </ButtonToolbar>
          )
        }

      </Form>
    </Panel>
  );

};