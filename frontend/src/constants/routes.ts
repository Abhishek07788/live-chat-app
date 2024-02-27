export const QP = {
  roomId: "room-id",
} as const;

export const PATHS = {
  root: "/",
  chat: "/chat",
  chatRoom: `/chat/[${QP.roomId}]`,
  pdf: "/pdf",
  document: "/document",
  form: "/form",
  login: "/login",
} as const;

export const CUSTOM_500_ROUTE = "/500";
export const CUSTOM_404_ROUTE = "/404";
