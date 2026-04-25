import Link from 'next/link'
import AdBanner from "@/components/AdBanner"

const page = () => {
  return (
    <div className="space-y-6 ">

      {/* Header Section */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl text-black font-semibold mb-2">Admin Dashboard</h1>
        <p className="text-slate-600">Manage posts and users from the admin panel.</p>
      </div>

      {/* 🔥 Inline Ad (NEW POSITION) */}
      <div className="my-4">
        <AdBanner adSlot="1234567893" adFormat="rectangle" />
      </div>

      {/* Action Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/admin/post" className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-left shadow-sm hover:border-sky-300 hover:bg-slate-100">
          <h2 className="text-xl text-black font-semibold">Manage Posts</h2>
          <p className="mt-2 text-slate-600">Create, edit, and remove posts from the admin area.</p>
        </Link>

        <Link href="/admin/users" className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-left shadow-sm hover:border-sky-300 hover:bg-slate-100">
          <h2 className="text-xl text-black font-semibold">Manage Users</h2>
          <p className="mt-2 text-slate-600">View user accounts, update roles, and delete users.</p>
        </Link>
      </div>

      {/* 🔥 Optional Bottom Ad (extra bonus) */}
      <div className="mt-6">
        <AdBanner adSlot="1234567894" adFormat="horizontal" fullWidth />
      </div>

    </div>
  )
}

export default page