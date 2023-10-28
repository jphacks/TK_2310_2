import useUser from '@/app/_hooks/useUser';
import fetchApi from '@/lib/fetch';
import { useCallback, useEffect, useState } from 'react';
import { getEvent } from './useEvent';

/**
 * ユーザーが主催するイベント一覧を取得し、loadingと発生したエラーを提供する
 * @returns
 */
const useEvents = () => {
  const { user, token } = useUser();

  const [events, setEvents] = useState<SafaEvent[]>();
  const [error, setError] = useState<Error>();

  const isLoading = !events && !error;

  const get = useCallback(async () => {
    if (!token || !user) {
      return;
    }
    setError(undefined);
    try {
      const currentEvents = await getEvents(token, user, 100, 0);
      setEvents(currentEvents);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  }, [token, user]);

  useEffect(() => {
    get();
  }, [get]);

  return { events, isLoading, error };
};

export default useEvents;

/**
 * GET /user/:id/event のレスポンス
 */
type GetEventsResponse = {
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

/**
 * GET /user/:id/event
 * ユーザーが主催するイベント一覧を取得する
 */
const getEvents = async (
  token: string,
  user: User,
  limit: number,
  offset: number,
): Promise<SafaEvent[]> => {
  const response = await fetchApi<undefined, GetEventsResponse>(
    token,
    'GET',
    `/user/${user.id}/event?host_company_name=${user.companyId}?limit=${limit}&offset=${offset}`,
  );

  const promises = response.data.map(async (event) => {
    const eventDetail = await getEvent(token, user, event.id);
    return {
      ...eventDetail,
      ...event,
    };
  });
  const eventDetails = await Promise.all(promises);

  return eventDetails;
};
