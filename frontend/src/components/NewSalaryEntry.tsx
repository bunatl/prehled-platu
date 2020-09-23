import React, { useState, useEffect, useReducer, useContext } from 'react';

import { ISalary, employmentFormTypes, SalaryRateTypes } from './MainContent'
import ModalContext from './ModalContext';

import {
    Modal,
    Button,
    InputGroup,
    FormControl,
    Form,
    Dropdown,
    DropdownButton
} from 'react-bootstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const axios = require('axios');

interface IPickerDate {
    startDate: Date;
}

const initModalInputs: ISalary = {
    position: "",
    company: "",
    description: "",
    location: "",
    technologies: [],
    employmentForm: "Plný úvazek (HPP)",
    firstWorkDay: new Date(),
    salary: 50000,
    salaryRate: "měs",
    monthsWorked: 12,
    _id: ""
}

type ActionTypes =
    | { type: 'position'; inputValue: string }
    | { type: 'company'; inputValue: string }
    | { type: 'description'; inputValue: string }
    | { type: 'location'; inputValue: string }
    | { type: 'technologies'; inputValue: string }
    | { type: 'employmentForm'; inputValue: employmentFormTypes }
    | { type: 'firstWorkDay'; inputValue: Date }
    | { type: 'salary'; inputValue: number }
    | { type: 'salaryRate'; inputValue: SalaryRateTypes }
    | { type: 'monthsWorked'; inputValue: number }
    | { type: ''; }

const NewSalaryEntry: React.FC = () => {
    const { modal, setModal } = useContext(ModalContext);
    const [ timeframe, setTimeframe ] = useState<boolean>(true);
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
            case 'employmentForm':
                return {
                    ...state,
                    employmentForm: action.inputValue
                };
            case 'salary':
                return {
                    ...state,
                    salary: action.inputValue
                };
            case 'salaryRate':
                return {
                    ...state,
                    salaryRate: action.inputValue
                };
            case 'monthsWorked':
                return {
                    ...state,
                    monthsWorked: timeframe ? action.inputValue * 12 : action.inputValue
                };
            default:
                return initModalInputs;
        }
    }

    const [ modalInputs, dispatch ] = useReducer(modalInputReducer, initModalInputs);
    const [ employmentForm, setEmploymentForm ] = useState<employmentFormTypes>('Plný úvazek (HPP)');
    const [ pickerDate, setPickerDate ] = useState<IPickerDate>({
        startDate: new Date()
    });

    useEffect(() => {
        dispatch({
            type: 'employmentForm',
            inputValue: employmentForm
        })
    }, [ employmentForm ]);

    const close = () => {
        // reset all modal states
        dispatch({ type: '' });
        setEmploymentForm('Plný úvazek (HPP)');
        setPickerDate({
            startDate: new Date()
        });
        setTimeframe(true);

        setModal(false);
    }

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
        } catch (error) {
            console.log(error.response.data.err);
        }
        close();
    }

    return (
        <Modal show={modal} onHide={close} animation={true} className="modalNewSalaryEntry">
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
                            type="number"
                            min="0"
                            placeholder="50 000"
                            aria-label="salary"
                            aria-describedby="modalInputSalary"
                            onChange={e => dispatch({
                                type: 'salary',
                                inputValue: parseInt(e.target.value, 10)
                            })}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>/</InputGroup.Text>
                        </InputGroup.Append>
                        <DropdownButton
                            as={InputGroup.Append}
                            variant="outline-secondary"
                            title={modalInputs.salaryRate}
                            id="salaryRate"
                        >
                            <Dropdown.Item onClick={() => dispatch({ type: 'salaryRate', inputValue: 'hod' })}>hod</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch({ type: 'salaryRate', inputValue: 'měs' })}>měs</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch({ type: 'salaryRate', inputValue: 'MD' })}>MD</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch({ type: 'salaryRate', inputValue: 'rok' })}>rok</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                </div>

                <div className="modalEmploymentForm">
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Úvazek</InputGroup.Text>
                        </InputGroup.Prepend>
                        <DropdownButton
                            as={InputGroup.Append}
                            variant="outline-secondary"
                            title={employmentForm}
                            id="employmentForm"
                        >
                            <Dropdown.Item onClick={() => setEmploymentForm('Plný úvazek (HPP)')}>Plný úvazek (HPP)</Dropdown.Item>
                            <Dropdown.Item onClick={() => setEmploymentForm('Poloviční úvazek')}>Poloviční úvazek</Dropdown.Item>
                            <Dropdown.Item onClick={() => setEmploymentForm('Dohoda o provedení práce (DPP)')}>Dohoda o provedení práce (DPP)</Dropdown.Item>
                            <Dropdown.Item onClick={() => setEmploymentForm('Dohoda o provedení činnosti (DPČ)')}>Dohoda o provedení činnosti (DPČ)</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                </div>

                <div className="modalDate">
                    <div className="date">
                        <span>Datum nástupu</span>
                        <DatePicker
                            id="dateInput"
                            dateFormat="📅 MMMM yyyy"
                            selected={pickerDate.startDate}
                            showMonthYearPicker
                            showFullMonthYearPicker
                            maxDate={new Date()}
                            onChange={(date: Date) => {
                                setPickerDate({ startDate: date });
                                dispatch({
                                    type: 'firstWorkDay',
                                    inputValue: new Date(date.getFullYear(), date.getMonth(), 10)
                                });
                            }}
                        />
                    </div>

                    <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                        <Form.Label>Délka doby výkonu práce</Form.Label>
                        <InputGroup size="sm">
                            <FormControl
                                placeholder="1"
                                aria-label="timeframe"
                                aria-describedby="timeframe"
                                onChange={e => dispatch({
                                    type: 'monthsWorked',
                                    inputValue: parseInt(e.target.value, 10)
                                })}
                            />
                            <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title={timeframe ? 'let' : 'měsíců'}
                                id="timeframe"
                            >
                                <Dropdown.Item onClick={() => setTimeframe(!timeframe)}>{timeframe ? 'měsíců' : 'let'}</Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
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
