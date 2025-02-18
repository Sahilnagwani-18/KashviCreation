// import { filterOptions } from "@/config";
// import { Fragment } from "react";
// import { Label } from "../ui/label";
// import { Checkbox } from "../ui/checkbox";
// import { Separator } from "../ui/separator";

// function ProductFilter({ filters, handleFilter }) {
//   return (
//     <div className="bg-background rounded-lg shadow-sm">
//       <div className="p-4 border-b">
//         <h2 className="text-lg font-extrabold">Filters</h2>
//       </div>
//       <div className="p-4 space-y-4">
//         {Object.keys(filterOptions).map((keyItem) => (
//           <Fragment>
//             <div>
//               <h3 className="text-base font-bold">{keyItem}</h3>
//               <div className="grid gap-2 mt-2">
//                 {filterOptions[keyItem].map((option) => (
//                   <Label className="flex font-medium items-center gap-2 ">
//                     <Checkbox
//                       checked={
//                         filters &&
//                         Object.keys(filters).length > 0 &&
//                         filters[keyItem] &&
//                         filters[keyItem].indexOf(option.id) > -1
//                       }
//                       onCheckedChange={() => handleFilter(keyItem, option.id)}
//                     />
//                     {option.label}
//                   </Label>
//                 ))}
//               </div>
//             </div>
//             <Separator />
//           </Fragment>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductFilter;



import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm w-full max-w-xs mx-auto md:max-w-full md:mx-0">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>

      {/* Filter Options */}
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold mb-2">{keyItem}</h3>
              <div className="grid gap-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 font-medium text-sm"
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      className="h-4 w-4" // Adjust checkbox size
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator className="my-4" /> {/* Add spacing between sections */}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;