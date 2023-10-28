import useUser from '@/app/_hooks/useUser';
import fetchApi from '@/lib/fetch';
import { useCallback, useEffect, useState } from 'react';

const useEvent = (eventId: string) => {
  const { token, user } = useUser();
  const [eventDetails, setEvent] = useState<SafaEvent>();
  const [isLoading, setIsLoading] = useState(false);

  const get = useCallback(async () => {
    if (!token || !user) {
      return;
    }
    setIsLoading(true);
    const e = await getEvent(token, user, eventId);
    setEvent(e);
    setIsLoading(false);
  }, [token, user, eventId]);

  useEffect(() => {
    get();
  }, [get]);

  return { getEvent: get, isLoading, eventDetails };
};

export default useEvent;

/**
 * GET /event/:id
 * useEventsで使用するためにexport
 */
export const getEvent = async (token: string, user: User, eventId: string) => {
  const response = await fetchApi<undefined, GetEventResponse>(
    token,
    'GET',
    // TODO: 本番APIが完成したら切り変える
    // `/event/${user.id}/event/${eventId}`,
    `/event/${eventId}`,
  );
  return response.data;
};

type GetEventResponse = SafaEventDetail;
