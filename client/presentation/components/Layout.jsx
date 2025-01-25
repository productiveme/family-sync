import { h } from 'preact';
import { Link } from 'wouter';
import { InstallPrompt } from './InstallPrompt';
import useUserStore from '../../domain/store/userStore';
import styles from './Layout.module.css';

export const Layout = ({ children }) => {
  const { currentUser, logout } = useUserStore();

  return (
    <div class={styles.layout}>
      <nav class={styles.nav}>
        <div class={styles.navContent}>
          <Link href="/" class={styles.logo}>
            {import.meta.env.VITE_APP_NAME}
          </Link>

          <div class={styles.navLinks}>
            {currentUser ? (
              <>
                <Link href="/calendar">Calendar</Link>
                <Link href="/study">Study</Link>
                <Link href="/activities">Activities</Link>
                <Link href="/summary">Summary</Link>
                <div class={styles.userMenu}>
                  <span>{currentUser.name}</span>
                  <button onClick={logout} class={styles.logoutButton}>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main class={styles.main}>
        {children}
      </main>

      <InstallPrompt />
    </div>
  );
};
