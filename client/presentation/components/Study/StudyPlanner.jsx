import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import useCalendarStore from '../../../domain/store/calendarStore';
import styles from './StudyPlanner.module.css';

export const StudyPlanner = () => {
  const { activities, profiles, selectedProfile, addActivity } = useCalendarStore();
  const [studyBlocks, setStudyBlocks] = useState([]);
  const [conflicts, setConflicts] = useState([]);

  useEffect(() => {
    if (selectedProfile) {
      generateStudyPlan();
    }
  }, [selectedProfile, activities]);

  const generateStudyPlan = () => {
    const profile = profiles.find(p => p.id === selectedProfile);
    if (!profile) return;

    const existingCommitments = activities.filter(a => 
      a.profileId === selectedProfile && a.type !== 'STUDY'
    );

    // Find available time slots
    const availableSlots = findAvailableTimeSlots(existingCommitments);
    
    // Allocate study blocks based on subject requirements
    const newStudyBlocks = allocateStudyBlocks(profile.subjects, availableSlots);
    
    setStudyBlocks(newStudyBlocks);
    detectConflicts(newStudyBlocks, existingCommitments);
  };

  const findAvailableTimeSlots = (commitments) => {
    // Implementation to find free time slots
    // Returns array of { start: Date, end: Date }
  };

  const allocateStudyBlocks = (subjects, availableSlots) => {
    // Implementation to distribute study time
    // Returns array of study blocks
  };

  const detectConflicts = (studyBlocks, commitments) => {
    // Implementation to find scheduling conflicts
    // Updates conflicts state
  };

  const applyStudyPlan = () => {
    studyBlocks.forEach(block => {
      addActivity({
        type: 'STUDY',
        profileId: selectedProfile,
        title: `Study: ${block.subject}`,
        startTime: block.start,
        duration: block.duration,
        description: `Study session for ${block.subject}`,
        checklist: [
          { text: 'Textbook', completed: false },
          { text: 'Notes', completed: false },
          { text: 'Study materials', completed: false }
        ]
      });
    });
  };

  return (
    <div class={styles.container}>
      <h2>Study Planner</h2>
      
      {conflicts.length > 0 && (
        <div class={styles.conflicts}>
          <h3>Schedule Conflicts</h3>
          {conflicts.map((conflict, index) => (
            <div key={index} class={styles.conflict}>
              <p>{conflict.message}</p>
            </div>
          ))}
        </div>
      )}

      <div class={styles.studyBlocks}>
        <h3>Proposed Study Schedule</h3>
        {studyBlocks.map((block, index) => (
          <div key={index} class={styles.block}>
            <h4>{block.subject}</h4>
            <p>
              {new Date(block.start).toLocaleTimeString()} - 
              {new Date(block.end).toLocaleTimeString()}
            </p>
            <p>Duration: {block.duration} minutes</p>
          </div>
        ))}
      </div>

      <button
        onClick={applyStudyPlan}
        class={styles.applyButton}
        disabled={conflicts.length > 0}
      >
        Apply Study Plan
      </button>
    </div>
  );
};
