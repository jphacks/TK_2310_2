type User = {
  id: string;
  companyId: string | undefined;
  userName: string;
  displayName: string;
  iconUrl: string;
  sex: string;
  age: number;
};

type SafaEvent = {
  id: string;
  title: string;
  hostCompanyName: string;
  address: string;
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
};

type SafaEventDetail = SafaEvent & {
  description: string;
  latitude: number;
  longitude: number;
  leaderName: string | undefined;
  startedAt: Date | undefined;
  completedAt: Date | undefined;
};

type Participant = {
  userId: string;
  userName: string;
  status: string;
};

type ParticipationHistory = SafaEvent & {
  status: 'completed' | 'not_reported' | 'absent';
};
