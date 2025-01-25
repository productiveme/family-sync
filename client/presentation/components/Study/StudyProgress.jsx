import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import useCalendarStore from '../../../domain/store/calendarStore';
import styles from './StudyProgress.module.css';

export const StudyProgress = () => {
  const { activities, profiles, selectedProfile } = useCalendarStore();
  const [progress, setProgress] = useState({});

  useEffect(() => {
    if (selectedProfile) {
      calculateProgress();
    }
  }, [selectedProfile, activities]);

  const calculateProgress = () => {
    const profile = profiles.find(p => p.id === selectedProfile);
    if (!profile) return;

    const studyActivities = activities.filter(a => 
      a.profileId === selectedProfile && 
      a.type === 'STUDY'
    );

    const subjectProgress = {};
    profile.subjects.forEach(subject => {
      const subjectActivities = studyActivities.filter(a => 
        a.title.includes(subject.name)
      );

      const totalMinutes = subjectActivities.reduce((sum, activity) => 
        sum + activity.duration, 0
      );

      subjectProgress[subject.name] = {
        completed: totalMinutes / 60, // hours
        target: subject.targetHours,
        percentage: (totalMinutes / 60 / subject.targetHours) * 100
      };
    });

    setProgress(subjectProgress);
  };

  return (
    <div class={styles.container}>
      <h2>Study Progress</h2>

      <div class={styles.progressGrid}>
        {Object.entries(progress).map(([subject, data]) => (
          <div key={subject} class={styles.subjectProgress}>
            <h3>{subject}</h3>
            <div class={styles.progressBar}>
              <div
                class={styles.progressFill}
                style={{ width: `${Math.min(100, data.percentage)}%` }}
              />
            </div>
            <p>
              {data.completed.toFixed(1)} / {data.target} hours
              ({data.percentage.toFixed(1)}%)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
