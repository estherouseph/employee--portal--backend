import { useState } from "react";

const initialForm = { name: "", designation: "", location: "", salary: "" };

export default function EmployeeForm() {
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(`All fields are valid for ${formData.name}. This demo does not save or send the data.`);
    setFormData(initialForm);
  }

  return (
    <section className="form-page">
      <div className="mb-4">
        <div className="eyebrow">EMPLOYEE MANAGEMENT</div>
        <h1 className="display-6 fw-bold mt-2 mb-2">Employee Form</h1>
        <p className="text-secondary mb-0">Fill in the details below to validate the form.</p>
      </div>

      {message && <div className="alert alert-success" role="status">{message}</div>}

      <div className="form-card">
        <div className="form-card-heading">
          <span className="form-heading-icon" aria-hidden="true">＋</span>
          <div>
            <h2 className="h5 fw-bold mb-1">Employee information</h2>
            <p className="small text-secondary mb-0">All fields are required.</p>
          </div>
        </div>
        <form className="p-4 p-md-5" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="form-label">Full name</label>
            <input id="name" name="name" type="text" className="form-control form-control-lg" placeholder="e.g. Alex Morgan" value={formData.name} onChange={handleChange} autoComplete="name" required />
          </div>
          <div className="mb-4">
            <label htmlFor="designation" className="form-label">Designation</label>
            <input id="designation" name="designation" type="text" className="form-control form-control-lg" placeholder="e.g. Software Engineer" value={formData.designation} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="form-label">Location</label>
            <input id="location" name="location" type="text" className="form-control form-control-lg" placeholder="e.g. Kochi, Kerala" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label htmlFor="salary" className="form-label">Salary</label>
            <div className="input-group input-group-lg">
              <span className="input-group-text">₹</span>
              <input id="salary" name="salary" type="number" min="0" step="0.01" className="form-control" placeholder="e.g. 45000" value={formData.salary} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-note small mb-4">Demo mode: submitting validates the fields only. Nothing is sent to a backend.</div>
          <div className="d-flex flex-column flex-sm-row gap-2">
            <button type="submit" className="btn btn-primary btn-lg px-4">Validate form <span aria-hidden="true">→</span></button>
            <button type="reset" className="btn btn-light btn-lg px-4" onClick={() => { setFormData(initialForm); setMessage(""); }}>Clear form</button>
          </div>
        </form>
      </div>
    </section>
  );
}