type User = {
  id: string;
  companyId: string | undefined;
  displayName: string;
  iconUrl: string;
  age: number;
};

type SafaEvent = {
  id: string;
  title: string;
  hostCompanyName: string;
  address: string;
  /** 募集人数 */
  participantCount: number;
  unitPrice: number;
  willStartAt: Date;
  willCompleteAt: Date;
  applicationDeadline: Date;
  leaderName: string | undefined;

  status: {
    label: string;
    color: string;
  };
  participants: Participant[];

  description: string;
  latitude: number;
  longitude: number;
  startedAt: Date | undefined;
  completedAt: Date | undefined;
};

type SafaEventDraft = {
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  participantCount: number;
  unitPrice: number;
  willStartAt: Date;
  willCompleteAt: Date;
  applicationDeadline: Date;
};

type Participant = {
  userId: string;
  userName: string;
  status: string;
};

type ParticipationHistory = SafaEvent & {
  status: 'completed' | 'not_reported' | 'absent';
};
