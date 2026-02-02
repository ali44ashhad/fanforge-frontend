// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// const PriceFilter = ({
//   min = 0,
//   max = 1000,
//   value = [min, max],
//   onPriceChange,
//   step = 1,
//   className = '',
// }) => {
//   const [localValue, setLocalValue] = useState(value);
//   const [isDragging, setIsDragging] = useState(false);

//   useEffect(() => {
//     setLocalValue(value);
//   }, [value]);

//   const handleMinChange = (e) => {
//     const newMin = Math.min(Number(e.target.value), localValue[1] - step);
//     const newValue = [newMin, localValue[1]];
//     setLocalValue(newValue);
//     onPriceChange(newValue);
//   };

//   const handleMaxChange = (e) => {
//     const newMax = Math.max(Number(e.target.value), localValue[0] + step);
//     const newValue = [localValue[0], newMax];
//     setLocalValue(newValue);
//     onPriceChange(newValue);
//   };

//   const handleSliderChange = (type, val) => {
//     let newValue;
//     if (type === 'min') {
//       newValue = [Math.min(val, localValue[1] - step), localValue[1]];
//     } else {
//       newValue = [localValue[0], Math.max(val, localValue[0] + step)];
//     }
//     setLocalValue(newValue);
//     onPriceChange(newValue);
//   };

//   const minPercentage = ((localValue[0] - min) / (max - min)) * 100;
//   const maxPercentage = ((localValue[1] - min) / (max - min)) * 100;

//   return (
//     <div className={`space-y-4 ${className}`}>
//       <h4 className="font-medium text-gray-900 dark:text-white">Price Range</h4>
      
//       {/* Price Display */}
//       <div className="flex items-center justify-between">
//         <div className="text-sm font-medium text-gray-900 dark:text-white">
//           ${localValue[0].toFixed(2)} - ${localValue[1].toFixed(2)}
//         </div>
//         <div className="text-xs text-gray-500 dark:text-gray-400">
//           Max: ${max.toFixed(2)}
//         </div>
//       </div>

//       {/* Slider */}
//       <div className="relative h-2">
//         {/* Background Track */}
//         <div className="absolute top-0 left-0 right-0 h-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        
//         {/* Selected Range */}
//         <div
//           className="absolute top-0 h-full bg-primary rounded-full"
//           style={{
//             left: `${minPercentage}%`,
//             width: `${maxPercentage - minPercentage}%`,
//           }}
//         ></div>
        
//         {/* Min Thumb */}
//         <input
//           type="range"
//           min={min}
//           max={max}
//           step={step}
//           value={localValue[0]}
//           onChange={(e) => handleSliderChange('min', Number(e.target.value))}
//           onMouseDown={() => setIsDragging(true)}
//           onMouseUp={() => setIsDragging(false)}
//           className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
//         />
        
//         {/* Max Thumb */}
//         <input
//           type="range"
//           min={min}
//           max={max}
//           step={step}
//           value={localValue[1]}
//           onChange={(e) => handleSliderChange('max', Number(e.target.value))}
//           onMouseDown={() => setIsDragging(true)}
//           onMouseUp={() => setIsDragging(false)}
//           className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
//         />
        
//         {/* Visual Thumbs */}
//         <div
//           className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer z-20"
//           style={{ left: `${minPercentage}%` }}
//         ></div>
//         <div
//           className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer z-20"
//           style={{ left: `${maxPercentage}%` }}
//         ></div>
//       </div>

//       {/* Input Fields */}
//       <div className="flex items-center justify-between gap-3">
//         <div className="flex-1">
//           <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Min</label>
//           <div className="relative">
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//             <input
//               type="number"
//               min={min}
//               max={max - step}
//               value={localValue[0]}
//               onChange={handleMinChange}
//               className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
//             />
//           </div>
//         </div>
//         <div className="text-gray-400 dark:text-gray-500 mt-5">to</div>
//         <div className="flex-1">
//           <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Max</label>
//           <div className="relative">
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
//             <input
//               type="number"
//               min={min + step}
//               max={max}
//               value={localValue[1]}
//               onChange={handleMaxChange}
//               className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Preset Price Ranges */}
//       <div className="grid grid-cols-2 gap-2">
//         {[
//           { label: 'Under $25', value: [0, 25] },
//           { label: '$25 - $50', value: [25, 50] },
//           { label: '$50 - $100', value: [50, 100] },
//           { label: '$100+', value: [100, max] },
//         ].map((preset) => (
//           <button
//             key={preset.label}
//             onClick={() => {
//               setLocalValue(preset.value);
//               onPriceChange(preset.value);
//             }}
//             className={`text-xs py-2 px-3 rounded-lg border transition-colors ${
//               localValue[0] === preset.value[0] && localValue[1] === preset.value[1]
//                 ? 'bg-primary text-white border-primary'
//                 : 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//             }`}
//           >
//             {preset.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// PriceFilter.propTypes = {
//   min: PropTypes.number,
//   max: PropTypes.number,
//   value: PropTypes.arrayOf(PropTypes.number),
//   onPriceChange: PropTypes.func.isRequired,
//   step: PropTypes.number,
//   className: PropTypes.string,
// };

// export default PriceFilter;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PriceFilter = ({
  min = 0,
  max = 1000,
  value = [min, max],
  onPriceChange,
  step = 1,
  className = '',
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), localValue[1] - step);
    const newValue = [newMin, localValue[1]];
    setLocalValue(newValue);
    onPriceChange(newValue);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), localValue[0] + step);
    const newValue = [localValue[0], newMax];
    setLocalValue(newValue);
    onPriceChange(newValue);
  };

  const handleSliderChange = (type, val) => {
    let newValue;
    if (type === 'min') {
      newValue = [Math.min(val, localValue[1] - step), localValue[1]];
    } else {
      newValue = [localValue[0], Math.max(val, localValue[0] + step)];
    }
    setLocalValue(newValue);
    onPriceChange(newValue);
  };

  const minPercentage = ((localValue[0] - min) / (max - min)) * 100;
  const maxPercentage = ((localValue[1] - min) / (max - min)) * 100;

  return (
    <div className={`space-y-4 ${className}`}>
      <h4 className="font-medium text-[#1D1D1F]">Price Range</h4>
      
      {/* Price Display */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-[#1D1D1F]">
          ${localValue[0].toFixed(2)} - ${localValue[1].toFixed(2)}
        </div>
        <div className="text-xs text-[#6E6E73]">
          Max: ${max.toFixed(2)}
        </div>
      </div>

      {/* Slider */}
      <div className="relative h-2">
        {/* Background Track */}
        <div className="absolute top-0 left-0 right-0 h-full bg-[#E5E5E7] rounded-full"></div>
        
        {/* Selected Range */}
        <div
          className="absolute top-0 h-full bg-[#007AFF] rounded-full"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
          }}
        ></div>
        
        {/* Min Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[0]}
          onChange={(e) => handleSliderChange('min', Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        {/* Max Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[1]}
          onChange={(e) => handleSliderChange('max', Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        {/* Visual Thumbs */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#007AFF] rounded-full shadow cursor-pointer z-20 transition-transform hover:scale-110"
          style={{ left: `${minPercentage}%` }}
        ></div>
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#007AFF] rounded-full shadow cursor-pointer z-20 transition-transform hover:scale-110"
          style={{ left: `${maxPercentage}%` }}
        ></div>
      </div>

      {/* Input Fields - min width so at least 4 digits visible */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[5rem]">
          <label className="block text-xs text-[#6E6E73] mb-1">Min</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6E73]">$</span>
            <input
              type="number"
              min={min}
              max={max - step}
              value={localValue[0]}
              onChange={handleMinChange}
              className="w-full min-w-[6ch] pl-8 py-2 border border-[#E5E5E7] rounded-lg bg-white text-[#1D1D1F] focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-0 transition-colors"
            />
          </div>
        </div>
        <div className="text-[#6E6E73] mt-5 shrink-0">to</div>
        <div className="flex-1 min-w-[5rem]">
          <label className="block text-xs text-[#6E6E73] mb-1">Max</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6E73]">$</span>
            <input
              type="number"
              min={min + step}
              max={max}
              value={localValue[1]}
              onChange={handleMaxChange}
              className="w-full min-w-[6ch] pl-8  py-2 border border-[#E5E5E7] rounded-lg bg-white text-[#1D1D1F] focus:outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-0 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Preset Price Ranges - all 4 always visible */}
      <div className="grid grid-cols-2 gap-2 min-w-0">
        {[
          { label: 'Under $25', value: [0, 25] },
          { label: '$25 - $50', value: [25, 50] },
          { label: '$50 - $100', value: [50, 100] },
          { label: '$100+', value: [100, max] },
        ].map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setLocalValue(preset.value);
              onPriceChange(preset.value);
            }}
            className={`text-xs py-2 px-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] min-w-0 overflow-hidden text-ellipsis ${
              localValue[0] === preset.value[0] && localValue[1] === preset.value[1]
                ? 'bg-[#007AFF] text-white border-[#007AFF]'
                : 'text-[#6E6E73] border-[#E5E5E7] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
};

PriceFilter.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.arrayOf(PropTypes.number),
  onPriceChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  className: PropTypes.string,
};

export default PriceFilter;