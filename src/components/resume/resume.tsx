import { cn } from "@/lib/utils";
import { ReactNode, MouseEvent, RefObject } from "react";
import { ContactModal } from "./sections/contact-section";
import React from "react";
import { contactDataAtom, contactModalOpenAtom } from "@/lib/store/contact";
import { useAtom } from "jotai";

interface ResumeSectionProps {
  title?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const ResumeSection = ({ title, children, onClick }: ResumeSectionProps) => (
  <section
    className="group p-6 bg-white shadow-sm transition-all
               hover:shadow-md hover:border-l-4 hover:border-blue-200
               cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
    tabIndex={0}
    onClick={onClick}
  >
    <h2
      className={cn(
        "text-xl font-semibold mb-4 text-gray-800",
        !title && "hidden",
      )}
    >
      {title}
    </h2>
    <div className="text-gray-600 space-y-4">{children}</div>
  </section>
);

interface ExperienceItemProps {
  company: string;
  location: string;
  position: string;
  dates: string;
  children: ReactNode;
}

const ExperienceItem = ({
  company,
  location,
  position,
  dates,
  children,
}: ExperienceItemProps) => (
  <div className="mb-6">
    <div className="flex justify-between items-start mb-2">
      <div>
        <h3 className="font-medium text-gray-900">
          {company} | {location}
        </h3>
        <p className="text-gray-700">{position}</p>
      </div>
      <span className="text-sm text-gray-500">{dates}</span>
    </div>
    <div className="text-gray-600 space-y-2">{children}</div>
  </div>
);

export const ResumeComponent = ({
  ref,
}: {
  ref?: RefObject<HTMLDivElement | null>;
}) => {
  const handleSectionClick = (sectionName: string) => {
    console.log(`Section clicked: ${sectionName}`);
    // Add your custom click handler logic here
  };
  const [contactData] = useAtom(contactDataAtom);

  const [, setContactModalOpen] = useAtom(contactModalOpenAtom);

  const contactInfo = [
    contactData.phone,
    contactData.email,
    contactData.location,
  ].filter(Boolean);

  return (
    <div ref={ref} className="max-w-3xl mx-auto my-8 p-8 bg-gray-50 rounded-xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {contactData.fullName}
        </h1>
        <ResumeSection onClick={() => setContactModalOpen(true)}>
          <div className="flex flex-wrap items-center gap-x-4 text-gray-600">
            {contactInfo.map((info, index) => (
              <React.Fragment key={index}>
                <span>{info}</span>
                {index < contactInfo.length - 1 && (
                  <span className="text-gray-400">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </ResumeSection>
      </header>

      <ResumeSection
        title="Experience"
        onClick={() => handleSectionClick("Experience")}
      >
        <ExperienceItem
          company="Company A"
          location="Location"
          position="Sales Representative"
          dates="Start - End date"
        >
          <ul className="list-disc pl-6 space-y-2">
            <li>Key responsibility or accomplishment 1</li>
            <li>Quantifiable achievement (e.g., Increased sales by 30%)</li>
            <li>AI-generated work description based on experience</li>
          </ul>
        </ExperienceItem>

        <ExperienceItem
          company="Company B"
          location="Location"
          position="Sales Associate"
          dates="Start - End date"
        >
          <p>sdald</p>
        </ExperienceItem>

        <ExperienceItem
          company="Company C"
          location="Location"
          position="Sales Assistant"
          dates="Start - End date"
        >
          <p>sdald</p>
        </ExperienceItem>
      </ResumeSection>

      <ResumeSection
        title="Skills"
        onClick={() => handleSectionClick("Skills")}
      >
        <div className="flex flex-wrap gap-4">
          {["Skill 1", "Skill 2", "Skill 3", "Skill 4"].map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection
        title="Education"
        onClick={() => handleSectionClick("Education")}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">Graduated School</h3>
            <p className="text-gray-700">Field of study</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Location</p>
            <p className="text-sm text-gray-500">Graduation Date</p>
          </div>
        </div>
      </ResumeSection>
      <ContactModal />
    </div>
  );
};
