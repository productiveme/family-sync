import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import useCalendarStore from '../../../domain/store/calendarStore';
import { colorMap } from '../../../domain/models/types';
import styles from './CalendarGrid.module.css';

export const CalendarGrid = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { activities, filters, getFilteredActivities } = useCalendarStore();
  const [displayActivities, setDisplayActivities] = useState([]);

  useEffect(() => {
    setDisplayActivities(getFilteredActivities());
  }, [activities, filters]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      slots.push(
        <div key={hour} class={styles.timeSlot}>
          {`${hour.toString().padStart(2, '0')}:00`}
        </div>
      );
    }
    return slots;
  };

  const handleDrop = (e, hour) => {
    e.preventDefault();
    const activityData = JSON.parse(e.dataTransfer.getData('text/plain'));
    // Update activity time
  };

  return (
    <div class={styles.calendarGrid}>
      <div class={styles.timeColumn}>{generateTimeSlots()}</div>
      <div class={styles.activitiesColumn}>
        {displayActivities.map(activity => (
          <div
            key={activity.id}
            class={styles.activity}
            style={{
              backgroundColor: colorMap[activity.type],
              top: `${activity.startHour * 60}px`,
              height: `${activity.duration * 60}px`
            }}
            draggable
          >
            <h4>{activity.title}</h4>
            <p>{activity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
