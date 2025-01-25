import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import useCalendarStore from '../../../domain/store/calendarStore';
import { scheduleReminders } from '../../../domain/services/emailService';
import styles from './ReminderManager.module.css';

export const ReminderManager = () => {
  const { activities } = useCalendarStore();
  const [upcomingActivities, setUpcomingActivities] = useState([]);

  useEffect(() => {
    updateUpcomingActivities();
    const interval = setInterval(updateUpcomingActivities, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [activities]);

  const updateUpcomingActivities = () => {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const upcoming = activities.filter(activity => {
      const activityTime = new Date(activity.startTime);
      return activityTime > now && activityTime <= tomorrow;
    });

    setUpcomingActivities(upcoming);
    scheduleReminders(upcoming);
  };

  return (
    <div class={styles.container}>
      <h2>Upcoming Activities</h2>
      
      <div class={styles.timeline}>
        {upcomingActivities.map(activity => (
          <div key={activity.id} class={styles.activityCard}>
            <div class={styles.time}>
              {new Date(activity.startTime).toLocaleTimeString()}
            </div>
            <div class={styles.details}>
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
              {activity.checklist.length > 0 && (
                <div class={styles.preparation}>
                  <h4>Required Preparation:</h4>
                  <ul>
                    {activity.checklist.map(item => (
                      <li key={item.id}>
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => {
                            // Update checklist item completion status
                          }}
                        />
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

        {upcomingActivities.length === 0 && (
          <p class={styles.noActivities}>
            No activities scheduled for the next 24 hours
          </p>
        )}
      </div>
    </div>
  );
};
