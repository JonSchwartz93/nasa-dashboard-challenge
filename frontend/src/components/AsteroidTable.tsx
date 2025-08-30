import { useState, useMemo } from 'react';
import { ProcessedNearEarthObject, SortField, SortDirection } from '../types/nasa';
import { asteroidTableStyles as styles } from './styles';
import { GoAlertFill, GoChevronDown, GoChevronUp } from "react-icons/go";
import { sortAsteroids } from '../utils/sortAsteroids';

type AsteroidTableProps = {
  asteroids: ProcessedNearEarthObject[];
}

const AsteroidTable = ({ asteroids }: AsteroidTableProps) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedAsteroids = useMemo(() => {
    return sortAsteroids(asteroids, sortField, sortDirection);
  }, [asteroids, sortField, sortDirection]);

  const totalHazardousAsteroids = sortedAsteroids.filter(asteroid => asteroid.is_potentially_hazardous).length;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

const getSortIcon = (field: SortField) => {
  if (sortField !== field) {
    return <GoChevronUp className="w-4 h-4 text-gray-400 opacity-50" />;
  }
  return sortDirection === 'asc' ? 
    <GoChevronUp className="w-4 h-4 text-blue-500" /> : 
    <GoChevronDown className="w-4 h-4 text-blue-500" />;
};

 const getRowClassName = (index: number) => {
    const baseClass = styles.row.base;
    const bgClass = index % 2 === 0 ? styles.row.even : styles.row.odd;
    return `${baseClass} ${bgClass}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header.wrapper}>
        <h2 className={styles.header.title}>
          For your selected dates, there are {sortedAsteroids.length} Near-Earth Asteroids
        </h2>
        <h3 className={styles.header.title}>
          <GoAlertFill className={styles.icons.hazard} />
          { `Total Hazardous Asteroids: ${totalHazardousAsteroids}` }
        </h3>
        
        <p className={styles.header.subtitle}>Click column headers to sort</p>
      </div>
      
      <div className={styles.table.wrapper}>
        <table className={styles.table.table}>
          <thead className={styles.table.thead}>
            <tr>
              <th onClick={() => handleSort('name')} className={styles.table.th}>
                <div className={styles.table.thContent}>
                  <span>Name</span>
                  <div className={styles.table.sortIcon}>
                    {getSortIcon('name')}
                  </div>
                </div>
              </th>
              <th onClick={() => handleSort('size')} className={styles.table.th}>
                <div className={styles.table.thContent}>
                  <span>Size (miles)</span>
                  <div className={styles.table.sortIcon}>
                    {getSortIcon('size')}
                  </div>
                </div>
              </th>
              <th onClick={() => handleSort('distance')} className={styles.table.th}>
                <div className={styles.table.thContent}>
                  <span>Distance (miles)</span>
                  <div className={styles.table.sortIcon}>
                    {getSortIcon('distance')}
                  </div>
                </div>
              </th>
              <th onClick={() => handleSort('velocity')} className={styles.table.th}>
                <div className={styles.table.thContent}>
                  <span>Velocity (mph)</span>
                  <div className={styles.table.sortIcon}>
                    {getSortIcon('velocity')}
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className={styles.table.tbody}>
            {sortedAsteroids.map((asteroid, index) => (
              <tr key={asteroid.id} className={getRowClassName(index)}>
                <td className={styles.cell.base}>
                  <div className={styles.cell.nameWrapper}>
                    <span className={styles.cell.name}>{asteroid.name}</span>
                    {asteroid.is_potentially_hazardous && (
                      <div className={styles.cell.hazardousWrapper}>
                        <GoAlertFill className={styles.icons.hazard} />
                      </div>
                    )}
                  </div>
                </td>
                <td className={styles.cell.base}>
                  <span className={styles.cell.number}>
                    {asteroid.size.toFixed(3)}
                  </span>
                </td>
                <td className={styles.cell.base}>
                  <span className={styles.cell.number}>
                    {asteroid.distance.toLocaleString()}
                  </span>
                </td>
                <td className={styles.cell.base}>
                  <div className={styles.cell.velocityWrapper}>
                    <span className={styles.cell.number}>
                      {asteroid.velocity.toLocaleString()}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.footer.wrapper}>
        <div className={styles.footer.content}>
            <a href="https://api.nasa.gov/">
              Source: NASA's Near Earth Object Web Service
            </a>
          </div>
        </div>
    </div>
  );
};

export default AsteroidTable;
