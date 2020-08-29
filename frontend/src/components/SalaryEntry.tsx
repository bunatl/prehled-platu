import React, { useState, useRef } from 'react';

interface Salary {
    position: string;
    company: string;
    technologies: string[];
    description: string;
    location: string;
    date: Date;
    salary: number;
}

const SalaryEntry: React.FC = () => {
    const [ salary ] = useState<Salary>({
        position: "SW Engineer",
        company: "Bunat s.r.o",
        technologies: [ "ReactJS", "Node.js", "npm", "SCSS", "TypeScript" ],
        description: "Very talented and perspective web developer",
        location: "Prague, Czech Republic",
        date: new Date(),
        salary: 75000
    });

    // will fetch from DB in useEffect
    const years = [
        { value: "2020", text: "2020" },
        { value: "2019", text: "2019" },
        { value: "2018", text: "2018" },
        { value: "2017", text: "2017" },
        { value: "2016", text: "2016" },
    ]

    const locations = [
        { value: "Praha", text: "Praha" },
        { value: "Kladno, Stredocesky kraj", text: "Kladno, Stredocesky kraj" },
        { value: "Brno, Jihomoravsky kraj", text: "Brno, Jihomoravsky kraj" },
        { value: "Zlin, Zlinsky kraj", text: "Zlin, Zlinsky kraj" },
    ]

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
                            {locations.map((loc, i) => (
                                <option key={i} value={loc.value}>{loc.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className="year">
                        <select name="year">
                            {years.map((year, i) => (
                                <option key={i} value={year.value}>{year.text}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="salaryScale">
                    {/* Average */}
                    <div>Průměrně na pozici: {salary.salary}</div>
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