"use client";

import React, { useState, useEffect } from "react";
import { LeadFormData } from "@/types";
import { countries, kenyaCounties } from "@/data/location";

interface LeadFormProps {
  onClose: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: "",
    secondName: "",
    gender: "",
    email: "",
    phone: "",
    contactMethod: "",
    location: "Kenya",
    diasporaCountry: "",
    kenyaCounty: "",
    consent: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LeadFormData | "api", string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    document.body.classList.add("form-open");
    return () => {
      document.body.classList.remove("form-open");
    };
  }, []);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof LeadFormData | "api", string>> = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.secondName.trim())
      newErrors.secondName = "Second name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.email.match(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Valid email is required";
    if (!formData.phone.match(/^\+?\d{10,14}$/))
      newErrors.phone = "Valid phone number is required";
    if (!formData.contactMethod)
      newErrors.contactMethod = "Preferred contact method is required";
    if (formData.location === "Diaspora" && !formData.diasporaCountry)
      newErrors.diasporaCountry = "Country is required";
    if (formData.location === "Kenya" && !formData.kenyaCounty)
      newErrors.kenyaCounty = "County is required";
    if (!formData.consent) newErrors.consent = "You must consent to proceed";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      // Reset irrelevant fields when location changes
      if (name === "location") {
        newFormData.diasporaCountry =
          value === "Diaspora" ? newFormData.diasporaCountry : "";
        newFormData.kenyaCounty =
          value === "Kenya" ? newFormData.kenyaCounty : "";
      }
      return newFormData;
    });
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Placeholder API call (replace with your endpoint)
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit");
      }
      await response.json(); // Ensure response is consumed
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
      setErrors({ api: "Submission failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="lead-form-success-container" onClick={handleOutsideClick}>
        <div className="lead-form-success-content">
          <h2 className="lead-form-success-message">
            Details successfully submitted!
          </h2>
          <button
            type="button"
            className="lead-form-close-button"
            onClick={onClose}
            aria-label="Close success message"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="lead-form-container"
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
    >
      <form className="lead-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="lead-form-close-button"
          onClick={onClose}
          aria-label="Close form"
        >
          ×
        </button>
        <h2 className="lead-form-title">Request a call back</h2>

        <div className="lead-form-group text-left">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? "lead-form-error-input" : ""}
          />
          {errors.firstName && (
            <span className="lead-form-error">{errors.firstName}</span>
          )}
        </div>
        <div className="lead-form-group text-left">
          <label htmlFor="secondName">Second Name</label>
          <input
            type="text"
            id="secondName"
            name="secondName"
            value={formData.secondName}
            onChange={handleChange}
            className={errors.secondName ? "lead-form-error-input" : ""}
          />
          {errors.secondName && (
            <span className="lead-form-error">{errors.secondName}</span>
          )}
        </div>
        <div className="lead-form-group text-left">
          <label>Gender</label>
          <div className="lead-form-radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Rather not say"
                checked={formData.gender === "Rather not say"}
                onChange={handleChange}
              />
              Rather not say
            </label>
          </div>
          {errors.gender && (
            <span className="lead-form-error">{errors.gender}</span>
          )}
        </div>
        <div className="lead-form-group text-left">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "lead-form-error-input" : ""}
          />
          {errors.email && (
            <span className="lead-form-error">{errors.email}</span>
          )}
        </div>
        <div className="lead-form-group text-left">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "lead-form-error-input" : ""}
          />
          {errors.phone && (
            <span className="lead-form-error">{errors.phone}</span>
          )}
        </div>
        <div className="lead-form-group text-left">
          <label>Preferred contact method</label>
          <div className="lead-form-radio-group">
            <label>
              <input
                type="radio"
                name="contactMethod"
                value="Call"
                checked={formData.contactMethod === "Call"}
                onChange={handleChange}
              />
              Call
            </label>
            <label>
              <input
                type="radio"
                name="contactMethod"
                value="SMS"
                checked={formData.contactMethod === "SMS"}
                onChange={handleChange}
              />
              SMS
            </label>
            <label>
              <input
                type="radio"
                name="contactMethod"
                value="WhatsApp"
                checked={formData.contactMethod === "WhatsApp"}
                onChange={handleChange}
              />
              WhatsApp
            </label>
            <label>
              <input
                type="radio"
                name="contactMethod"
                value="Email"
                checked={formData.contactMethod === "Email"}
                onChange={handleChange}
              />
              Email
            </label>
          </div>
          {errors.contactMethod && (
            <span className="lead-form-error">{errors.contactMethod}</span>
          )}
        </div>
        <div className="lead-form-group text-left">
          <label htmlFor="location">Location</label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          >
            <option value="Kenya">Kenya</option>
            <option value="Diaspora">Diaspora</option>
          </select>
        </div>
        {formData.location === "Kenya" && (
          <div className="lead-form-group text-left">
            <label htmlFor="kenyaCounty">County</label>
            <select
              id="kenyaCounty"
              name="kenyaCounty"
              value={formData.kenyaCounty}
              onChange={handleChange}
              className={errors.kenyaCounty ? "lead-form-error-input" : ""}
              aria-required="true"
            >
              {kenyaCounties.map((county) => (
                <option key={county || "empty"} value={county}>
                  {county || "Select a county"}
                </option>
              ))}
            </select>
            {errors.kenyaCounty && (
              <span className="lead-form-error">{errors.kenyaCounty}</span>
            )}
          </div>
        )}
        {formData.location === "Diaspora" && (
          <div className="lead-form-group text-left">
            <label htmlFor="diasporaCountry">Country</label>
            <select
              id="diasporaCountry"
              name="diasporaCountry"
              value={formData.diasporaCountry}
              onChange={handleChange}
              className={errors.diasporaCountry ? "lead-form-error-input" : ""}
              aria-required="true"
            >
              {countries.map((country) => (
                <option key={country || "empty"} value={country}>
                  {country || "Select a country"}
                </option>
              ))}
            </select>
            {errors.diasporaCountry && (
              <span className="lead-form-error">{errors.diasporaCountry}</span>
            )}
          </div>
        )}
        <div className="lead-form-group text-left">
          <label className="lead-form-consent-label">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              aria-required="true"
            />
            I consent to my data being used for communication purposes only.
          </label>
          {errors.consent && (
            <span className="lead-form-error">{errors.consent}</span>
          )}
        </div>
        {errors.api && <span className="lead-form-error">{errors.api}</span>}
        <button
          type="submit"
          className="lead-form-submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
