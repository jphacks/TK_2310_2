import useUser from '@/app/_hooks/useUser';
import fetchApi from '@/lib/fetch';
import { appColors } from '@/themes/main';
import { useCallback, useEffect, useState } from 'react';
import { getEvent } from './useEvent';

const useEvents = () => {
  const { user, token } = useUser();
  const [events, setEvents] = useState<SafaEventDetail[] | undefined>(
    undefined,
  );
  const [error, setError] = useState<Error | undefined>(undefined);

  const isLoading = !!events;

  const get = useCallback(async () => {
    if (!token || !user?.companyId) {
      return;
    }
    try {
      const currentEvents = await getEvents(token, user, 100, 0);
      const promises = currentEvents.map(async (event) => {
        const eventDetail = await getEvent(token, user, event.id);
        return {
          ...eventDetail,
          ...event,
        };
      });
      const eventDetails = await Promise.all(promises);
      setEvents(eventDetails);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  }, [token, user]);

  useEffect(() => {
    get();
  }, [get]);
  return { getEvents: get, isLoading, events, error };
};

export default useEvents;

type GetEventsResponse = {
  events: {
    id: string;
    title: string;
    host_company_name: string;
    address: string;
    participant_count: number;
    unit_price: number;
    will_start_at: string;
    will_complete_at: string;
    application_deadline: string;
    leader_name: string | undefined;
  }[];
};

const getEvents = async (
  token: string,
  user: User,
  limit: number,
  offset: number,
) => {
  const response = await fetchApi<undefined, GetEventsResponse>(
    token,
    'GET',
    `/user/${user.id}/event?host_company_name=${user.companyId}?limit=${limit}&offset=${offset}`,
  );
  const eventsTmp = response.data.events.map((e) => {
    return {
      id: e.id,
      title: e.title,
      hostCompanyName: e.host_company_name,
      address: e.address,
      participantCount: e.participant_count,
      unitPrice: e.unit_price,
      leaderName: e.leader_name,
      willStartAt: new Date(e.will_start_at),
      willCompleteAt: new Date(e.will_complete_at),
      applicationDeadline: new Date(e.application_deadline),
    };
  });

  const events = eventsTmp.map((e) => {
    const { label, color } = getStatus(e);
    return {
      ...e,
      status: {
        label,
        color,
      },
    };
  });
  return events;
};

const getStatus = (event: Omit<SafaEvent, 'status'>) => {
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
