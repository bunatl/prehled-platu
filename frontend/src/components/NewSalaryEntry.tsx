import React, { useState, useEffect, useReducer } from 'react';

import { ISalary } from './MainContent'

import {
    Modal,
    Button,
    InputGroup,
    FormControl,
    Form
} from 'react-bootstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const axios = require('axios');

interface INewSalaryEntryProps {
    navBool: boolean;
    entryInserted: () => void;
    closeModal: () => void;
}

interface IPickerDate {
    startDate: Date;
}

const initModalInputs: ISalary = {
    position: "",
    company: "",
    description: "",
    location: "",
    technologies: [],
    firstWorkDay: new Date(),
    salary: 0,
    yearsWorked: 1,
    _id: ""
}

type ActionTypes =
    | { type: 'position'; inputValue: string }
    | { type: 'company'; inputValue: string }
    | { type: 'description'; inputValue: string }
    | { type: 'location'; inputValue: string }
    | { type: 'technologies'; inputValue: string }
    | { type: 'firstWorkDay'; inputValue: Date }
    | { type: 'salary'; inputValue: number }
    | { type: 'yearsWorked'; inputValue: number }
    | { type: ''; }

const modalInputReducer = (state: ISalary, action: ActionTypes) => {
    switch (action.type) {
        case 'position':
            return {
                ...state,
                position: action.inputValue
            };
        case 'company':
            return {
                ...state,
                company: action.inputValue
            };
        case 'description':
            return {
                ...state,
                description: action.inputValue
            };
        case 'location':
            return {
                ...state,
                location: action.inputValue
            };
        case 'technologies':
            return {
                ...state,
                technologies: action.inputValue.split(','),
            };
        case 'firstWorkDay':
            return {
                ...state,
                firstWorkDay: action.inputValue
            };
        case 'salary':
            return {
                ...state,
                salary: action.inputValue
            };
        case 'yearsWorked':
            return {
                ...state,
                yearsWorked: action.inputValue
            };
        default:
            return initModalInputs;
    }
}

const NewSalaryEntry: React.FC<INewSalaryEntryProps> = ({ navBool, entryInserted, closeModal }) => {
    const [ pickerDate, setPickerDate ] = useState<IPickerDate>({
        startDate: new Date()
    });

    const [ show, setShow ] = useState<boolean>(navBool);

    useEffect(() => {
        setShow(navBool);
    }, [ navBool ])

    const close = () => {
        dispatch({ type: '' });
        setShow(false);
        closeModal();
    }

    const [ modalInputs, dispatch ] = useReducer(modalInputReducer, initModalInputs);

    const insertAndClose = async () => {
        try {
            const response = await axios({
                method: 'POST',
                eaders: {
                    'Content-Type': 'application/json',
                },
                url: `${process.env.REACT_APP_SERVER_URI}/api/salary/add`,
                data: modalInputs
            });
            if (response.status === 200)
                entryInserted();
        } catch (error) {
            console.log(error.response.data.err);
        }
        close();
    }

    return (
        <Modal show={show} onHide={close} animation={true} className="modalNewSalaryEntry">
            <Modal.Header closeButton>
                <Modal.Title>Přidat nový záznam o platu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* position */}
                <div className="modalPosition">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Pozice</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Software Engineer"
                            aria-label="position"
                            aria-describedby="modalInputPosition"
                            onChange={e => dispatch({
                                type: 'position',
                                inputValue: e.target.value
                            })}
                        />
                    </InputGroup>
                </div>
                {/* Company */}
                <div className="modalCompany">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Společnost</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Company s.r.o."
                            aria-label="company"
                            aria-describedby="modalInputCompany"
                            onChange={e => dispatch({
                                type: 'company',
                                inputValue: e.target.value
                            })}
                        />
                    </InputGroup>
                </div>
                {/* technologies and SW */}
                <div className="modalTechnologies">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Technologie</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="ReactJS, nodejs, AutoCAD"
                            aria-label="technologies"
                            aria-describedby="modalInputTechnologies"
                            onChange={e => dispatch({
                                type: 'technologies',
                                inputValue: e.target.value
                            })}
                        />
                    </InputGroup>
                </div>
                {/* description */}
                <div className="modalDescription">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Popis</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            as="textarea"
                            style={{}}
                            aria-label="modalInputDescription"
                            onChange={e => dispatch({
                                type: 'description',
                                inputValue: e.target.value
                            })}
                        />
                    </InputGroup>
                </div>
                {/* location, year - date picker, salary */}
                <div className="modalLocation">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text><span role="img" aria-label="pin">📍</span></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Město, Kraj"
                            aria-label="location"
                            aria-describedby="modalInputLocation"
                            onChange={e => dispatch({
                                type: 'location',
                                inputValue: e.target.value
                            })}
                        />
                    </InputGroup>
                </div>

                <div className="modalSalary">
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Plat</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="50 000"
                            aria-label="salary"
                            aria-describedby="modalInputSalary"
                            onChange={e => dispatch({
                                type: 'salary',
                                inputValue: parseInt(e.target.value, 10)
                            })}
                        />
                    </InputGroup>
                </div>

                <div className="modalDate">
                    <div className="date">
                        <span>Datum nástupu</span>
                        <DatePicker
                            id="dateInput"
                            closeOnScroll={true}
                            dateFormat="📅 dd.MM.yyyy"
                            // locale="cs-CZ"
                            withPortal
                            selected={pickerDate.startDate}
                            // future rates rates aren't available
                            maxDate={new Date()}
                            onChange={(date: Date) => {
                                setPickerDate({ startDate: date });
                                dispatch({
                                    type: 'firstWorkDay',
                                    inputValue: new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
                                });
                            }}
                        />
                    </div>

                    <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                        <Form.Label>Délka doby výkonu (v letech)</Form.Label>
                        <Form.Control as="select" custom
                            onChange={e => dispatch({
                                type: 'yearsWorked',
                                inputValue: parseInt(e.target.value, 10)
                            })}>
                            {Array(15).fill(0).map((v, i) => (
                                <option key={i} value={1 + i}>{1 + i}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>Zavřít</Button>
                <Button onClick={insertAndClose}>Přidej záznam</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewSalaryEntry;
