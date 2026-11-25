import { useCallback } from 'react';
import AlumniView from '../components/alumni/AlumniView';
import type { ProfileId, TabId } from '../data/galaData';

type NavMode = 'push' | 'replace';

interface Props {
  onNavigate: (tab: TabId, anchor?: string | null, mode?: NavMode, state?: unknown) => void;
  highlighted: string | null;
  anchor: string | null;
}

/** History entries pushed by opening a fellow from the grid carry this flag. */
const MODAL_STATE = { fellowModal: true };
const openedInApp = () => !!(window.history.state as { fellowModal?: boolean } | null)?.fellowModal;

/**
 * Photographer modals live in the URL (#/alumni/photographer-N):
 * • QR code / shared link → lands on #/alumni with that modal already open.
 * • Opening from the grid pushes a history entry, so the browser Back button closes it.
 * • Previous / Next replace the entry (Back still returns to the grid in one step).
 * • Closing goes back to #/alumni.
 */
export default function AlumniShowcase({ onNavigate, highlighted, anchor }: Props) {
  const openId = anchor && anchor.startsWith('photographer-') ? (anchor as ProfileId) : null;

  const onOpen = useCallback((id: ProfileId) => onNavigate('alumni', id, 'push', MODAL_STATE), [onNavigate]);
  const onStep = useCallback((id: ProfileId) => onNavigate('alumni', id, 'replace', window.history.state), [onNavigate]);
  const onClose = useCallback(() => {
    if (openedInApp()) window.history.back();
    else onNavigate('alumni', null, 'replace');
  }, [onNavigate]);

  return (
    <AlumniView
      onBack={() => onNavigate('overview')}
      onJump={(id: ProfileId) => onNavigate('alumni', id)}
      highlighted={highlighted}
      openId={openId}
      onOpen={onOpen}
      onStep={onStep}
      onClose={onClose}
    />
  );
}
