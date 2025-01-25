import { h } from 'preact';
import { useState } from 'preact/hooks';
import useCalendarStore from '../../../domain/store/calendarStore';
import styles from './ProfileManager.module.css';

export const ProfileManager = () => {
  const { profiles, addProfile, setSelectedProfile } = useCalendarStore();
  const [newProfile, setNewProfile] = useState({
    name: '',
    grade: '',
    subjects: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProfile(newProfile);
    setNewProfile({ name: '', grade: '', subjects: [] });
  };

  const addSubject = () => {
    setNewProfile(prev => ({
      ...prev,
      subjects: [...prev.subjects, { name: '', targetHours: 0 }]
    }));
  };

  return (
    <div class={styles.container}>
      <div class={styles.existingProfiles}>
        <h3>Student Profiles</h3>
        <div class={styles.profileList}>
          {profiles.map(profile => (
            <div
              key={profile.id}
              class={styles.profileCard}
              onClick={() => setSelectedProfile(profile.id)}
            >
              <h4>{profile.name}</h4>
              <p>Grade: {profile.grade}</p>
              <div class={styles.subjects}>
                {profile.subjects.map(subject => (
                  <span key={subject.name} class={styles.subject}>
                    {subject.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} class={styles.form}>
        <h3>Add New Profile</h3>
        <div class={styles.field}>
          <label>Name</label>
          <input
            type="text"
            value={newProfile.name}
            onChange={e => setNewProfile(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div class={styles.field}>
          <label>Grade</label>
          <input
            type="text"
            value={newProfile.grade}
            onChange={e => setNewProfile(prev => ({ ...prev, grade: e.target.value }))}
            required
          />
        </div>

        <div class={styles.subjects}>
          <label>Subjects</label>
          {newProfile.subjects.map((subject, index) => (
            <div key={index} class={styles.subjectInput}>
              <input
                type="text"
                placeholder="Subject name"
                value={subject.name}
                onChange={e => {
                  const newSubjects = [...newProfile.subjects];
                  newSubjects[index].name = e.target.value;
                  setNewProfile(prev => ({ ...prev, subjects: newSubjects }));
                }}
              />
              <input
                type="number"
                placeholder="Target hours/week"
                value={subject.targetHours}
                onChange={e => {
                  const newSubjects = [...newProfile.subjects];
                  newSubjects[index].targetHours = parseInt(e.target.value);
                  setNewProfile(prev => ({ ...prev, subjects: newSubjects }));
                }}
              />
            </div>
          ))}
          <button type="button" onClick={addSubject} class={styles.addButton}>
            Add Subject
          </button>
        </div>

        <button type="submit" class={styles.submitButton}>
          Create Profile
        </button>
      </form>
    </div>
  );
};
