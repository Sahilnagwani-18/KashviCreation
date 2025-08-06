import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { motion } from "framer-motion";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  className = "",
  inputClassName = "",
  buttonClassName = "",
}) {
  function renderInputsByComponentType(controlItem) {
    const value = formData[controlItem.name] || "";

    const baseInputStyle =
      inputClassName ||
      "w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4B2A3A] bg-white/90";

    switch (controlItem.componentType) {
      case "input":
        return (
          <Input
            name={controlItem.name}
            id={controlItem.name}
            type={controlItem.type}
            placeholder={controlItem.placeholder}
            value={value}
            className={baseInputStyle}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(val) =>
              setFormData({ ...formData, [controlItem.name]: val })
            }
          >
            <SelectTrigger className={baseInputStyle}>
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {controlItem.options?.map((optionItem) => (
                <SelectItem
                  key={optionItem.id}
                  value={optionItem.id}
                  className="hover:bg-[#823c8d]"
                >
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            name={controlItem.name}
            id={controlItem.name}
            placeholder={controlItem.placeholder}
            value={value}
            className={baseInputStyle}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
          />
        );

      default:
        return (
          <Input
            name={controlItem.name}
            id={controlItem.name}
            type={controlItem.type}
            placeholder={controlItem.placeholder}
            value={value}
            className={baseInputStyle}
            onChange={(e) =>
              setFormData({ ...formData, [controlItem.name]: e.target.value })
            }
          />
        );
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={onSubmit}
      className={`space-y-6 ${className}`}
    >
      <div className="flex flex-col gap-4">
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className="space-y-1">
            <Label
              htmlFor={controlItem.name}
              className="text-sm font-medium text-[#4B2A3A]"
            >
              {controlItem.label}
            </Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isBtnDisabled}
        type="submit"
        className={
          buttonClassName ||
          "w-full py-2 bg-[#ac60b8] text-[#4B2A3A] font-semibold rounded-md hover:bg-[#852596] transition-all duration-300"
        }
      >
        {buttonText || "Submit"}
      </motion.button>
    </motion.form>
  );
}

export default CommonForm;
