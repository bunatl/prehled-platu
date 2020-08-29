import React, { useState, useEffect } from 'react';

import {
    Modal,
    Button,
    InputGroup,
    FormControl,
    Form
} from 'react-bootstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface NewSalaryEntryProps {
    navBool: boolean;
    closeModal: () => void;
}

interface IPickerDate {
    startDate: Date;
}

const NewSalaryEntry: React.FC<NewSalaryEntryProps> = ({ navBool, closeModal }) => {
    const [ pickerDate, setPickerDate ] = useState<IPickerDate>({
        startDate: new Date()
    });

    const [ show, setShow ] = useState<boolean>(navBool);

    useEffect(() => {
        setShow(navBool);
    }, [ navBool ])

    const close = () => {
        setShow(false);
        closeModal();
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
                        />
                    </InputGroup>
                </div>
                {/* description */}
                <div className="modalDescription">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Popis</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="textarea" aria-label="modalInputDescription" />
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
                        />
                    </InputGroup>
                </div>

                <div className="modalDate">
                    Datum nástupu
                    <DatePicker
                        id="dateInput"
                        closeOnScroll={true}
                        dateFormat="📅 dd.MM.yyyy"
                        // locale="cs-CZ"
                        withPortal
                        selected={pickerDate.startDate}
                        // future rates rates aren't available
                        maxDate={new Date()}
                        onChange={(date: Date) => setPickerDate({ startDate: date })}
                    />

                    <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                        <Form.Label>Délka doby výkonu (v letech)</Form.Label>
                        <Form.Control as="select" size="sm" custom>
                            {Array(15).fill(0).map((v, i) => (
                                <option key={i}>{1 + i}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>Zavřít</Button>
                <Button onClick={close}>Přidej záznam</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewSalaryEntry;
