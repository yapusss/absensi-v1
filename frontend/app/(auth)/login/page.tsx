import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <main className={styles.loginPage}>
      <section className={styles.loginCard}>
        <div className={styles.heroPanel}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>ABSENSI.CO.ID</p>
            <h1>Masuk ke Dashboard</h1>
            <p className={styles.heroDescription}>
              Kelola kehadiran tim, jadwal kerja, dan rekap absensi harian
              dalam satu sistem yang rapi.
            </p>
          </div>
          <div className={styles.heroFooter}>
            <p className={styles.eyebrow}>WORKFORCE MANAGEMENT</p>
            <p>Portal admin &amp; karyawan</p>
          </div>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.formHeader}>
            <h2>Login</h2>
            <p>Masuk untuk mengelola absensi dan aktivitas tim Anda.</p>
          </div>

          <form className={styles.loginForm}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" defaultValue="admin@absensi.co.id" />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              defaultValue="********"
              autoComplete="current-password"
            />

            <button type="button">Login</button>
          </form>
        </div>
      </section>
    </main>
  );
}
