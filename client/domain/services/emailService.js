export const sendWeeklySummary = async (user, activities) => {
  try {
    const response = await fetch('/api/email/weekly-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        activities,
        date: new Date().toISOString()
      })
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to send weekly summary:', error);
    return false;
  }
};

export const scheduleReminders = async (activities) => {
  try {
    const response = await fetch('/api/email/schedule-reminders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ activities })
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to schedule reminders:', error);
    return false;
  }
};
