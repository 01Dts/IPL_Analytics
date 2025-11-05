export const styles = {
  body: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  navbar: {
    backgroundColor: '#0d6efd',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  navLinks: {
    display: 'flex',
    gap: '1rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  navLinkActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
    overflow: 'hidden',
  },
  cardHeader: {
    padding: '1rem 1.5rem',
    borderBottom: '1px solid #dee2e6',
    fontWeight: 'bold',
    fontSize: '1.25rem',
  },
  cardBody: {
    padding: '1.5rem',
  },
  cardText: {
    color: '#6c757d',
    marginBottom: '1rem',
  },
  headerBlue: { backgroundColor: '#0d6efd', color: 'white' },
  headerGreen: { backgroundColor: '#198754', color: 'white' },
  headerRed: { backgroundColor: '#dc3545', color: 'white' },
  headerInfo: { backgroundColor: '#0dcaf0', color: 'white' },
  pageTitle: { color: '#0d6efd', fontWeight: 'bold', fontSize: '2rem', margin: 0 },
  footer: {
    backgroundColor: '#212529',
    color: 'white',
    textAlign: 'center',
    padding: '1.5rem',
    marginTop: '3rem',
  },
};
