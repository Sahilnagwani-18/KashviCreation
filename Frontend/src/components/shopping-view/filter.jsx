import { filterOptions } from "@/config";
import { Fragment, useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ProductFilter = ({ filters, handleFilter }) => {
  const [openSections, setOpenSections] = useState(
    Object.keys(filterOptions).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {})
  );

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <aside className="bg-[#F1D7F5] rounded-lg shadow-md overflow-hidden w-full max-w-xs mx-auto md:mx-0">
      {/* Header */}
      <div className="px-4 py-3 bg-[#4B2A3A]">
        <h2 className="text-base font-bold text-white tracking-wide">FILTERS</h2>
      </div>

      {/* Filter Groups */}
      <div className="divide-y w-full divide-gray-200">
        {Object.entries(filterOptions).map(([group, options]) => (
          <Fragment key={group}>
            <button
              onClick={() => toggleSection(group)}
              className="flex w-full items-center justify-between px-2 py-2 bg-[#F1D7F5] hover:bg-[#e7bfe9] transition"
            >
              <span className="font-semibold text-sm text-[#4B2A3A] capitalize">
                {group}
              </span>
              {openSections[group] ? (
                <FaChevronUp className="text-[#4B2A3A] text-sm" />
              ) : (
                <FaChevronDown className="text-[#4B2A3A] text-sm" />
              )}
            </button>

            {openSections[group] && (
              <div className="bg-white px-2 py-2 w-full">
                <div className="flex flex-wrap overflow-hidden  ">
                  {options.map((opt) => {
                    const isChecked = filters[group]?.includes(opt.id) ?? false;
                    return (
                      <Label
                        key={opt.id}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs whitespace-nowrap ${
                          isChecked
                            ? "bg-[#EED1E7] border-[#4B2A3A] text-[#4B2A3A]"
                            : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => handleFilter(group, opt.id)}
                          className="h-3 w-3 border-gray-400"
                        />
                        {opt.label}
                      </Label>
                    );
                  })}
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-4 py-3 bg-[#F1D7F5] border-t border-gray-200">
        <button
          onClick={() => handleFilter("clearAll")}
          className="text-xs font-medium text-[#4B2A3A] hover:underline"
        >
          Clear All
        </button>
        <button
          onClick={() => handleFilter("apply")}
          className="px-3 py-1 bg-[#4B2A3A] text-white text-xs font-semibold rounded-md hover:bg-[#7A2E54] transition"
        >
          Apply
        </button>
      </div>
    </aside>
  );
};

export default ProductFilter;
