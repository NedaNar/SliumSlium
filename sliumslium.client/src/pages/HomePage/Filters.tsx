import { useEffect, useState } from "react";
import {
  PART_TIME_OPTIONS,
  EXPERIENCE_OPTIONS,
  WORK_ENVIRONMENT_OPTIONS,
} from "../../utils/enumUtils";
import M from "materialize-css";

interface FiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [moreFilters, setMoreFilters] = useState(false);

  const [nameDescription, setNameDescription] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [experience, setExperience] = useState("");
  const [partTime, setPartTime] = useState("");
  const [workEnvironment, setWorkEnvironment] = useState("");

  useEffect(() => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }, [moreFilters]);

  const handleApplyFilters = () => {
    const filters = {
      Name: nameDescription || "",
      Location: location || "",
      CompanyName: company || "",
      ExperienceLevel: experience || "",
      WorkEnvironment: workEnvironment || "",
      PartTime: partTime || "",
    };

    const queryParams = new URLSearchParams(filters as any).toString();

    if (queryParams) {
      fetch(`https://localhost:7091/api/JobOffer/Query?${queryParams}`)
        .then(async (response) => {
          if (!response.ok) {
            M.toast({
              html: `API returned error: ${response.status} ${response.statusText}`,
              classes: "red",
            });
          }
          return response.text();
        })
        .then((data) => {
          try {
            const jsonData = JSON.parse(data);

            const fetchedLength = Array.isArray(jsonData) ? jsonData.length : 0;

            if (fetchedLength === 0) {
              M.toast({
                html: "No job offers found. Try adjusting the filters.",
                classes: "red",
              });
            }
            onFilterChange(jsonData);
          } catch (error) {}
        })
        .catch((error) => {
          M.toast({
            html: `Error fetching job offers: ${error}`,
            classes: "red",
          });
        });
    }
  };

  const handleClearFilters = () => {
    setNameDescription("");
    setLocation("");
    setCompany("");
    setExperience("");
    setPartTime("");
    setWorkEnvironment("");

    setTimeout(() => {
      const elems = document.querySelectorAll("select");
      M.FormSelect.init(elems);
    }, 0);
  };

  return (
    <div
      className="grey lighten-4"
      style={{
        padding: "1rem 10% 0.5rem",
        margin: "2rem 0",
        borderRadius: "8px",
      }}
    >
      <div>
        <div className="row" style={{ display: "flex" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              marginRight: "48px",
            }}
          >
            <i className="material-icons" style={{ marginRight: "16px" }}>
              search
            </i>
            <input
              type="text"
              placeholder="Search"
              value={nameDescription}
              onChange={(e) => setNameDescription(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="btn indigo lighten-1"
              onClick={handleApplyFilters}
            >
              Search
            </button>
            <button
              className="btn indigo lighten-2"
              onClick={handleClearFilters}
              style={{ margin: "0 0 0 1rem" }}
            >
              Clear filters
            </button>
          </div>
        </div>

        {moreFilters && (
          <div className="row">
            <div className="row">
              <div
                className="row valign-wrapper input-field col s6"
                style={{ padding: "0 18px" }}
              >
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <label htmlFor="location">Location</label>
              </div>

              <div
                className="row valign-wrapper input-field col s6"
                style={{ padding: "0 18px" }}
              >
                <input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <label htmlFor="company">Company</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s4" style={{ padding: "0 18px" }}>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  {EXPERIENCE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <label>Experience</label>
              </div>

              <div className="input-field col s4" style={{ padding: "0 18px" }}>
                <select
                  value={workEnvironment}
                  onChange={(e) => setWorkEnvironment(e.target.value)}
                >
                  {WORK_ENVIRONMENT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <label>Work environment</label>
              </div>

              <div className="input-field col s4" style={{ padding: "0 18px" }}>
                <select
                  value={partTime}
                  onChange={(e) => setPartTime(e.target.value)}
                >
                  {PART_TIME_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <label>Part Time</label>
              </div>
            </div>
          </div>
        )}

        <div
          className="valign-wrapper"
          style={{
            justifyContent: "center",
          }}
        >
          <button
            className="btn-flat"
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => setMoreFilters((prev) => !prev)}
          >
            {!moreFilters && (
              <>
                <span>More filters</span>
                <i style={{ margin: "0 0.6rem" }} className="material-icons">
                  keyboard_arrow_down
                </i>
              </>
            )}
            {moreFilters && (
              <>
                <span>Hide filters</span>
                <i style={{ margin: "0 0.6rem" }} className="material-icons">
                  keyboard_arrow_up
                </i>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
