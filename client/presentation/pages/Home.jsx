import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { useLocation } from 'wouter'
import useUserStore from '../../domain/store/userStore'
import styles from './Home.module.css'

export const Home = () => {
  const [location, navigate] = useLocation()
  const { currentUser } = useUserStore()

  const features = [
    {
      title: 'Multi-User Calendar',
      description:
        'Manage schedules for the whole family with color-coded activities',
      icon: '📅',
      path: '/calendar',
    },
    {
      title: 'Study Planning',
      description: 'Smart study time allocation and progress tracking',
      icon: '📚',
      path: '/study',
    },
    {
      title: 'Activity Management',
      description: 'Track preparations and materials for each activity',
      icon: '📝',
      path: '/activities',
    },
    {
      title: 'Weekly Summary',
      description: 'Get automated email summaries of upcoming schedules',
      icon: '📊',
      path: '/summary',
    },
  ]

  const handleFeatureClick = path => {
    if (!currentUser) {
      navigate('/login')
    } else {
      navigate(path)
    }
  }

  return (
    <div class={styles.container}>
      <section class={styles.hero}>
        <h1>Family Calendar</h1>
        <p class={styles.subtitle}>
          Organize your family's activities, studies, and projects in one place
        </p>
        {!currentUser ? (
          <div class={styles.cta}>
            <button
              onClick={() => navigate('/login')}
              class={styles.primaryButton}
            >
              Log In to Start
            </button>
            <button
              onClick={() => navigate('/register')}
              class={styles.secondaryButton}
            >
              Create Account
            </button>
          </div>
        ) : (
          <div class={styles.welcome}>
            <p>Welcome back, {currentUser.name}!</p>
            <button
              onClick={() => navigate('/calendar')}
              class={styles.primaryButton}
            >
              Go to Calendar
            </button>
          </div>
        )}
      </section>

      <section class={styles.features}>
        <h2>Features</h2>
        <div class={styles.featureGrid}>
          {features.map(feature => (
            <div
              key={feature.path}
              class={styles.featureCard}
              onClick={() => handleFeatureClick(feature.path)}
            >
              <div class={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              {!currentUser && (
                <div class={styles.overlay}>
                  <span>Login Required</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {!currentUser && (
        <section class={styles.info}>
          <h2>Why Choose Our Family Calendar?</h2>
          <div class={styles.infoGrid}>
            <div class={styles.infoCard}>
              <h3>🔒 Secure Family Profiles</h3>
              <p>
                Create separate profiles for each family member with customized
                settings and privacy controls.
              </p>
            </div>
            <div class={styles.infoCard}>
              <h3>📱 Access Anywhere</h3>
              <p>
                Use on any device with our responsive web interface and offline
                capabilities.
              </p>
            </div>
            <div class={styles.infoCard}>
              <h3>🔔 Smart Reminders</h3>
              <p>
                Never miss an activity with automated reminders and preparation
                checklists.
              </p>
            </div>
            <div class={styles.infoCard}>
              <h3>📈 Progress Tracking</h3>
              <p>
                Monitor study progress and project completion with detailed
                analytics.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
