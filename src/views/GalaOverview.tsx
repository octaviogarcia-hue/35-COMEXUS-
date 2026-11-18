import EventProgram from '../components/sections/EventProgram';
import Hero from '../components/sections/Hero';
import Milestones from '../components/sections/Milestones';
import OurStory from '../components/sections/OurStory';
import type { OverviewSectionId, TabId } from '../data/galaData';

interface Props {
  onNavigate: (tab: TabId, anchor?: string | null) => void;
}

export default function GalaOverview({ onNavigate }: Props) {
  const go = (id: OverviewSectionId) => onNavigate('overview', id);
  return (
    <>
      <Hero onMeetAlumni={() => onNavigate('alumni')} onViewProgram={() => go('program')} onScrollNext={() => go('story')} />
      <OurStory />
      <EventProgram />
      <Milestones />
    </>
  );
}
