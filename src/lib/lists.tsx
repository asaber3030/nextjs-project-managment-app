import { Cog, User, Users, Gamepad, Check, CheckCheck, Folder, Image as ImageIcon, Home, ListChecks, FolderOpen, Building, Smile, UserPlus, Facebook, Linkedin, Github } from "lucide-react";
import { route } from "./route";

export const accountSidebarURLs = [
  { label: 'Account', icon: <User className='size-5' />, url: '/account' },
  { label: 'Settings', icon: <Cog className='size-5' />, url: '/account/settings' },
  { label: 'Picture', icon: <ImageIcon className='size-5' />, url: '/account/picture' },
  { label: 'Teams', icon: <Users className='size-5' />, url: '/account/teams' },
  { label: 'Tasks', icon: <CheckCheck className='size-5' />, url: '/account/tasks' },
  { label: 'Projects', icon: <Folder className='size-5' />, url: '/account/projects' },
]

export const servicesList = [
  {
    image: "/home/team.svg",
    title: "Create Teams",
    description: "Creating teams and share your content with other team members, with beatiful UI.",
  },

  {
    image: "/home/tasks.svg",
    title: "Manage Tasks",
    description: "You can easily create tasks and assign to many members. Also post some boards to share something with the team.",
  },

  {
    image: "/home/secure.svg",
    title: "Secure System",
    description: "We&apos;re making sure that your data kept safe everytime your visit our service and there&apos;s no leak of information.",
  },
]

export const clientsList = [
  {
    image: "/friends/maged.jpeg",
    name: "Ahmed Maged",
    jobTitle: "Flutter & Java Developer",
    description: "Creating teams and share your content with other team members, with beatiful UI.",
    stars: 5,
  },

  {
    image: "/friends/yasser.jpeg",
    name: "Yasser Mohamed",
    jobTitle: "Flutter & Java Developer",
    description: "You can easily create tasks and assign to many members. Also post some boards to share something with the team.",
    stars: 3,
  },

  {
    image: "/friends/mostafa.jpeg",
    name: "Mostafa Abdulrahman",
    jobTitle: "Embedded System Engineer",
    description: "We're making sure that your data kept safe everytime your visit our service and there's no leak of information.",
    stars: 4
  },
]

export const numbersList = [
  {
    title: "Happy Client",
    number: 25_000,
    icon: Smile,
  },

  {
    title: "Projects",
    number: 265_054,
    icon: Building,
  },

  {
    title: "Teams",
    number: 30_577,
    icon: Users,
  },

  {
    title: "Tasks",
    number: 3_548,
    icon: CheckCheck,
  },

  {
    title: "Joined Teams",
    number: 4_998,
    icon: UserPlus,
  },
]

export const socialMedia = [
  {
    icon: Facebook,
    url: 'https://fb.com/asaber.25'
  },
  {
    icon: Linkedin,
    url: 'https://linkedin.com/in/abdulrahman-saber'
  },
  {
    icon: Github,
    url: 'https://github.com/asaber3030'
  },
]