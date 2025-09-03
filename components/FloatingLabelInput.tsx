import React from 'react';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  Icon?: React.ElementType;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ id, name, label, Icon, ...props }) => {
  return (
    <div className="relative group">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors duration-300 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400" />}
      <input
        id={id}
        name={name}
        className={`peer w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-transparent text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-0 focus:border-indigo-500 dark:focus:border-indigo-400 placeholder-transparent transition-colors duration-300`}
        placeholder={label}
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-1/2 scale-75 top-0 left-2 origin-[0] bg-white dark:bg-gray-900 px-1 text-sm pointer-events-none 
                   peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 ${Icon ? 'peer-placeholder-shown:left-10' : 'peer-placeholder-shown:left-4'} peer-placeholder-shown:text-base 
                   peer-focus:scale-75 peer-focus:top-0 peer-focus:left-2 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-indigo-500 dark:peer-focus:text-indigo-400`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;