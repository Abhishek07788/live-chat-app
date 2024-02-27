interface Contact {
  type: string;
  name: string;
  link: string;
  icon: JSX.Element;
}

interface Education {
  college: string;
  edu: string;
  year: string;
}

interface Experience {
  position: string;
  organization: string;
  year: string;
}

interface Project {
  title: string;
  description: string;
  year: string;
}

export interface Details {
  fullName: string;
  title: string;
  contact: Contact[];
  education: Education[];
  skills: string[];
  image: string;
  color: string;
  nameColor: string;
  backgroundColor: string;
  titleColor: string;
  summary: string;
  experience: Experience[];
  projects: Project[];
  achievements: string[];
  languages: string[];
}
