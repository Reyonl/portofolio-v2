// Tech stack — visual only, two marquee rails.
// Primary = native (Laravel/PHP), Leveling = React/Next.js (current study).

export interface Skill {
  name: string;
  icon: string; // key into components/Icons.tsx marks
}

export const primarySkills: Skill[] = [
  { name: "Laravel", icon: "laravel" },
  { name: "PHP", icon: "php" },
  { name: "Livewire", icon: "livewire" },
  { name: "MySQL", icon: "mysql" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Flutter", icon: "flutter" },
];

export const levelingSkills: Skill[] = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
];
