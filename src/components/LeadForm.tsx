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
    surName: "",
    gender: "",
    dob: "",
    idNumber: "",
    projectName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    preferredContact: "",
    clientSource: "website",
    locationType: "KENYA",
    county: "",
    country: "",
    productOffering: "JENGA_KWAKO",
    productTag: "",
    bankName: "",
    bankBranch: "",
    consultancySubtags: [],
    followUpDate: "",
    notes: "",
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
    if (!formData.phoneNumber.match(/^\+?\d{10,14}$/))
      newErrors.phoneNumber = "Valid phone number is required";
    if (!formData.preferredContact)
      newErrors.preferredContact = "Preferred contact method is required";
    if (formData.locationType === "INTERNATIONAL" && !formData.country)
      newErrors.country = "Please select a country";
    if (formData.locationType === "KENYA" && !formData.county)
      newErrors.county = "Please select a county";
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
      // Reset irrelevant fields when locationType changes
      if (name === "locationType") {
        newFormData.country =
          value === "INTERNATIONAL" ? newFormData.country : "";
        newFormData.county = value === "KENYA" ? newFormData.county : "";
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
      const apiData = {
        firstName: formData.firstName,
        secondName: formData.secondName,
        surName: formData.surName || "",
        gender: formData.gender || "",
        dob: formData.dob || "",
        idNumber: formData.idNumber || "",
        projectName: formData.projectName || "",
        email: formData.email,
        countryCode: formData.phoneNumber.startsWith("+")
          ? formData.phoneNumber.match(/^\+\d{1,4}/)?.[0] || ""
          : "",
        phoneNumber: formData.phoneNumber,
        preferredContact: formData.preferredContact || "",
        clientSource: "website",
        locationType: formData.locationType,
        county: formData.county || null,
        country: formData.country || null,
        productOffering: "JENGA_KWAKO",
        productTag: formData.productTag || "",
        bankName: formData.bankName || "",
        bankBranch: formData.bankBranch || "",
        consultancySubtags: formData.consultancySubtags || [],
        followUpDate: formData.followUpDate || "",
        notes: formData.notes || "",
      };
      console.log("Submitting API payload:", JSON.stringify(apiData, null, 2));
      const response = await fetch(
        "https://bbsltd.ke/api/api/clients/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API error response:", errorData);
        throw new Error(
          `Failed to submit: ${errorData.message || response.statusText}`
        );
      }
      await response.json();
      setSubmitStatus("success");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Submission failed. Please try again.";
      console.error("Submission error:", errorMessage);
      setSubmitStatus("error");
      setErrors({
        api: errorMessage,
      });
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
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleOutsideClick}
      >
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4 text-center relative">
          <div className="mb-6">
            <svg
              className="checkmark w-16 h-16 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark-check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
          <h2 className="font-sans text-2xl font-semibold text-gray-800 mb-2">
            Details Successfully Submitted!
          </h2>
          <p className="font-sans text-base text-gray-600 mb-6">
            Thank you{formData.firstName ? `, ${formData.firstName}` : ""}!{" "}
            We'll be in touch soon.
          </p>

          <button
            type="button"
            className="absolute top-4 right-4 text-gray-600 text-xl font-medium hover:text-gray-800 transition-colors"
            onClick={onClose}
            aria-label="Close success message"
          >
            ×
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
                value="MALE"
                checked={formData.gender === "MALE"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="FEMALE"
                checked={formData.gender === "FEMALE"}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="RATHER_NOT_SAY"
                checked={formData.gender === "RATHER_NOT_SAY"}
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
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={errors.phoneNumber ? "lead-form-error-input" : ""}
          />
          {errors.phoneNumber && (
            <span className="lead-form-error">{errors.phoneNumber}</span>
          )}
        </div>
        <div className="lead-form-group text-left">
          <label>Preferred contact method</label>
          <div className="lead-form-radio-group">
            <label>
              <input
                type="radio"
                name="preferredContact"
                value="CALL"
                checked={formData.preferredContact === "CALL"}
                onChange={handleChange}
              />
              Call
            </label>
            <label>
              <input
                type="radio"
                name="preferredContact"
                value="SMS"
                checked={formData.preferredContact === "SMS"}
                onChange={handleChange}
              />
              SMS
            </label>
            <label>
              <input
                type="radio"
                name="preferredContact"
                value="WHATSAPP"
                checked={formData.preferredContact === "WHATSAPP"}
                onChange={handleChange}
              />
              WhatsApp
            </label>
            <label>
              <input
                type="radio"
                name="preferredContact"
                value="EMAIL"
                checked={formData.preferredContact === "EMAIL"}
                onChange={handleChange}
              />
              Email
            </label>
          </div>
          {errors.preferredContact && (
            <span className="lead-form-error">{errors.preferredContact}</span>
          )}
        </div>
        <div className="lead-form-group text-left">
          <label htmlFor="locationType">Location</label>
          <select
            id="locationType"
            name="locationType"
            value={formData.locationType}
            onChange={handleChange}
          >
            <option value="KENYA">Kenya</option>
            <option value="INTERNATIONAL">International</option>
          </select>
        </div>
        {formData.locationType === "KENYA" && (
          <div className="lead-form-group text-left">
            <label htmlFor="county">County</label>
            <select
              id="county"
              name="county"
              value={formData.county}
              onChange={handleChange}
              className={errors.county ? "lead-form-error-input" : ""}
              aria-required="true"
            >
              {kenyaCounties.map((county) => (
                <option key={county || "empty"} value={county}>
                  {county || "Select a county"}
                </option>
              ))}
            </select>
            {errors.county && (
              <span className="lead-form-error">{errors.county}</span>
            )}
          </div>
        )}
        {formData.locationType === "INTERNATIONAL" && (
          <div className="lead-form-group text-left">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={errors.country ? "lead-form-error-input" : ""}
              aria-required="true"
            >
              {countries.map((country) => (
                <option key={country || "empty"} value={country}>
                  {country || "Select a country"}
                </option>
              ))}
            </select>
            {errors.country && (
              <span className="lead-form-error">{errors.country}</span>
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
