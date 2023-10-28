import useUser from '@/app/_hooks/useUser';
import fetchApi from '@/lib/fetch';
import { appColors } from '@/themes/main';
import { useCallback, useEffect, useState } from 'react';

/**
 * IDからイベントの詳細情報を取得し、loading発生したエラーを返す
 * @param eventId
 * @returns
 */
const useEvent = (eventId: string) => {
  const { token, user } = useUser();

  const [event, setEvent] = useState<SafaEvent>();
  const [error, setError] = useState<Error>();

  const isLoading = !event && !error;

  const get = useCallback(async () => {
    if (!token || !user) {
      return;
    }
    setError(undefined);
    try {
      const currentEvent = await getEvent(token, user, eventId);
      setEvent(currentEvent);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  }, [token, user, eventId]);

  useEffect(() => {
    get();
  }, [get]);

  return { event, isLoading, error };
};

export default useEvent;

/**
 * GET /event/:id のレスポンス
 */
type GetEventResponse = {
  id: string;
  title: string;
  host_company_name: string;
  address: string;
  /** 募集人数 */
  participant_count: number;
  unit_price: number;
  will_start_at: string;
  will_complete_at: string;
  application_deadline: string;
  leader_name: string | undefined;
  description: string;
  latitude: number;
  longitude: number;
  started_at: string | undefined;
  completed_at: string | undefined;
};

/**
 * GET /event/:id
 * イベントの詳細情報を取得する
 * useEventsで使用するためにexport
 */
export const getEvent = async (
  token: string,
  user: User,
  eventId: string,
): Promise<SafaEvent> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response = await fetchApi<undefined, GetEventResponse>(
    token,
    'GET',
    `/event/${eventId}`,
  );
  const eventSC = response.data;
  const eventBase = {
    id: eventSC.id,
    title: eventSC.title,
    hostCompanyName: eventSC.host_company_name,
    address: eventSC.address,
    participantCount: eventSC.participant_count,
    unitPrice: eventSC.unit_price,
    willStartAt: new Date(eventSC.will_start_at),
    willCompleteAt: new Date(eventSC.will_complete_at),
    applicationDeadline: new Date(eventSC.application_deadline),
    leaderName: eventSC.leader_name,
    description: eventSC.description,
    latitude: eventSC.latitude,
    longitude: eventSC.longitude,
    startedAt: eventSC.started_at ? new Date(eventSC.started_at) : undefined,
    completedAt: eventSC.completed_at
      ? new Date(eventSC.completed_at)
      : undefined,
  };

  const status = getStatus(eventBase);
  const participants = await getParticipants(token, eventId);
  const event: SafaEvent = {
    ...eventBase,
    status,
    participants,
  };
  return event;
};

/**
 * GET /event/:id/participants のレスポンス
 */
type GetParticipantsResponse = {
  participants: {
    user_id: string;
    user_name: string;
    status: string;
  }[];
};

/**
 * GET /event/:id/participants
 * イベントの参加者を取得する
 */
const getParticipants = async (
  token: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  eventId: string,
): Promise<Participant[]> => {
  const response = await fetchApi<undefined, GetParticipantsResponse>(
    token,
    'GET',
    // TODO: 本番APIが完成したら切り変える
    `/event/${eventId}/participant`,
  );
  const participants = response.data.participants.map((participant) => {
    return {
      userId: participant.user_id,
      userName: participant.user_name,
      status: participant.status,
    };
  });
  return participants;
};

/**
 * イベント詳細情報からステータスを算出する
 */
const getStatus = (event: {
  applicationDeadline: Date;
  willStartAt: Date;
  willCompleteAt: Date;
}) => {
  const now = new Date();
  // 募集中
  if (now < event.applicationDeadline) {
    return { label: '募集中', color: appColors.chipYellow };
  }
  // 募集終了、開始前
  if (event.applicationDeadline <= now && now < event.willStartAt) {
    return { label: '募集完了', color: appColors.chipGreen };
  }
  if (event.willStartAt <= now && now < event.willCompleteAt) {
    return { label: '開催中', color: appColors.chipRed };
  }
  if (event.willCompleteAt <= now) {
    return { label: '終了', color: appColors.bgGray };
  }
  return { label: '不明', color: '#fff' };
};
