import React from 'react';
import { Palette } from 'lucide-react';

const ColorInput = ({ label, value, onChange }) => {
  return (
    <div className="relative group cursor-pointer">
      <div className="absolute inset-0 bg-gray-100 rounded-xl transform transition-transform group-hover:scale-105 group-hover:bg-gray-200" />
      <div className="relative p-3 flex items-center justify-between border border-gray-200 rounded-xl bg-white shadow-sm transition-shadow group-hover:shadow-md">
        
        <div className="flex items-center gap-3">
            <div 
                className="w-10 h-10 rounded-lg shadow-inner border border-gray-100 transition-transform group-hover:scale-110" 
                style={{ backgroundColor: value }}
            />
            <div>
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
                <span className="font-mono text-sm font-medium text-gray-900">{value}</span>
            </div>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400">
            <Palette className="w-5 h-5" />
        </div>

        <input 
            type="color" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ColorInput;
