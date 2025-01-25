import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import useCalendarStore from '../../../domain/store/calendarStore';
import { sendWeeklySummary } from '../../../domain/services/emailService';
import styles from './WeeklySummary.module.css';

export const WeeklySummary = () => {
  const { activities, profiles } = useCalendarStore();
  const [summary, setSummary] = useState(null);
  const [lastSent, setLastSent] = useState(null);

  useEffect(() => {
    generateSummary();
  }, [activities]);

  const generateSummary = () => {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));

    const weeklyActivities = activities.filter(activity => {
      const activityDate = new Date(activity.startTime);
      return activityDate >= weekStart && activityDate <= weekEnd;
    });

    const summaryData = {
      totalActivities: weeklyActivities.length,
      byProfile: {},
      byType: {},
      upcomingPreparation: []
    };

    weeklyActivities.forEach(activity => {
      // Group by profile
      if (!summaryData.byProfile[activity.profileId]) {
        summaryData.byProfile[activity.profileId] = [];
      }
      summaryData.byProfile[activity.profileId].push(activity);

      // Group by type
      if (!summaryData.byType[activity.type]) {
        summaryData.byType[activity.type] = [];
      }
      summaryData.byType[activity.type].push(activity);

      // Check for upcoming preparation needs
      const activityDate = new Date(activity.startTime);
      if (activityDate <= new Date(now.setDate(now.getDate() + 2))) {
        summaryData.upcomingPreparation.push(activity);
      }
    });

    setSummary(summaryData);
  };

  const sendSummaryEmail = async () => {
    if (summary) {
      const success = await sendWeeklySummary({
        summary,
        profiles,
        date: new Date()
      });

      if (success) {
        setLastSent(new Date());
      }
    }
  };

  if (!summary) return null;

  return (
    <div class={styles.container}>
      <div class={styles.header}>
        <h2>Weekly Summary</h2>
        <button
          onClick={sendSummaryEmail}
          class={styles.sendButton}
          disabled={!summary}
        >
          Send Summary Email
        </button>
      </div>

      <div class={styles.stats}>
        <div class={styles.stat}>
          <h3>Total Activities</h3>
          <p>{summary.totalActivities}</p>
        </div>

        {Object.entries(summary.byType).map(([type, activities]) => (
          <div key={type} class={styles.stat}>
            <h3>{type}</h3>
            <p>{activities.length} activities</p>
          </div>))}
      </div>

      <div class={styles.preparation}>
        <h3>Upcoming Preparation Needs</h3>
        {summary.upcomingPreparation.map(activity => (
          <div key={activity.id} class={styles.prepItem}>
            <h4>{activity.title}</h4>
            <p>{new Date(activity.startTime).toLocaleDateString()}</p>
            <ul>
              {activity.checklist.map(item => (
                <li key={item.id} class={styles.checklistItem}>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {lastSent && (
        <p class={styles.lastSent}>
          Last summary sent: {lastSent.toLocaleString()}
        </p>
      )}
    </div>
  );
};
