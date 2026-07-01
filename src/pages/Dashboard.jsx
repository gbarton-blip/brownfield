import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import { CardThing } from '../components/CardThing.jsx'
import { TableV2 } from '../components/TableV2.jsx'
import styles from './Dashboard.module.css'

const tableStuff = {
  headers: ['Customer', 'Plan', 'MRR', 'Status'],
  dataRows: [
    { cells: ['Northwind LLC', 'Enterprise', '$4,200', 'Active'] },
    { cells: ['Contoso', 'Pro', '$890', 'Active'] },
    { cells: ['Fabrikam', 'Starter', '$120', 'At risk'] },
    { cells: ['Adventure Co', 'Pro', '$650', 'Active'] },
    { cells: ['Tailspin Toys', 'Enterprise', '$12,400', 'Active'] },
  ],
}

export default function Dashboard() {
  return (
    <div className={styles.pageWrap}>
      <NavBar brand="Acme" />
      <main className={styles.mainArea}>
        <h1 className={styles.sectionTitle}>Overview</h1>
        <p className="mt-2 text-sm text-[#6B7280]">Last updated 2 minutes ago · internal only</p>

        <div className="mt-4 rounded-lg border border-[#E5E7EB] bg-white p-4 text-sm text-[#6B7280]">
          <span className="font-semibold text-[#374151]">Other flows:</span>{' '}
          <Link to="/billing" className="font-medium text-[#2563EB] no-underline hover:underline">
            Billing
          </Link>
          <span className="text-[#D1D5DB]"> · </span>
          <Link to="/team" className="font-medium text-[#2563EB] no-underline hover:underline">
            Team
          </Link>
          <span className="text-[#D1D5DB]"> · </span>
          <Link to="/integrations" className="font-medium text-[#2563EB] no-underline hover:underline">
            Integrations
          </Link>
        </div>

        <div className={styles.gridStats}>
          <CardThing stat="Users" subtext="12,480" footerNote="+3.2% vs last week" explodeOnHover />
          <CardThing stat="Revenue" subtext="$842k" footerNote="MTD" />
          <CardThing stat="Tickets" subtext="37 open" footerNote="SLA 94%" />
          <CardThing stat="Uptime" subtext="99.98%" footerNote="30d rolling" />
        </div>

        <div className={styles.cardPanel}>
          <h2 className="m-0 text-[17px] font-semibold text-[#374151]">Recent accounts</h2>
          <p className="mb-0 mt-2 text-[13px] text-[#9CA3AF]">Hardcoded preview data — do not use in prod</p>
          <TableV2 headers={tableStuff.headers} dataRows={tableStuff.dataRows} />
        </div>
      </main>
    </div>
  )
}
