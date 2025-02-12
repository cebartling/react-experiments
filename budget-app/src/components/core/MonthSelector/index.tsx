import { FC } from 'react';

export const MonthSelector: FC = () => {
  return (
    <div className="flex flex-row">
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </button>
      <div className="">December 2024</div>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Forward
      </button>
    </div>
  );
};
