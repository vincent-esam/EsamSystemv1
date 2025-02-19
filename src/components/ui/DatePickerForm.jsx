import { useState } from "react";

export const DatePicker = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1910 + 1 },
    (_, i) => 1910 + i
  );

  return (
    <div>
      <div className="form-group form-select-sm col-md-4 col-sm-12">
        <select
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="country-item form-control"
          name="dia"
          id="dia"
          required
        >
          <option value="">Día</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <span className="error-text"></span>
        <i className="error-icon"></i>
      </div>
      <div className="form-group form-select-sm col-md-4 col-sm-12">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="country-item form-control"
          required
          name="mes"
          id="mes"
        >
          <option value="">Mes</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <span className="error-text"></span>
        <i className="error-icon"></i>
      </div>
      <div className="form-group form-select-sm col-md-4 col-sm-12">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="country-item form-control"
          required
          name="anio"
          id="anio"
        >
          <option value="">Año</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <span className="error-text"></span>
        <i className="error-icon"></i>
      </div>
    </div>
  );
};
