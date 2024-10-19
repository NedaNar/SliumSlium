import { useEffect, useState } from "react";
import {
  STATUS_OPTIONS,
} from "../../utils/enumUtils";
import M from "materialize-css";

interface ApplicantFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function ApplicantFilters({
  onFilterChange,
}: ApplicantFiltersProps) {
  const [selectedName, setSelectedName] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  useEffect(() => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }, []);

  const handleApplyFilters = () => {};

  const handleClearFilters = () => {
    setSelectedName("");
    setSelectedStatuses([]);

    setTimeout(() => {
      const elems = document.querySelectorAll("select");
      M.FormSelect.init(elems);
    }, 0);
  };

  const handleStatusChange = (e: { target: { options: any } }) => {
    const options = e.target.options;
    const values = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setSelectedStatuses(values);
  };

  return (
    <div
      className="grey lighten-4"
      style={{
        padding: "0.5rem 2% 0rem",
        margin: "2rem 0",
        borderRadius: "8px",
      }}
    >
      <div>
        <div className="valign-wrapper" style={{ flexWrap: "wrap" }}>
          <div className="col s12 m4">
            <input
              type="text"
              placeholder="Name & surname"
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
            />
          </div>

          <div className="input-field col s12 m4" style={{ padding: "0 8px" }}>
            <select
              multiple
              value={selectedStatuses}
              onChange={handleStatusChange}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <label>Application status</label>
          </div>

          <div className="col s12 m4 right-align">
            <button
              className="btn indigo lighten-1"
              onClick={handleApplyFilters}
            >
              Search
            </button>
            <button
              className="btn-flat"
              onClick={handleClearFilters}
              style={{ margin: "0 0 0 0.5rem" }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
