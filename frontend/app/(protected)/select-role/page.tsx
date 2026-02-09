import styles from "./page.module.css";

export default function SelectRolePage() {
  return (
    <main className={styles.rolePage}>
      <section className={styles.roleCard}>
        <header className={styles.roleHeader}>
          <p className={styles.eyebrow}>ABSENSI.CO.ID</p>
          <h1>Pilih Role Aktif</h1>
          <p>
            Tentukan peran yang ingin Anda gunakan saat ini untuk menyesuaikan
            akses menu dan data absensi.
          </p>
        </header>

        <div className={styles.roleGrid}>
          <article className={`${styles.roleOption} ${styles.active}`}>
            <div>
              <h2>Administrator</h2>
              <p>Kelola organisasi, pengguna, shift, dan konfigurasi sistem.</p>
            </div>
            <span className={styles.badge}>Dipilih</span>
          </article>

          <article className={styles.roleOption}>
            <div>
              <h2>Human Resource</h2>
              <p>
                Pantau kehadiran, validasi izin/cuti, dan ekspor laporan
                periodik.
              </p>
            </div>
            <span className={styles.badge}>Tersedia</span>
          </article>

          <article className={styles.roleOption}>
            <div>
              <h2>Karyawan</h2>
              <p>Check-in/out, ajukan izin, dan lihat riwayat absensi pribadi.</p>
            </div>
            <span className={styles.badge}>Tersedia</span>
          </article>
        </div>

        <footer className={styles.roleActions}>
          <p>
            Role aktif: <strong>Administrator</strong>
          </p>
          <button type="button">Lanjut ke Dashboard</button>
        </footer>
      </section>
    </main>
  );
}
