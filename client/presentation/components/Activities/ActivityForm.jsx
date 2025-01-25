import { h } from 'preact';
import { useState } from 'preact/hooks';
import useCalendarStore from '../../../domain/store/calendarStore';
import { ActivityType } from '../../../domain/models/types';
import styles from './ActivityForm.module.css';

export const ActivityForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    type: ActivityType.OTHER,
    startTime: '',
    duration: 60,
    description: '',
    checklist: [],
    recurring: false,
    daysOfWeek: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addChecklistItem = () => {
    setFormData(prev => ({
      ...prev,
      checklist: [...prev.checklist, { id: Date.now(), text: '', completed: false }]
    }));
  };

  return (
    <form onSubmit={handleSubmit} class={styles.form}>
      <div class={styles.field}>
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>

      <div class={styles.field}>
        <label>Type</label>
        <select
          value={formData.type}
          onChange={e => setFormData(prev => ({ ...prev, type: e.target.value }))}
        >
          {Object.entries(ActivityType).map(([key, value]) => (
            <option key={key} value={value}>
              {key.charAt(0) + key.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      <div class={styles.field}>
        <label>Start Time</label>
        <input
          type="time"
          value={formData.startTime}
          onChange={e => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
          required
        />
      </div>

      <div class={styles.field}>
        <label>Duration (minutes)</label>
        <input
          type="number"
          value={formData.duration}
          onChange={e => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
          min="15"
          step="15"
          required
        />
      </div>

      <div class={styles.field}>
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div class={styles.checklist}>
        <label>Preparation Checklist</label>
        {formData.checklist.map((item, index) => (
          <div key={item.id} class={styles.checklistItem}>
            <input
              type="text"
              value={item.text}
              onChange={e => {
                const newChecklist = [...formData.checklist];
                newChecklist[index].text = e.target.value;
                setFormData(prev => ({ ...prev, checklist: newChecklist }));
              }}
            />
          </div>
        ))}
        <button type="button" onClick={addChecklistItem} class={styles.addButton}>
          Add Item
        </button>
      </div>

      <div class={styles.recurring}>
        <label>
          <input
            type="checkbox"
            checked={formData.recurring}
            onChange={e => setFormData(prev => ({ ...prev, recurring: e.target.checked }))}
          />
          Recurring Activity
        </label>
      </div>

      {formData.recurring && (
        <div class={styles.daysOfWeek}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <label key={day}>
              <input
                type="checkbox"
                checked={formData.daysOfWeek.includes(index)}
                onChange={e => {
                  const newDays = e.target.checked
                    ? [...formData.daysOfWeek, index]
                    : formData.daysOfWeek.filter(d => d !== index);
                  setFormData(prev => ({ ...prev, daysOfWeek: newDays }));
                }}
              />
              {day}
            </label>
          ))}
        </div>
      )}

      <button type="submit" class={styles.submitButton}>
        {initialData ? 'Update Activity' : 'Create Activity'}
      </button>
    </form>
  );
};
