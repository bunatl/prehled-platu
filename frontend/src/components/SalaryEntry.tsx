import React, { useEffect, useState } from 'react';

import { ISalary, employmentFormTypes } from './MainContent';

const axios = require('axios');

interface ISalaryEntry {
    salary: ISalary;
}

interface inputField {
    value: string;
    text: string;
}

const initInputField: inputField = {
    value: "",
    text: ""
}

const SalaryEntry: React.FC<ISalaryEntry> = ({ salary }) => {

    const [ locations, setLocations ] = useState<inputField[]>([ initInputField ]);
    const [ years, setYears ] = useState<inputField[]>([ initInputField ]);
    const [ employmentForm, setEmploymentForm ] = useState<employmentFormTypes[]>([ "Plný úvazek (HPP)" ]);

    useEffect(() => {
        const fetchEntryData = async () => {
            try {
                const { data: { result: [ {
                    location: localLocation,
                    employmentForm: localEmploymentForm,
                    firstWorkDay: localFirstWorkDay,
                    monthsWorked: localMonthsWorked
                } ] } } = await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/salary/${salary._id}`);

                setLocations([ {
                    value: localLocation,
                    text: localLocation
                } ]);

                const endDate: Date = new Date(new Date(localFirstWorkDay).getFullYear(), new Date(localFirstWorkDay).getMonth() + parseInt(localMonthsWorked));
                const inputYears: string = `${new Date(localFirstWorkDay).getMonth() + 1}/${new Date(localFirstWorkDay).getFullYear()} - 
                    ${endDate.getMonth() + 1}/${endDate.getFullYear()}`;

                setYears([ {
                    value: inputYears,
                    text: inputYears
                } ]);

                setEmploymentForm([ localEmploymentForm ])
            } catch (error) {
                console.error(error.err);
            }
        }
        fetchEntryData();
    }, []);

    return (
        <div className="salaryEntry">
            {/* Title */}
            <div className="title">{`${salary.position} in ${salary.company}`}</div>
            {/* Technologies */}
            <div className="technologies">
                {salary.technologies.map((tech, i) => (
                    <div className="tech" key={i}>{tech}</div>
                ))}
            </div>
            {/* Description */}
            <div className="description">{salary.description}</div>
            {/* Salary */}
            <div className="salarySection">
                <div className="selectors">
                    <div className="location">
                        <select name="location">
                            {locations.map((loc: inputField, i: number) => (
                                <option key={i} value={loc.value}>{loc.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className="year">
                        <select name="year">
                            {years.map((year: inputField, i: number) => (
                                <option key={i} value={year.value}>{year.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className="employmentForm">
                        <select name="employmentForm">
                            {employmentForm.map((form: employmentFormTypes, i: number) => (
                                <option key={i} value={form}>{form}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="salaryScale">
                    {/* Average */}
                    <div>Průměrně na pozici: {`${salary.salary} / ${salary.salaryRate}`}</div>
                    {/* Industry interval */}
                    <div>Průměr odvětví: {`0 - 0`}</div>
                    {/* Company interval */}
                    <div>Průměr společnosti: {`0 - 0`}</div>
                </div>
            </div>
        </div>
    );
}

export default SalaryEntry;