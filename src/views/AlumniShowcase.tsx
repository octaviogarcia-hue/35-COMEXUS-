import AlumniView from '../components/alumni/AlumniView';
import type { ProfileId, TabId } from '../data/galaData';

interface Props {
  onNavigate: (tab: TabId, anchor?: string | null) => void;
  highlighted: string | null;
}

export default function AlumniShowcase({ onNavigate, highlighted }: Props) {
  return <AlumniView onBack={() => onNavigate('overview')} onJump={(id: ProfileId) => onNavigate('alumni', id)} highlighted={highlighted} />;
}
