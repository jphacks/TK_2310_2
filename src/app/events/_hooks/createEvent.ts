import fetchApi from '@/lib/fetch';
import { formatDateForSafaApi } from '@/lib/formatDate';

/**
 * イベントを新規作成する
 */
export const createEvent = async (
  token: string,
  user: User,
  eventDraft: SafaEventDraft,
) => {
  const response = await fetchApi<PostEventRequest, PostEventResponse>(
    token,
    'POST',
    `/user/${user.id}/event`,
    {
      title: eventDraft.title,
      description: eventDraft.description,
      address: eventDraft.address,
      latitude: eventDraft.latitude,
      longitude: eventDraft.longitude,
      participant_count: eventDraft.participantCount,
      unit_price: eventDraft.unitPrice,
      will_start_at: formatDateForSafaApi(eventDraft.willStartAt),
      will_complete_at: formatDateForSafaApi(eventDraft.willCompleteAt),
      application_deadline: formatDateForSafaApi(
        eventDraft.applicationDeadline,
      ),
    },
  );
  return response.data;
};

/**
 * POST /user/:id/event のリクエスト
 */
type PostEventRequest = {
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  participant_count: number;
  unit_price: number;
  will_start_at: string;
  will_complete_at: string;
  application_deadline: string;
};

/**
 * POST /user/:id/event のレスポンス
 */
type PostEventResponse = {
  id: string;
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  participant_count: number;
  unit_price: number;
  will_start_at: Date;
  will_complete_at: Date;
  application_deadline: Date;
};
