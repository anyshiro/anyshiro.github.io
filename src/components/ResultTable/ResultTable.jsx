import React, { memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ResultTable.css';

const ResultTable = ({ title, columns, data, className = '' }) => {
  
  const tableRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (tableRef.current) {
        setIsScrollable(
          tableRef.current.scrollWidth > tableRef.current.clientWidth
        );
      }
    };
    
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  return (
    <div className={`result-table-container ${className}`}>
      {title && <h3 className="table-title">{title}</h3>}
      
      <div className="table-wrapper ${isScrollable ? 'scrollable' : ''}" ref={tableRef}>
        <table className="result-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="header-cell">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="data-row">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="data-cell">
                    {row[column] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="scroll-indicator">← Прокрутите в сторону →</div>
      </div>
      
      {data.length === 0 && (
        <div className="empty-state">
          Нет данных для отображения
        </div>
      )}
    </div>
  );
};

ResultTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string
};

export default memo(ResultTable);