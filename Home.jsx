import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadEmployees() {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(API_URL, { signal: controller.signal });
        setEmployees(response.data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError("We couldn't load the employee list. Check your connection and try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadEmployees();
    return () => controller.abort();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    const query = search.trim().toLowerCase();
    return (
      employee.name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      String(employee.id).includes(query)
    );
  });

  return (
    <section>
      <div className="hero-panel mb-4 mb-md-5">
        <div>
          <div className="eyebrow">PEOPLE &amp; DIRECTORY</div>
          <h1 className="display-6 fw-bold mt-2 mb-2">Employee Dashboard</h1>
          <p className="text-secondary mb-0">A simple overview of the employee directory.</p>
        </div>
        <div className="hero-icon" aria-hidden="true">👥</div>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-3">
        <div>
          <h2 className="h4 fw-bold mb-1">Employee Directory</h2>
          <p className="text-secondary small mb-0">Details are loaded from JSONPlaceholder.</p>
        </div>
        <div className="search-wrap">
          <label className="visually-hidden" htmlFor="employee-search">Search employees</label>
          <input
            id="employee-search"
            className="form-control"
            type="search"
            placeholder="Search name, email or ID..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div className="state-card text-center py-5" role="status">
          <div className="spinner-border text-primary mb-3" aria-hidden="true" />
          <p className="text-secondary mb-0">Loading employee directory…</p>
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
          <span>{error}</span>
          <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>Try again</button>
        </div>
      )}

      {!loading && !error && (
        <div className="directory-card">
          <div className="directory-toolbar d-flex justify-content-between align-items-center px-3 px-md-4 py-3">
            <span className="fw-semibold">All employees</span>
            <span className="count-pill">{filteredEmployees.length} {filteredEmployees.length === 1 ? "record" : "records"}</span>
          </div>
          <div className="table-responsive">
            <table className="table employee-table align-middle mb-0">
              <thead>
                <tr><th scope="col">ID</th><th scope="col">NAME</th><th scope="col">EMAIL ADDRESS</th></tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td><span className="id-chip">{String(employee.id).padStart(2, "0")}</span></td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <span className="avatar" aria-hidden="true">{employee.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</span>
                        <span className="fw-semibold">{employee.name}</span>
                      </div>
                    </td>
                    <td><a className="email-link" href={`mailto:${employee.email}`}>{employee.email}</a></td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr><td colSpan="3" className="text-center text-secondary py-5">No employees match your search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="directory-footer px-3 px-md-4 py-3 small text-secondary">
            Source: JSONPlaceholder demo API · No employee data is modified.
          </div>
        </div>
      )}
    </section>
  );
}