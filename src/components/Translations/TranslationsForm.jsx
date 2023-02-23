import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ASLTranslation from "./ASLTranslation";

const TranslationsForm = ({
  translationText,
  onTranslation,
  onTranslationTextChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitted, setSubmitted] = useState(false);
  const [previousTranslation, setPreviousTranslation] = useState("");

  const onSubmit = ({ translationText }) => {
    onTranslation(translationText);
    setSubmitted(true);
    setPreviousTranslation(translationText);
  };

  const handleInputChange = (value) => {
    setSubmitted(false);
    onTranslationTextChange(value);
  };

  return (
    <>
      <div className="containerTranslationsForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <label htmlFor="translation-notes">Text to translate:</label>
            <input
              type="text"
              {...register("translationText")}
              placeholder="Please, enter the message that you want to translate!"
              value={translationText}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <button type="submit">Translate</button>
          </fieldset>

          {submitted && <ASLTranslation translationText={translationText} />}

          {!submitted && previousTranslation && (
            <ASLTranslation translationText={previousTranslation} />
          )}
        </form>
      </div>
    </>
  );
};

export default TranslationsForm;