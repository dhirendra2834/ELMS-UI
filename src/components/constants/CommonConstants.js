export const adminstats = [
  { title: "Total Students", icon: "🎓", color: "bg-blue-50 text-blue-700" },
  { title: "Total Teachers", icon: "👨‍🏫", color: "bg-purple-50 text-purple-700" },
  { title: "Total Courses", icon: "📚", color: "bg-emerald-50 text-emerald-700" },
  { title: "Total Enrollments", icon: "📝", color: "bg-orange-50 text-orange-700" },
];

export const managementItems = [
  {
    title: "Manage Students",
    description: "View student accounts and enrollment details.",
    icon: "🎓",
    href: "/admin/students",
  },
  {
    title: "Manage Teachers",
    description: "Manage teacher accounts and professional profiles.",
    icon: "👨‍🏫",
    href: "/admin/teachers",
  },
  {
    title: "Manage Courses",
    description: "Manage courses, subjects, and chapters.",
    icon: "📚",
    href: "/admin/courses",
  },
  {
    title: "Enrollments",
    description: "View student course enrollments.",
    icon: "📝",
    href: "/admin/enrollments",
  },
];

export const teacherstats = [
  {
    title: "My Courses",
    value: "—",
    icon: "📚",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "My Subjects",
    value: "—",
    icon: "📖",
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "My Students",
    value: "—",
    icon: "👨‍🎓",
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Pending Reviews",
    value: "—",
    icon: "📝",
    color: "bg-orange-100 text-orange-700",
  },
];

export const quickActions = [
  {
    title: "Manage My Courses",
    description: "View your assigned courses and manage their content.",
    href: "/teacher/courses",
    icon: "📚",
  },
  {
    title: "Manage Subjects",
    description: "View subjects and organize learning content.",
    href: "/teacher/subjects",
    icon: "📖",
  },
  {
    title: "Manage Chapters",
    description: "Create and update chapters for your subjects.",
    href: "/teacher/chapters",
    icon: "🗂️",
  },
  {
    title: "View My Students",
    description: "Check enrolled students and their learning progress.",
    href: "/teacher/students",
    icon: "👨‍🎓",
  },
];