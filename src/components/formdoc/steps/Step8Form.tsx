import React, { useState } from 'react';
import { languageOptions } from "../../../api/infoModalidad";
import  "../style/SkillSoft.css";

// Interface for language proficiency levels
interface Language {
  language: string;
  writing: string;
  speaking: string;
  reading: string;
  listening: string;
}

export const Step8Form = () => {
  // State for Soft Skills
  const [skills, setSkills] = useState<string[]>([""]);

  // State for Languages
  const [languages, setLanguages] = useState<Language[]>([
    { language: "", writing: "", speaking: "", reading: "", listening: "" },
  ]);

  // Handle adding a new skill
  const handleAddSkill = () => setSkills([...skills, ""]);

  // Handle updating skill
  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  // Handle removing a skill
  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // Handle adding a new language
  const handleAddLanguage = () => {
    setLanguages([
      ...languages,
      { language: "", writing: "", speaking: "", reading: "", listening: "" },
    ]);
  };

  // Handle language proficiency change
  const handleLanguageChange = (index: number, field: string, value: string) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index][field as keyof Language] = value;
    setLanguages(updatedLanguages);
  };

  return (
    <div className="softskills-languages-container">
      {/* Soft Skills Section */}
      <h2 className="skills-title">Habilidades Blandas</h2>
      <p className="skills-description">
        En este apartado usa palabras clave para definir tus cualidades de manera concisa.
      </p>
      <div className="skills-section">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <input
              className="skill-input"
              type="text"
              placeholder={`Habilidad ${index + 1}`}
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              required
            />
            {skills.length > 1 && (
              <button
                className="remove-skill-btn"
                onClick={() => handleRemoveSkill(index)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        <button className="add-skill-btn" onClick={handleAddSkill}>
          Agregar nueva habilidad
        </button>
      </div>

      {/* Languages Section */}
      <h2 className="languages-title">Idiomas</h2>
      <p className="languages-description">
        Selecciona los idiomas más relevantes que dominas.
      </p>
      <div className="languages-section">
        {languages.map((language, index) => (
          <div key={index} className="language-item">
            {/* Language Select */}
            <label className="language-label">
              Idioma:
              <select
                className="language-select"
                value={language.language}
                onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                required
              >
                <option value="">Seleccione un idioma</option>
                {languageOptions.map((option) => (
                  <option key={option.id} value={option.mod}>
                    {option.mod}
                  </option>
                ))}
              </select>
            </label>

            {/* Proficiency Levels (Writing, Speaking, Reading, Listening) */}
            {['writing', 'speaking', 'reading', 'listening'].map((skill) => (
              <div key={skill} className={`language-${skill}`}>
                <label>{`Nivel de ${skill}:`}</label>
                {['Básico', 'Medio', 'Avanzado'].map((level) => (
                  <div key={level} className="checkbox-wrapper-19">
                    <input
                      id={`${skill}-${level}-${index}`}
                      type="radio"
                      name={`${skill}-${index}`}
                      value={level}
                      checked={language[skill as keyof Language] === level}
                      onChange={(e) => handleLanguageChange(index, skill, e.target.value)}
                    />
                    <label className="check-box" htmlFor={`${skill}-${level}-${index}`}></label>
                    <span>{level}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
        <button className="add-skill-btn" onClick={handleAddLanguage}>
          Agregar idioma
        </button>
      </div>
    </div>
  );
};
